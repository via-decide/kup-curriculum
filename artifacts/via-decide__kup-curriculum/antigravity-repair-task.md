Repair mode for repository via-decide/kup-curriculum.

TARGET
Validate and repair only the files touched by the previous implementation.

TASK
Integrate digital twin into Month 1 curriculum. Week 1 Friday: Instead of just ViaLogic decision tree, founders also get access to the digital twin with 10K simulated vehicle passages. Week 2 Monday: Launch data quality lab using digital twin data. Founders label 200 passages, deliberately introduce 20% noise, train Random Forest, see the PDF's empirical finding (10% correction > model complexity). Week 2 Wednesday: Scale up. Founders access 500K passages from digital twin, run the full data quality workflow. Week 3 Monday: Scenario 2 stress test: train on Week 2 clean data, deploy against Week 3 noisy simulated data (temperature variation, packet loss), watch accuracy collapse, implement drift monitoring. Week 4: Train on 1M passages across 3 climate conditions, validate on held-out set. All data is synthetic (digital twin), so no dependency on real NHAI approvals. Real data comes post-MVP (pilot phase).

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