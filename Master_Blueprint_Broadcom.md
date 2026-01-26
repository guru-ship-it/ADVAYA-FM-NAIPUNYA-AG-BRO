# Master Blueprint – Broadcom Pilot

## Project Overview

The **Advaya FM Elite Broadcom Pilot** integrates cutting‑edge AI models, a premium persona, and stringent **Vajra Level** security. This blueprint consolidates all design documents, implementation details, and module specifications.

## Integrated Models

- **Translate Gemma 4B** – Handles real‑time translation and the "Didi" voice persona.
- **Gemma 2 9B IT** – Core reasoning engine (the "Brain").

*Model configuration is stored in `gemma_translator/model_config.json`.*

## Pragati Persona

- Image: `assets/branding/pragati_face.jpg`
- Metadata: `assets/branding/pragati_persona.json`
- Role: Personal Career Coach & Safety Assistant (tone: **Didi**).

## Vajra Level Security

- **No Recording / No Screenshots** – Android `FLAG_SECURE`, iOS capture observer.
- **Signed URL video streaming** with short TTLs.
- Detailed design: [security_shield.md](file:///d:/ADVAYA_FM_ELITE/.conductor/security_shield.md)

## Handshake Protocol

- OTP via Msg91, device binding, initial liveness check.
- Full spec: [handshake_protocol.md](file:///d:/ADVAYA_FM_ELITE/.conductor/handshake_protocol.md)

## Continuous Liveness (Intermittent)

- Random "Vajra Action" challenges every 4‑5 min.
- Verification pipeline using GCP Math Engine.
- Specification: [liveness_intermittent_logic.md](file:///d:/ADVAYA_FM_ELITE/.conductor/liveness_intermittent_logic.md)

## Training Modules (1‑8) Documentation

| Module | Document |
|--------|----------|
| 1 – The Professional Partner | [module_1_foundations.md](file:///d:/ADVAYA_FM_ELITE/sectors/ground_transport/training_modules/docs/module_1_foundations.md) |
| 2 – Digital Navigations | [module_2_grooming.md](file:///d:/ADVAYA_FM_ELITE/sectors/ground_transport/training_modules/docs/module_2_grooming.md) |
| 3 – POSH: The Elite Guard | [module_3_etiquette.md](file:///d:/ADVAYA_FM_ELITE/sectors/ground_transport/training_modules/docs/module_3_etiquette.md) |
| 4 – The Vajra Inspection | [module_4_posh.md](file:///d:/ADVAYA_FM_ELITE/sectors/ground_transport/training_modules/docs/module_4_posh.md) |
| 5 – Defensive Driving | [module_5_hazard.md](file:///d:/ADVAYA_FM_ELITE/sectors/ground_transport/training_modules/docs/module_5_hazard.md) |
| 6 – City Mastery | [module_6_first_responder.md](file:///d:/ADVAYA_FM_ELITE/sectors/ground_transport/training_modules/docs/module_6_first_responder.md) |
| 7 – Tactical Night Safety | [module_7.md](file:///d:/ADVAYA_FM_ELITE/sectors/ground_transport/training_modules/docs/module_7.md) |
| 8 – Emergency Response | [module_8.md](file:///d:/ADVAYA_FM_ELITE/sectors/ground_transport/training_modules/docs/module_8.md) |

## YAAD Anomaly Detection (Vajra Shield)

- **Technical Doc**: `.conductor/yaad_alertness_logic.md` – Mathematical logic for alertness variance.
- **Career Tiers**: **Elite, Professional, Safe, Danger** mapped to $S_{ea}$ ranges.
- **Execution Protocol**: Cloud Function deployment with **30-second TTL** on telemetry data for DPDP compliance.
- **Alertness Score ($S_{ea}$)**: Set at **0.85 Threshold**. Triggers Didi interventions if score drops below 0.7.
- **Interventions**: Localized Gemma 4B feedback for gaze drift, liveness failure, and environmental issues.

## Mass Production Matrix (8 Modules)

- **Manifest**: `sectors/ground_transport/video_script_manifest.json` – Master production matrix for Vertex AI + Veo 3.1.
- **Logic**: Each module (1-8) is capped at 15 minutes with **3 scheduled Vajra Liveness checks** at 04:00, 08:00, and 12:00.
- **Localized Content**: `sectors/ground_transport/training_modules/docs/full_module_dialogues.json` – Full Hinglish scripts for Pragati "Didi" persona.

## Course Progression & Navigator

- **Course Manifest**: `sectors/ground_transport/course_manifest.json` – Defines prerequisites and session types for all 8 modules.
- **Course Navigator**: `sectors/ground_transport/course_navigator.py` – Manages the "Vajra Path" state machine, handles liveness interrupts, and launches module sessions.

## WebXR Immersive Training

- **Technology**: A‑Frame (Mobile‑First WebXR).
- **Prototype**: `sectors/ground_transport/driving_track/basic/hazard_simulation_xr.html`.
- **Logic**: Raycaster‑based hazard tagging with Pragati's spatially aware "Didi" cues.

## Hazard Test Engine Enhancements

- Welcome script (`pragati_welcome.json`) loaded before each test.
- Scoring tiers: Elite, Professional, Safe, Danger.
- Cloud‑local split for hazard data (`curriculum_manifest.json`).
- Implementation: `sectors/ground_transport/driving_track/basic/hazard_test_engine.py`.

## Implementation Summary

All components have been integrated, documented, and committed. The repository now contains:

- Model setup scripts.
- Persona assets.
- Security and handshake docs.
- Liveness logic.
- Full module documentation.
- Updated hazard test engine.

## Execution Report

See the final execution report for test results and verification steps:
[Vajra Execution Report](file:///d:/ADVAYA_FM_ELITE/Vajra_Execution_Report.md)
