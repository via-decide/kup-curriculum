Repair mode for repository via-decide/kup-curriculum.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Build the 'Passage Streamer' in src/sim/passage-injector.js. This script connects the Digital Twin output to the kup-ai-stack ingestion endpoint. It must be capable of "Burst Mode" (simulating 1,000 vehicles per minute) to stress-test the pipeline's concurrency limits.

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