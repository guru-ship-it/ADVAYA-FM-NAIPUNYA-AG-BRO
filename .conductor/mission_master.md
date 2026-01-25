# Mission Master Spec: FM NaipuNya (Advaya_FM_Elite)

**Target**: Creating a National Compliance Ledger for blue-collar workforce skills.
**Current Phase**: Phase 1 - Ground Transport (Elite MNC)
**Last Updated**: 2026-01-26

## 1. Conductor Protocol

**Role**: The Conductor (this file) is the single source of truth.

- **Daily Protocol**:
    1. **Morning Check**: Read this file to align with the current phase.
        - **Track Output**: Ensure GCP build aligns with roadmap.
        - **Phase Alignment**: Focus on Phase 1 (Ground Transport).
        - **T-Hub Readiness**: Prepare Pilot Pitch data.
    2. **Evening Lock**: Update this file with the day's progress.
    3. **Strict Adherence**: No deviations from "Gulgul" stack.

## 2. Architecture Overview

- **Blue-Collar Interface**: Mobile-Only (Android). Zero-Desktop. Offline-First (Gemma 2B).
- **White-Collar Interface**: Hybrid (Web + Mobile). BigQuery Analytics.
- **Compliance Layer**: "Vajra" API (Mandatory Handshake).

## 3. Directory Map (The Anchor)

- `D:\ADVAYA_FM_Elite\`
  - `.conductor\` (System State)
  - `agbro_manifest.json` (Project Identity)
  - `training_modules\` (YouTube Gatekeeper Assets)
  - `gemma_translator\` (Local LLM Weights)
  - `webxr_assets\` (3D Simulations)
  - `sectors\` (Industry-Specific Modules)
    - `cross_sector\` (Fire Safety)
    - `ground_transport\` (Driver Training)
  - `api\` (Vajra Schemas & Simulators)

## 4. Current State (Phase 1)

- **Status**: Execution
- **Accomplishments**:
  - Project Initialized & Manifest Locked.
  - Gatekeeper Logic (`gatekeeper.js`) Implemented.
  - Fire Safety Module (Metadata, Prompt, Gatekeeper) Created.
  - Elite Driver Assessment Prompts (`elite_driver_prompts.gemma`) Created.
  - Vajra API Handshake Simulated & Verified (`vajra_handshake_sim.py`).

## 5. Next Objectives

- [ ] Begin Phase 2 (Housekeeping) or Build Mobile UI.
