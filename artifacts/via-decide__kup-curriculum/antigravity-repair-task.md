Repair mode for repository via-decide/kup-curriculum.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Create the 'Chaos Lab' suite in src/labs/scenario-two-stress.js. [span_9](start_span)[span_10](start_span)Develop scripts that founders can use to inject packet loss, sensor vibration, and extreme temperature drift (up to 48°C) into their digital twin environment[span_9](end_span)[span_10](end_span). [span_11](start_span)[span_12](start_span)constraints: The output must show a "Model Collapse" visualization when the noise exceeds the training threshold, forcing founders to implement the Week 3 drift detection strategies[span_11](end_span)[span_12](end_span).

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