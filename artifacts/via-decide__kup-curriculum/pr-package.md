Branch: simba/implement-the-first-passage-validator-in-srcsimh
Title: Implement the 'First Passage Validator' in src/sim/handshake.js. This...

## Summary
- Repo orchestration task for via-decide/kup-curriculum
- Goal: Implement the 'First Passage Validator' in src/sim/handshake.js. This script must: 1) Trigger a single vehicle passage in the Digital Twin, 2) Extract the TPM features, and 3) Receive a "Safe/Unsafe" classification from the local Vora LLM.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.