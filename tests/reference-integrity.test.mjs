import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function loadYaml(relPath) {
  return yaml.load(fs.readFileSync(path.join(ROOT, relPath), 'utf8'));
}

function listYamlFiles(relDir) {
  const dir = path.join(ROOT, relDir);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((name) => name.endsWith('.yaml') || name.endsWith('.yml'))
    .map((name) => path.join(relDir, name));
}

const graph = loadYaml('curriculum/graph.yaml');
const domainIds = new Set(graph.domains.map((domain) => domain.domainId));
const conceptFiles = listYamlFiles('curriculum/concepts');
const bridgeFiles = listYamlFiles('curriculum/bridges');
const runFiles = listYamlFiles('experiments/weekly');
const concepts = conceptFiles.map(loadYaml);
const bridges = bridgeFiles.map(loadYaml);
const runs = runFiles.map(loadYaml);
const conceptIds = new Set(concepts.map((concept) => concept.conceptId));
const bridgeIds = new Set(bridges.map((bridge) => bridge.bridgeId));

const sourceShelfPath = path.join(ROOT, 'sources', 'free-source-shelf.yaml');
const sourceRecords = fs.existsSync(sourceShelfPath)
  ? (loadYaml('sources/free-source-shelf.yaml').sources || [])
  : [];
const sourceIds = new Set(sourceRecords.map((source) => source.sourceId));

describe('cross-file graph references', () => {
  test('every concept sourceRef resolves to a source record', () => {
    for (const concept of concepts) {
      for (const ref of concept.sourceRefs || []) {
        assert.ok(sourceIds.has(ref), `${concept.conceptId}: dangling sourceRef "${ref}"`);
      }
    }
  });

  test('every concept bridge ref resolves to a bridge record', () => {
    for (const concept of concepts) {
      for (const ref of concept.bridges || []) {
        assert.ok(bridgeIds.has(ref), `${concept.conceptId}: dangling bridge ref "${ref}"`);
      }
    }
  });

  test('every bridge sourceRef resolves to a source record', () => {
    for (const bridge of bridges) {
      for (const ref of bridge.sourceRefs || []) {
        assert.ok(sourceIds.has(ref), `${bridge.bridgeId}: dangling sourceRef "${ref}"`);
      }
    }
  });

  test('every source kupHorizontal resolves to a canonical domain', () => {
    for (const source of sourceRecords) {
      for (const ref of source.kupHorizontals || []) {
        assert.ok(domainIds.has(ref), `${source.sourceId}: dangling kupHorizontal "${ref}"`);
      }
    }
  });
});

describe('artifact and LearningRun references', () => {
  test('SIMULATED+ concepts point to a file that exists', () => {
    const simulatedStates = new Set([
      'SIMULATED', 'MEASURED', 'CONNECTED', 'APPLIED', 'RESEARCH_READY',
    ]);

    for (const concept of concepts) {
      if (!simulatedStates.has(concept.depthState) || !concept.simulation?.feasible) continue;
      const artifactRef = concept.simulation.artifactRef;
      assert.ok(artifactRef, `${concept.conceptId}: missing simulation artifactRef`);
      assert.ok(
        fs.existsSync(path.join(ROOT, artifactRef)),
        `${concept.conceptId}: simulation artifact does not exist: ${artifactRef}`,
      );
    }
  });

  test('every LearningRun conceptRef resolves to a concept', () => {
    for (const run of runs) {
      assert.ok(conceptIds.has(run.conceptRef), `${run.runId}: dangling conceptRef "${run.conceptRef}"`);
    }
  });

  test('performed LearningRun simulations point to real artifacts', () => {
    for (const run of runs) {
      if (!run.simulation?.performed) continue;
      const artifactRef = run.simulation.artifactRef;
      assert.ok(artifactRef, `${run.runId}: performed simulation has no artifactRef`);
      assert.ok(
        fs.existsSync(path.join(ROOT, artifactRef)),
        `${run.runId}: simulation artifact does not exist: ${artifactRef}`,
      );
    }
  });
});
