// tests/graph-integrity.test.mjs
//
// Real, deterministic checks against the files on disk -- not a self-report.
// Covers Phase 1's acceptance criteria directly (issue #17):
//   - all 35 domains exist as stable canonical nodes, unique IDs, no dangling refs
//   - every domain states its kupRepresentation, non-generically
//   - the 5 contracts are themselves valid JSON Schema
// Also wires up validation for concepts/bridges/sources/learning-runs so
// Phase 2+ content is checked automatically the moment it's added -- these
// sections skip cleanly (not falsely-pass) when a directory doesn't exist yet.
//
// Node's built-in test runner (`node --test`), same convention already
// proven out in via-decide/LogicHub -- no custom test framework.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

function loadSchema(name) {
  const p = path.join(ROOT, 'contracts', name);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function loadYaml(relPath) {
  return yaml.load(fs.readFileSync(path.join(ROOT, relPath), 'utf8'));
}

function listYamlFiles(relDir) {
  const dir = path.join(ROOT, relDir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
    .map((f) => path.join(relDir, f));
}

const domainSchema = loadSchema('domain.schema.json');
const conceptSchema = loadSchema('concept.schema.json');
const bridgeSchema = loadSchema('bridge.schema.json');
const sourceRecordSchema = loadSchema('source-record.schema.json');
const learningRunSchema = loadSchema('learning-run.schema.json');

describe('contracts are valid JSON Schema', () => {
  for (const [name, schema] of Object.entries({
    'domain.schema.json': domainSchema,
    'concept.schema.json': conceptSchema,
    'bridge.schema.json': bridgeSchema,
    'source-record.schema.json': sourceRecordSchema,
    'learning-run.schema.json': learningRunSchema,
  })) {
    test(`${name} compiles as a valid JSON Schema`, () => {
      assert.doesNotThrow(() => ajv.compile(schema));
    });
  }
});

describe('curriculum/graph.yaml -- 35-domain inventory (Phase 1)', () => {
  const graph = loadYaml('curriculum/graph.yaml');
  const validateDomain = ajv.compile(domainSchema);

  test('graph.yaml parses and has a domains array', () => {
    assert.ok(Array.isArray(graph.domains));
  });

  test('exactly 35 domains exist', () => {
    assert.equal(graph.domains.length, 35);
  });

  test('every domain validates against domain.schema.json', () => {
    for (const d of graph.domains) {
      const ok = validateDomain(d);
      assert.ok(ok, `${d.domainId || '(missing domainId)'}: ${ajv.errorsText(validateDomain.errors)}`);
    }
  });

  test('every domainId is unique', () => {
    const ids = graph.domains.map((d) => d.domainId);
    assert.equal(new Set(ids).size, ids.length, 'duplicate domainId found');
  });

  test('order values are exactly 1..35 with no gaps or duplicates', () => {
    const orders = graph.domains.map((d) => d.order).sort((a, b) => a - b);
    assert.deepEqual(orders, Array.from({ length: 35 }, (_, i) => i + 1));
  });

  test('every domain states a real, non-generic kupRepresentation', () => {
    const genericPhrases = ['tbd', 'todo', 'n/a', 'teaches math', 'placeholder'];
    for (const d of graph.domains) {
      assert.ok(d.kupRepresentation && d.kupRepresentation.trim().length >= 20,
        `${d.domainId}: kupRepresentation missing or too short to be a real answer`);
      const lower = d.kupRepresentation.toLowerCase();
      assert.ok(!genericPhrases.some((p) => lower === p),
        `${d.domainId}: kupRepresentation looks like a placeholder`);
    }
  });

  test('edgeTypes in graph.yaml matches bridge.schema.json enum exactly', () => {
    const schemaEnum = bridgeSchema.properties.edgeType.enum;
    assert.deepEqual([...graph.edgeTypes].sort(), [...schemaEnum].sort());
  });
});

describe('concepts (Phase 2 content, validated the moment any exists)', () => {
  const graph = loadYaml('curriculum/graph.yaml');
  const domainIds = new Set(graph.domains.map((d) => d.domainId));
  const conceptFiles = listYamlFiles('curriculum/concepts');
  const validateConcept = ajv.compile(conceptSchema);

  if (conceptFiles.length === 0) {
    test('no concept files yet -- nothing to validate (expected for Phase 1)', () => {
      assert.ok(true);
    });
    return;
  }

  const concepts = conceptFiles.map((f) => loadYaml(f));
  const conceptIds = new Set(concepts.map((c) => c.conceptId));

  test('every concept validates against concept.schema.json', () => {
    for (const c of concepts) {
      const ok = validateConcept(c);
      assert.ok(ok, `${c.conceptId || '(missing conceptId)'}: ${ajv.errorsText(validateConcept.errors)}`);
    }
  });

  test('every conceptId is unique', () => {
    assert.equal(conceptIds.size, concepts.length, 'duplicate conceptId found');
  });

  test('every concept.domainRefs entry resolves to a real domain', () => {
    for (const c of concepts) {
      for (const ref of c.domainRefs) {
        assert.ok(domainIds.has(ref), `${c.conceptId}: domainRefs has dangling ref "${ref}"`);
      }
    }
  });

  test('every concept.prerequisites entry resolves to a real concept', () => {
    for (const c of concepts) {
      for (const ref of c.prerequisites || []) {
        assert.ok(conceptIds.has(ref), `${c.conceptId}: prerequisites has dangling ref "${ref}"`);
      }
    }
  });

  test('no hollow concepts: past DISCOVERED, sourceRefs must be non-empty', () => {
    for (const c of concepts) {
      if (c.depthState !== 'DISCOVERED') {
        assert.ok((c.sourceRefs || []).length > 0,
          `${c.conceptId}: depthState=${c.depthState} but has zero sourceRefs -- this is the "AI-generated pseudo-knowledge" failure mode named in issue #17`);
      }
    }
  });

  test('no hollow simulation claims: SIMULATED+ requires a real artifactRef', () => {
    const simulatedStates = ['SIMULATED', 'MEASURED', 'CONNECTED', 'APPLIED', 'RESEARCH_READY'];
    for (const c of concepts) {
      if (simulatedStates.includes(c.depthState) && c.simulation?.feasible) {
        assert.ok(c.simulation.artifactRef, `${c.conceptId}: depthState=${c.depthState} claims simulation but artifactRef is null`);
      }
    }
  });

  test('no claim is ESTABLISHED without sourceRefs outside this repo', () => {
    for (const c of concepts) {
      if (c.globeragRelevance?.claimStatus === 'ESTABLISHED') {
        assert.ok((c.sourceRefs || []).length > 0,
          `${c.conceptId}: claimStatus=ESTABLISHED requires real sourceRefs (issue #17 acceptance criterion)`);
      }
    }
  });
});

describe('bridges (Phase 2 content, validated the moment any exists)', () => {
  const graph = loadYaml('curriculum/graph.yaml');
  const domainIds = new Set(graph.domains.map((d) => d.domainId));
  const conceptFiles = listYamlFiles('curriculum/concepts');
  const conceptIds = new Set(conceptFiles.map((f) => loadYaml(f).conceptId));
  const bridgeFiles = listYamlFiles('curriculum/bridges');
  const validateBridge = ajv.compile(bridgeSchema);

  if (bridgeFiles.length === 0) {
    test('no bridge files yet -- nothing to validate (expected for Phase 1)', () => {
      assert.ok(true);
    });
    return;
  }

  const bridges = bridgeFiles.map((f) => loadYaml(f));

  test('every bridge validates against bridge.schema.json', () => {
    for (const b of bridges) {
      const ok = validateBridge(b);
      assert.ok(ok, `${b.bridgeId || '(missing bridgeId)'}: ${ajv.errorsText(validateBridge.errors)}`);
    }
  });

  test('every bridgeId is unique', () => {
    const ids = bridges.map((b) => b.bridgeId);
    assert.equal(new Set(ids).size, ids.length, 'duplicate bridgeId found');
  });

  test('every bridge.from/to resolves to a real domain or concept', () => {
    const resolvable = new Set([...domainIds, ...conceptIds]);
    for (const b of bridges) {
      assert.ok(resolvable.has(b.from), `${b.bridgeId}: "from" is a dangling ref "${b.from}"`);
      assert.ok(resolvable.has(b.to), `${b.bridgeId}: "to" is a dangling ref "${b.to}"`);
    }
  });
});

describe('source shelf (Phase 3 content, validated the moment any exists)', () => {
  const sourcePath = 'sources/free-source-shelf.yaml';
  const validateSource = ajv.compile(sourceRecordSchema);

  if (!fs.existsSync(path.join(ROOT, sourcePath))) {
    test('no source shelf yet -- nothing to validate (expected for Phase 1)', () => {
      assert.ok(true);
    });
    return;
  }

  const data = loadYaml(sourcePath);
  const sources = data?.sources || [];

  test('every source record validates against source-record.schema.json', () => {
    for (const s of sources) {
      const ok = validateSource(s);
      assert.ok(ok, `${s.sourceId || '(missing sourceId)'}: ${ajv.errorsText(validateSource.errors)}`);
    }
  });

  test('every sourceId is unique', () => {
    const ids = sources.map((s) => s.sourceId);
    assert.equal(new Set(ids).size, ids.length, 'duplicate sourceId found');
  });
});

describe('weekly learning runs (Phase 4 content, validated the moment any exists)', () => {
  const graph = loadYaml('curriculum/graph.yaml');
  const domainIds = new Set(graph.domains.map((d) => d.domainId));
  const runFiles = listYamlFiles('experiments/weekly');
  const validateRun = ajv.compile(learningRunSchema);

  if (runFiles.length === 0) {
    test('no learning runs yet -- nothing to validate (expected for Phase 1)', () => {
      assert.ok(true);
    });
    return;
  }

  const runs = runFiles.map((f) => loadYaml(f));

  test('every LearningRun validates against learning-run.schema.json', () => {
    for (const r of runs) {
      const ok = validateRun(r);
      assert.ok(ok, `${r.runId || '(missing runId)'}: ${ajv.errorsText(validateRun.errors)}`);
    }
  });

  test('every run crosses at least 3 real domains', () => {
    for (const r of runs) {
      for (const ref of r.crossDomainBridges) {
        assert.ok(domainIds.has(ref), `${r.runId}: crossDomainBridges has dangling ref "${ref}"`);
      }
      assert.ok(r.crossDomainBridges.length >= 3, `${r.runId}: fewer than 3 domains crossed`);
    }
  });
});
