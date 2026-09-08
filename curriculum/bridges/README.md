# bridges/

Empty by design (Phase 1). Typed cross-domain edges land here in Phase 2, one file per bridge, validating against `contracts/bridge.schema.json`. `edgeType` must be one of the 13 types listed in `curriculum/graph.yaml`'s `edgeTypes`. `CAUSES_CANDIDATE` and `MATHEMATICALLY_EQUIVALENT_TO` edges require a real `description` and `sourceRefs` — a wrong edge here is a wrong scientific claim, not just a broken link.
