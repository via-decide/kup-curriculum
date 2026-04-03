Branch: simba/build-logichub-efficiency-templates-in-srctempla
Title: Build 'LogicHub Efficiency Templates' in src/templates/token-architec...

## Summary
- Repo orchestration task for via-decide/kup-curriculum
- Goal: Build 'LogicHub Efficiency Templates' in src/templates/token-architect.json. Configure the 'Quality Reviewer' agent to guide founders in writing prompts that use <500 tokens for complex highway decision logic. [span_6](start_span)constraints: The agent must reject any prompt that includes "Data Dumps" and instead enforce "Structured Payloads" to prevent context rot.[span_6](end_span)

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.