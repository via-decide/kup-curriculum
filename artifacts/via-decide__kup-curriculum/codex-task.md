You are working in repository via-decide/kup-curriculum on branch main.

MISSION
Integrate digital twin into Month 1 curriculum. Week 1 Friday: Instead of just ViaLogic decision tree, founders also get access to the digital twin with 10K simulated vehicle passages. Week 2 Monday: Launch data quality lab using digital twin data. Founders label 200 passages, deliberately introduce 20% noise, train Random Forest, see the PDF's empirical finding (10% correction > model complexity). Week 2 Wednesday: Scale up. Founders access 500K passages from digital twin, run the full data quality workflow. Week 3 Monday: Scenario 2 stress test: train on Week 2 clean data, deploy against Week 3 noisy simulated data (temperature variation, packet loss), watch accuracy collapse, implement drift monitoring. Week 4: Train on 1M passages across 3 climate conditions, validate on held-out set. All data is synthetic (digital twin), so no dependency on real NHAI approvals. Real data comes post-MVP (pilot phase).

CONSTRAINTS
Digital twin must be live by Day 1 of Month 1. Founders must be able to generate 100K passages in <1 hour on standard laptop.

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