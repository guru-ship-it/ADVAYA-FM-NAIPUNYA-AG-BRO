# VAJRA LIFT PROTOCOL [AWS MIGRATION]

## 1. Secrets Migration (MANDATORY)
>
> **STATUS**: REQ_IMMEDIATE_ACTION

- **Source**: Local `service_account.json` & `.env`
- **Destination**: AWS Secrets Manager (`ap-south-1`)
- **Action**:
  - Identify all keys in `backend/config.py`
  - Create Secret: `prod/vajra/secrets`
  - Keys: `TWILIO_AUTH_TOKEN`, `GOOGLE_APPLICATION_CREDENTIALS` (Content), `GEMMA_WEIGHTS_PATH`

## 2. The Sovereign Tongue (Gemma 4B Sidecar)

- **Architecture**:
  - **Core**: Llama 3.1 70B (Via Amazon Bedrock) -> *Reasoning*
  - **Sidecar**: Gemma 4B (Deployed on EC2 `c6i.2xlarge`) -> *Translation/Nuance*
- **Deployment**:
  - Use AWS DataSync to move weights from local `gemma_translator/` to AWS EFS.
  - Mount EFS to the Sidecar Container.
- **Latency Target**: < 50ms (Internal VPC traffic).

## 3. Compliance & Security Limits

- **DPDP 2023**: All PII (Phone numbers, Driving Scores) remains in AWS Mumbai Region.
- **Hard Gate**:
  - SMS/WhatsApp Verification is the ONLY entry point.
  - No "Guest Mode" in Production.

## 4. Final Handshake

- **Objective**: Verify `com.fm.naipunya` connectivity.
- **Tool**: `.conductor/verify_handshake.py`
- **Success Criteria**:
  - Google Play API returns `200 OK` or `403` (Permission Valid, Access Restricted).
  - `handshake_final.log` created.

**Date**: 2026-01-28
**Author**: Pragati (System Architect)
