Branch: simba/build-the-passage-streamer-in-srcsimpassage-inje
Title: Build the 'Passage Streamer' in src/sim/passage-injector.js. This scr...

## Summary
- Repo orchestration task for via-decide/kup-curriculum
- Goal: Build the 'Passage Streamer' in src/sim/passage-injector.js. This script connects the Digital Twin output to the kup-ai-stack ingestion endpoint. It must be capable of "Burst Mode" (simulating 1,000 vehicles per minute) to stress-test the pipeline's concurrency limits.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.