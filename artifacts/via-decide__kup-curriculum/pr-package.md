Branch: simba/create-the-kup-20-domain-scaffolder-in-srctempla
Title: Create the 'KUP 2.0 Domain Scaffolder' in src/templates/kup-v2-scaffo...

## Summary
- Repo orchestration task for via-decide/kup-curriculum
- Goal: Create the 'KUP 2.0 Domain Scaffolder' in src/templates/kup-v2-scaffold.json. This agent must guide founders through the "Week 1: Data-Centric AI" principles for a new domain, such as agricultural moisture sensing or urban heat-island monitoring. [span_12](start_span)[span_13](start_span)constraints: The agent must strictly enforce the "Six Quality Dimensions"[span_12](end_span)[span_13](end_span) [span_14](start_span)to ensure the new domain avoids the 95% GenAI failure rate[span_14](end_span).

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.