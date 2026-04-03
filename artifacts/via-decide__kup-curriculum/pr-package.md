Branch: simba/create-the-domain-transfer-adapter-in-srctemplat
Title: Create the 'Domain Transfer Adapter' in src/templates/kup-v2-adapter....

## Summary
- Repo orchestration task for via-decide/kup-curriculum
- Goal: Create the 'Domain Transfer Adapter' in src/templates/kup-v2-adapter.json. This agent must guide founders through mapping the "Six Quality Dimensions" to a new industry (e.g., urban heat-island sensing). [cite_start]constraints: The adapter must strictly enforce the "Data Quality > Model Complexity" rule to prevent the 95% GenAI failure rate in KUP 2.0 cohorts[span_4](end_span)[span_5](end_span).

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.