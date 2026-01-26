# Liveness Intermittent Logic: "The Vajra Watch"

## Continuous Identity Assurance

Unlike standard apps that check identity only at login, FM Elite implements **Continuous Liveness** to ensure the person *trained* is the person *certified*.

### 1. The Interval Logic

- **Frequency**: Every 4-5 minutes (Randomized).
- **Trigger**: During text-based learning or video buffering. Never during critical hazard tests (safety first).
- **Duration**: System pauses content. 15-second countdown to respond.

### 2. The "Vajra Action"

To prevent spoofing with static photos, the user is challenged with a random action:

- "Please Blink Twice"
- "Turn Head Left"
- "Nod Slightly"
- "Smile"

### 3. Verification Pipeline (GCP)

1. **Capture**: App captures a 3-second video buffer (low res, grayscale).
2. **Upload**: Sent to `us-central1-math-engine` via Signed URL.
3. **Analysis**:
    - **Face Match**: Compares against Onboarding Selfie (1:1 Match).
    - **Liveness**: Detects micro-movements/depth (Prevent spoofing).
4. **Verdict**:
    - **Pass**: Content resumes instantly.
    - **Fail (Soft)**: "Could not verify. Try again." (2 attempts).
    - **Fail (Hard)**: Session Terminated. "Plan Hammer" flagged investigation.

### 4. Privacy & Compliance

- These snippets are processed in RAM (Volatile Memory) by the Math Engine.
- **Zero Retention**: Once verified, the buffer is discarded. It is NOT stored on disk unless a violation is confirmed.
- **Disclosure**: "Pragati" informs the user: *“For your certification, I need to ensure it is you taking this course.”*
