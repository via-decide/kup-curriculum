Branch: simba/create-the-simulation-guide-agent-template-in-sr
Title: Create 'The Simulation Guide' Agent Template in src/templates/simulat...

## Summary
- Repo orchestration task for via-decide/kup-curriculum
- Goal: Create 'The Simulation Guide' Agent Template in src/templates/simulation-guide.json. Configure it to assist founders in generating 1M synthetic vehicle passages using the digital twin.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.