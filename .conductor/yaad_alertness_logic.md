# YAAD (Yet Another Anomaly Detector) Technical Documentation

## 1. Objective

YAAD is an intelligent, reactive security shield designed to detect behavioral and environmental anomalies during training modules. It ensures the "Vajra" security layer is dynamic and responsive to real-world driver states.

## 2. Mathematical Logic (GCP Math Engine)

YAAD calculates an **Elite Alertness Score** ($S_{ea}$) by measuring the variance between current telemetry ($L_t$) and the professional baseline ($B_p$).

$$S_{ea} = 1 - \left( \frac{\sum_{j=1}^{k} w_j |L_{t,j} - B_{p,j}|}{\text{Threshold}_{\text{Vajra}}} \right)$$

- **Threshold**: 0.85 (Broadcom Pilot)
- **Anomaly Trigger**: $S_{ea} < 0.7$ triggers a "Didi" intervention.

## 3. Anomaly Mappings & Interventions

| Anomaly Type  | Signal         | Pragati (Didi) Localization                                            |
|---------------|----------------|------------------------------------------------------------------------|
| Gaze Drift    | `ANOMALY_GAZE` | "Bhaiya, raste par nazar rakhein. Screen ki taraf dekhiye."            |
| Liveness Fail | `ANOMALY_ID`   | "Pehchaan verify nahi hui. Ek baar phir camera mein dekhein."          |
| Environmental | `ANOMALY_DARK` | "Roshni kam hai, bhaiya. Safety ke liye light on karke continue karein."|

## 5. Scoring Tiers & Career Impact

| Tier            | $S_{ea}$ Range | Impact               | Pragati’s Closing (Gemma 4B)                                                     |
|-----------------|----------------|----------------------|----------------------------------------------------------------------------------|
| **ELITE**       | $0.95 - 1.0$   | Bonus Eligibility    | "Shabaash! Aapne Elite standard dikhaya hai. Isi tarah chaliye."                 |
| **PROFESSIONAL**| $0.85 - 0.94$ | Standard Qualified   | "Achha kaam hai, bhaiya. Thoda aur dhyan dein toh Elite ban jayenge."            |
| **SAFE**        | $0.75 - 0.84$   | Retraining Suggested | "Aap safe hain, par dhyan bhatak raha hai. Kal aur behtar karna."               |
| **DANGER**      | $< 0.75$       | Lockout Trigger      | "Rukiye. Aap thake hue lag rahe hain. Break lein aur supervisor se baat karein." |

## 6. Execution Protocol (GCP Cloud-Only)

- **Deployment**: The YAAD logic is deployed as a **Cloud Function** (Python) triggered by the `course_navigator.py`.
- **Data Minimization**: Telemetry frames are stored in a transient Cloud Storage bucket with a **30-second TTL** (Time-To-Live).
- **Inference**: Vertex AI processes the $S_{ea}$ and returns the signal to the YouTube Wrapper via a secure WebSocket.
- **Action**: If $S_{ea} < 0.7$, the .mp4 stream pauses and the Gemma 4B localized warning launches.

## 4. Implementation Pipeline

- **Stream Monitor**: Triggers checks at `vajra_check_intervals`.
- **Telemetry Fetch**: Captures 30 frames for $L_t$ calculation.
- **Inference**: Vertex AI performs the variance check.
- **Action**: Gemma 4B delivers localized feedback if $S_{ea}$ fails.
