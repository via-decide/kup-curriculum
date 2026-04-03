Branch: simba/implement-the-recovery-validator-in-srcevaluatio
Title: Implement the 'Recovery Validator' in src/evaluation/fix-checker.js. ...

## Summary
- Repo orchestration task for via-decide/kup-curriculum
- Goal: Implement the 'Recovery Validator' in src/evaluation/fix-checker.js. After a 'Chaos Injection' event, this script must monitor the model's output to verify if accuracy returns to >80% following the founder's intervention.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.