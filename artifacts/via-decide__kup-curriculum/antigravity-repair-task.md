Repair mode for repository via-decide/kup-curriculum.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Create the 'Domain Transfer Adapter' in src/templates/kup-v2-adapter.json. This agent must guide founders through mapping the "Six Quality Dimensions" to a new industry (e.g., urban heat-island sensing). [cite_start]constraints: The adapter must strictly enforce the "Data Quality > Model Complexity" rule to prevent the 95% GenAI failure rate in KUP 2.0 cohorts[span_4](end_span)[span_5](end_span).

RULES
1. Audit touched files first and identify regressions.
2. Preserve architecture and naming conventions.
3. Make minimal repairs only; do not expand scope.
4. Re-run checks and provide concise root-cause notes.
5. Return complete contents for changed files only.

SOP: REPAIR PROTOCOL (MANDATORY)
1. Strict Fix Only: Do not use repair mode to expand scope or add features.
2. Regression Check: Audit why previous attempt failed before proposing a fix.
3. Minimal Footprint: Only return contents for the actual repaired files.

REPO CONTEXT
- README snippet:
# kup-curriculum
- AGENTS snippet:
not found
- package.json snippet:
not found