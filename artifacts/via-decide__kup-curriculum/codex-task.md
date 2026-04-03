You are working in repository via-decide/kup-curriculum on branch main.

MISSION
Implement the 'First Passage Validator' in src/sim/handshake.js. This script must: 1) Trigger a single vehicle passage in the Digital Twin, 2) Extract the TPM features, and 3) Receive a "Safe/Unsafe" classification from the local Vora LLM.

CONSTRAINTS
The founder must log the "End-to-End Latency" in milliseconds. If latency exceeds 500ms for a single passage, the 'Edge Architect' agent must intervene to optimize their local Docker/Ollama configuration.

PROCESS (MANDATORY)
1. Read README.md and AGENTS.md before editing.
2. Audit architecture before coding. Summarize current behavior.
3. Preserve unrelated working code. Prefer additive modular changes.
4. Implement the smallest safe change set for the stated goal.
5. Run validation commands and fix discovered issues.
6. Self-review for regressions, missing env wiring, and docs drift.
7. Return complete final file contents for every modified or created file.

REPO AUDIT CONTEXT
- Description: 
- Primary language: unknown
- README snippet:
# kup-curriculum

- AGENTS snippet:
not found


SOP: PRE-MODIFICATION PROTOCOL (MANDATORY)
1. Adherence to Instructions: No deviations without explicit user approval.
2. Mandatory Clarification: Immediately ask if instructions are ambiguous or incomplete.
3. Proposal First: Always propose optimizations or fixes before implementing them.
4. Scope Discipline: Do not add unrequested features or modify unrelated code.
5. Vulnerability Check: Immediately flag and explain security risks.

OUTPUT REQUIREMENTS
- Include: implementation summary, checks run, risks, rollback notes.
- Generate branch + PR package.
- Keep prompts deterministic and preservation-first.