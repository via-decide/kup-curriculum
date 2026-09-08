#!/usr/bin/env python3
"""Deterministic 1-D Fickian diffusion learning artifact.

Solves
    dc/dt = D d2c/dx2

on a closed 1-D interval with a conservative explicit update and zero net flux at
both boundaries. The initial condition is a normalized Gaussian concentration
profile. No third-party dependencies are required.

This is a curriculum/simulation artifact, not a validated physical model of a
specific KUP system. See curriculum/concepts/diffusion.yaml for failure bounds.
"""

from __future__ import annotations

import csv
import json
import math
from pathlib import Path

D = 1.0e-9          # m^2/s
LENGTH_M = 0.20     # m
DX_M = 0.001        # m
DT_S = 100.0        # s
TOTAL_TIME_S = 20_000.0
INITIAL_SIGMA_M = 0.003
SNAPSHOT_TIMES_S = (0, 5_000, 10_000, 20_000)

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "artifacts" / "simulations"
SUMMARY_PATH = OUT_DIR / "diffusion_1d_summary.json"
PROFILE_PATH = OUT_DIR / "diffusion_1d_profiles.csv"


def moments(xs: list[float], c: list[float], dx: float) -> tuple[float, float, float]:
    mass = sum(c) * dx
    mean = sum(x * value for x, value in zip(xs, c)) * dx / mass
    variance = sum((x - mean) ** 2 * value for x, value in zip(xs, c)) * dx / mass
    return mass, mean, variance


def main() -> None:
    node_count = int(round(LENGTH_M / DX_M)) + 1
    xs = [-LENGTH_M / 2 + i * DX_M for i in range(node_count)]

    stability_ratio = D * DT_S / (DX_M * DX_M)
    if stability_ratio > 0.5:
        raise RuntimeError(
            f"Explicit scheme unstable: D*dt/dx^2={stability_ratio:.6g} > 0.5"
        )

    concentration = [
        math.exp(-0.5 * (x / INITIAL_SIGMA_M) ** 2) for x in xs
    ]
    initial_mass = sum(concentration) * DX_M
    concentration = [value / initial_mass for value in concentration]

    snapshots: dict[int, list[float]] = {0: concentration.copy()}
    step_count = int(round(TOTAL_TIME_S / DT_S))

    for step in range(1, step_count + 1):
        previous = concentration
        updated = [0.0] * node_count

        # Conservative zero-flux boundary updates.
        updated[0] = previous[0] + stability_ratio * (previous[1] - previous[0])
        for i in range(1, node_count - 1):
            updated[i] = previous[i] + stability_ratio * (
                previous[i + 1] - 2.0 * previous[i] + previous[i - 1]
            )
        updated[-1] = previous[-1] + stability_ratio * (
            previous[-2] - previous[-1]
        )

        concentration = updated
        time_s = int(round(step * DT_S))
        if time_s in SNAPSHOT_TIMES_S:
            snapshots[time_s] = concentration.copy()

    if set(snapshots) != set(SNAPSHOT_TIMES_S):
        raise RuntimeError("Not all requested snapshots were captured")

    records = []
    for time_s in SNAPSHOT_TIMES_S:
        mass, mean_m, variance_m2 = moments(xs, snapshots[time_s], DX_M)
        expected_variance_m2 = INITIAL_SIGMA_M**2 + 2.0 * D * time_s
        relative_variance_error = (
            0.0
            if expected_variance_m2 == 0
            else (variance_m2 - expected_variance_m2) / expected_variance_m2
        )
        records.append(
            {
                "time_s": time_s,
                "mass": mass,
                "mean_m": mean_m,
                "variance_m2": variance_m2,
                "expected_variance_m2": expected_variance_m2,
                "relative_variance_error": relative_variance_error,
            }
        )

    final_mass_error = abs(records[-1]["mass"] - records[0]["mass"])
    max_relative_variance_error = max(
        abs(record["relative_variance_error"]) for record in records
    )

    # Deterministic acceptance checks for the learning artifact.
    if final_mass_error > 1e-12:
        raise AssertionError(f"Mass conservation failed: error={final_mass_error}")
    if max_relative_variance_error > 1e-10:
        raise AssertionError(
            "Variance-growth check failed: "
            f"max relative error={max_relative_variance_error}"
        )

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    summary = {
        "model": "1D constant-coefficient Fickian diffusion",
        "equation": "dc/dt = D d2c/dx2",
        "boundaryCondition": "zero net flux at both ends",
        "parameters": {
            "D_m2_s": D,
            "length_m": LENGTH_M,
            "dx_m": DX_M,
            "dt_s": DT_S,
            "total_time_s": TOTAL_TIME_S,
            "initial_sigma_m": INITIAL_SIGMA_M,
            "stability_ratio": stability_ratio,
        },
        "checks": {
            "final_mass_error": final_mass_error,
            "max_relative_variance_error": max_relative_variance_error,
            "mass_conservation_pass": final_mass_error <= 1e-12,
            "variance_growth_pass": max_relative_variance_error <= 1e-10,
        },
        "snapshots": records,
    }
    SUMMARY_PATH.write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")

    with PROFILE_PATH.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.writer(handle)
        writer.writerow(["x_m", *[f"c_t{t}_s" for t in SNAPSHOT_TIMES_S]])
        for index, x in enumerate(xs):
            writer.writerow([x, *[snapshots[t][index] for t in SNAPSHOT_TIMES_S]])

    print(f"wrote {SUMMARY_PATH.relative_to(ROOT)}")
    print(f"wrote {PROFILE_PATH.relative_to(ROOT)}")
    print(f"stability_ratio={stability_ratio:.6g}")
    print(f"final_mass_error={final_mass_error:.3e}")
    print(f"max_relative_variance_error={max_relative_variance_error:.3e}")


if __name__ == "__main__":
    main()
