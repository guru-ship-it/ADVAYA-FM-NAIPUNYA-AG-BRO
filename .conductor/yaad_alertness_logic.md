# YAAD (Yet Another Anomaly Detector) Technical Documentation

## 1. Objective

YAAD is an intelligent, reactive security shield designed to detect behavioral and environmental anomalies during training modules. It ensures the "Vajra" security layer is dynamic and responsive to real-world driver states.

## 2. Mathematical Logic (GCP Math Engine)

YAAD calculates an **Elite Alertness Score** ($S_{ea}$) by measuring the variance between current telemetry ($L_t$) and the professional baseline ($B_p$).

$$S_{ea} = 1 - \left( \frac{\sum_{j=1}^{k} w_j |L_{t,j} - B_{p,j}|}{\text{Threshold}_{\text{Vajra}}} \right)$$

- **Threshold**: 0.85 (Broadcom Pilot)
- **Anomaly Trigger**: $S_{ea} < 0.7$ triggers a "Didi" intervention.

## 3. Anomaly Mappings & Interventions

| Anomaly Type  | Signal         | Pragati (Didi) Localization                                          |
|---------------|----------------|----------------------------------------------------------------------|
| Gaze Drift    | `ANOMALY_GAZE` | "Bhaiya, raste par nazar rakhein. Screen ki taraf dekhiye."          |
| Liveness Fail | `ANOMALY_ID`   | "Pehchaan verify nahi hui. Ek baar phir camera mein dekhein."         |
| Environmental | `ANOMALY_DARK` | "Roshni kam hai, bhaiya. Safety ke liye light on karke continue karein." |

## 4. Implementation Pipeline

- **Stream Monitor**: Triggers checks at `vajra_check_intervals`.
- **Telemetry Fetch**: Captures 30 frames for $L_t$ calculation.
- **Inference**: Vertex AI performs the variance check.
- **Action**: Gemma 4B delivers localized feedback if $S_{ea}$ fails.
