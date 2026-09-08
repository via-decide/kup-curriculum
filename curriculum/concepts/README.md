# concepts/

Empty by design (Phase 1). Concept nodes land here in Phase 2 — see issue #17's 20 seed concepts. Each file must validate against `contracts/concept.schema.json`; `tests/graph-integrity.test.mjs` picks up every `.yaml` file here automatically, including the hollow-entry checks (no depth claim past `DISCOVERED` without real `sourceRefs`).
