# Diffusion exemplar — gel + camera measurement protocol

Status: `PLANNED`

Purpose: turn the diffusion concept into a bounded, measurable physical experiment without pretending the experiment has already validated a diffusion coefficient.

## Research question

Can a visible tracer spreading through an agarose gel produce a repeatable spatial profile whose width/time evolution is consistent with a simple Fickian diffusion model under the recorded conditions?

## What this experiment is allowed to establish

If the controls, calibration, replication, and model checks pass, this experiment may support an **effective diffusion coefficient for the exact tracer/gel/temperature/setup used** and may support the statement that the observed spreading is consistent with the tested Fickian model over the measured range.

It must not be generalized to another tracer, gel concentration, temperature, geometry, biological membrane, soil, or KUP field system without separate evidence.

## Reference precedent

- UC Davis demonstrates determining methylene-blue diffusivity in 1%/2% agarose at different temperatures.
- George Washington University/AAPT describes agarose-gel diffusion captured with a fixed camera/light-box arrangement, followed by image-profile and FWHM analysis.

These are method precedents, not evidence that this KUP run has succeeded.

## Apparatus

- agarose gel cast to a recorded concentration and depth;
- selected visible tracer with identity/concentration recorded;
- Petri dish or other fixed transparent geometry;
- calibrated ruler or scale marker in the image plane;
- fixed camera mount;
- fixed illumination and light shield/shroud;
- thermometer; use a logged room/environment reading at minimum;
- timer with a common time origin for all images;
- pipette or other repeatable method for placing the tracer;
- local SDS/PPE appropriate to the selected tracer and gel preparation method.

## Frozen variables before first formal run

Record before adding tracer:

```text
protocolRevision
gel material + concentration
gel thickness / container geometry
tracer identity
tracer concentration
tracer volume
source geometry / well diameter
camera model
camera distance / focal settings
illumination geometry
spatial calibration
planned image times
temperature acceptance band
replicate count
analysis revision
```

Do not tune these retrospectively to improve the fit. Any change creates a new protocol revision.

## Minimum run design

1. Prepare at least 3 nominally identical gel replicates.
2. Allow gels to equilibrate to the recorded environment before tracer addition.
3. Acquire a `t=0` image immediately after a repeatable tracer placement.
4. Acquire time-stamped images at the frozen schedule. Use denser sampling early if the preregistered schedule specifies it.
5. Keep camera, scale, lighting, and dish orientation fixed.
6. Record temperature for each acquisition block.
7. Preserve all original images unchanged.
8. Produce processed spatial profiles as separate derived artifacts.

## Data reduction

For each image:

1. apply the frozen spatial calibration;
2. extract the same line/radial profile geometry for every time point;
3. subtract or normalize the frozen background/illumination reference;
4. calculate a profile-width statistic such as FWHM and preserve the full profile;
5. test the expected diffusion scaling rather than assuming it;
6. where justified by geometry and calibration, fit the concentration/profile model and estimate an effective D;
7. preserve fit parameters, residuals, and rejected runs.

A camera intensity profile is **not automatically a concentration profile**. If a quantitative concentration coefficient is claimed, establish an intensity-to-concentration calibration or use another validated concentration measurement.

## Negative controls / failure injection

At least one exploratory/non-claim run should deliberately expose a failure mode so the learner can see why the model boundary matters:

- change temperature;
- alter gel concentration;
- introduce vibration/motion that can create bulk transport;
- use an unsuitable illumination geometry;
- analyze with a deliberately wrong spatial scale.

These runs must be labelled as failure/contrast cases and must not be mixed into the primary coefficient estimate.

## Acceptance checks

A formal run is not accepted as a Fickian measurement merely because a colored spot gets wider.

Require:

- complete raw-image chronology;
- valid scale and timestamps;
- no known bulk-convection event;
- temperature inside the frozen acceptance band;
- replicate agreement reported, not hidden;
- chosen profile/scaling model described before claim promotion;
- residuals/goodness-of-fit inspected;
- no obvious systematic dependence that invalidates constant-D treatment;
- effective-D claim tied to the exact experiment revision.

If these are not satisfied, outcome = `INCONCLUSIVE` or `MODEL_MISMATCH`, not a guessed D.

## Evidence package target

```text
artifacts/experiments/diffusion-gel-camera/<run-id>/
├── manifest.yaml
├── raw/
│   └── images/
├── environment.csv
├── calibration/
├── processed/
│   ├── profiles.csv
│   └── fit.json
├── deviations.md
└── conclusion.md
```

## KUP / GlobeRAG use

This experiment is valuable to KUP because it forces explicit separation of:

```text
MODEL
what Fickian diffusion predicts
↓
OBSERVATION
what the camera actually recorded
↓
CALIBRATION
what the pixels/scale actually mean
↓
ADMISSIBILITY
whether the run is good enough to support a coefficient/model claim
↓
DECISION
SUPPORTED / INCONCLUSIVE / MODEL_MISMATCH
```

That separation is directly useful to GlobeRAG research, but it does not prove that GlobeRAG itself should use a diffusion equation.

## Sources

- `source_ucdavis_ebs127_diffusion_lab`
- `source_gwu_aapt_diffusion_gels`
- `source_iupac_diffusion_coefficient`
- `source_pmc_variable_order_fractional_review`
