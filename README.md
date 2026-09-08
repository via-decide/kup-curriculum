# kup-curriculum

The canonical KUP learning graph: a cross-domain, representation-first research curriculum connecting mathematics, physical science, computation, engineering, AI, experimentation, and whole physical systems.

This is **not** a university-style syllabus and must not become a flat list of courses. Full spec: [via-decide/kup-curriculum#17](https://github.com/via-decide/kup-curriculum/issues/17).

## The one governing question

> **What representation does this field give KUP that another field cannot?**

Every node in this graph — domain, concept, bridge — exists to answer that question for something specific. A concept that doesn't connect to a real equation, physical meaning, worked example, failure boundary, cross-domain bridge, simulation, measurement, and unresolved question is not finished, no matter how much prose describes it.

## How this differs from a syllabus

A syllabus is a static list to complete. This is a **capability graph** KUP projects pull from:

```
KUP PROJECT
  ↓ required capability
WHAT REPRESENTATION IS MISSING?
  ↓
KUP CURRICULUM GRAPH
  ↓ bounded learning path
SIMULATION / EXPERIMENT / SYNTHESIS
  ↓
NEW REUSABLE CAPABILITY
  ↓
BACK TO PROJECT
```

Progress is measured by concepts becoming usable capabilities — not courses completed, not links collected. See the Metrics section of issue #17 for the exact tracked numbers, and its Risks section for the specific failure modes this structure exists to prevent (syllabus sprawl, resource-hoarding, false completeness, AI-generated pseudo-knowledge, source-authority leakage).

## Repository layout

```
kup-curriculum/
├── curriculum/
│   ├── graph.yaml       # the 35 canonical top-level domains (Phase 1)
│   ├── domains/         # reserved for finer per-domain detail (Phase 2+)
│   ├── concepts/        # concept nodes -- empty until Phase 2
│   ├── bridges/         # typed cross-domain edges -- empty until Phase 2
│   └── pathways/        # composed learning paths -- empty until later phases
├── contracts/           # the 5 machine-readable schemas (Domain, Concept,
│                         # Bridge, SourceRecord, LearningRun) everything above validates against
├── sources/
│   ├── free-source-shelf.yaml   # verified free/authoritative sources -- Phase 3
│   └── verification/
├── experiments/
│   ├── weekly/           # LearningRun records -- Phase 4
│   └── templates/
├── synthesis/
│   └── templates/
└── tests/
    └── graph-integrity.test.mjs   # real schema + dangling-ref validation, runs in CI
```

## Status

**Phase 1 — schemas + domain inventory frozen.** All 35 domains exist as stable, schema-valid nodes in `curriculum/graph.yaml`, each with an explicit, non-generic answer to the governing question. The 5 contracts in `contracts/` are frozen. `curriculum/concepts/`, `curriculum/bridges/`, `sources/free-source-shelf.yaml`, and `experiments/weekly/` are intentionally empty — Phases 2 through 5 populate them, per issue #17's own instruction not to build depth into all 35 domains before KUP projects can use the graph.

## Validation

```
npm install
npm test
```

Runs on every push/PR via `.github/workflows/graph-integrity.yml`. Checks: every contract is valid JSON Schema; the domain inventory is exactly 35 entries with unique IDs and no gaps; every domain, concept, bridge, source record, and learning run (once they exist) validates against its schema with no dangling references; concepts past `DISCOVERED` cannot claim depth without real `sourceRefs`; no `globeragRelevance.claimStatus` can be `ESTABLISHED` without evidence outside this repo.

## Consuming this graph from another KUP repo

Don't duplicate curriculum content in your own repo. Reference domain/concept IDs from `curriculum/graph.yaml`, or open a learning-gap request (schema and interface land in Phase 5, issue #17) when a project needs a representation this graph doesn't have yet.
