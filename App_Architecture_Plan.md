# FM NaipuNya: Dual-Interface Strategy

## 1. Blue-Collar Flow (Mobile-Only)

Since these workers (drivers, technicians) are always on the move, the interface must be frictionless and high-impact.

- **Zero-Desktop Rule**: All modules, including the WebXR simulations and POSH training, must be 100% executable within the FM NaipuNya Android app.
- **Low-Bandwidth Optimization**: We will use GCP Buckets to serve compressed WebXR assets and YouTube for the 5-7 minute videos to ensure smooth streaming even on 4G.
- **Gemma 2B Offline Mode**: The fresh Gemma 2B model will be quantized for on-device inference. This allows drivers to complete native-language assessments even in areas with zero connectivity.

## 2. White-Collar Flow (Web + Play Store)

For managers and HR executives, the platform provides a dual-access "Command Center."

- **Web Dashboard**: A high-level administrative portal for viewing BigQuery analytics on driver performance, POSH certifications, and fleet safety scores.
- **Cross-Platform Sync**: Progress started on the FM NaipuNya app can be finished on the web, and vice versa, using a centralized GCP Firebase backend.

## Implementation Steps

### Step 1: The "D-Drive" Manifest Update

Update `agbro_manifest.json` on the D drive to reflect the FM NaipuNya app architecture.

### Step 2: YouTube "Gatekeeper" Implementation

In the `training_modules` folder, we will build a mobile-responsive JavaScript wrapper for the YouTube API. This ensures the "Mandatory Watch" rule is enforced on the small screen before the assessment unlocks.

### Step 3: WebXR "Mobile-First" Simulations

We will prioritize A-Frame (WebXR) for the 3D simulations. This allows the FM NaipuNya app to launch an immersive "Hazard Detection" training directly in the mobile browser without needing external VR hardware.

### Step 4: The Master Notebook Lock

Save this revised strategy to `D:\Advaya_FM_Elite\App_Architecture_Plan.md`.
