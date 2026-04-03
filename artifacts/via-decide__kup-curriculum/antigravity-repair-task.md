Repair mode for repository via-decide/kup-curriculum.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Create the 'KUP 2.0 Domain Scaffolder' in src/templates/kup-v2-scaffold.json. This agent must guide founders through the "Week 1: Data-Centric AI" principles for a new domain, such as agricultural moisture sensing or urban heat-island monitoring. [span_12](start_span)[span_13](start_span)constraints: The agent must strictly enforce the "Six Quality Dimensions"[span_12](end_span)[span_13](end_span) [span_14](start_span)to ensure the new domain avoids the 95% GenAI failure rate[span_14](end_span).

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