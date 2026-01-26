# Handshake Protocol: The "Vajra" Verify

## Core Infrastructure - Broadcom Pilot

This document details the **Vajra Handshake**, the mandatory authentication and verification gate that every driver must pass before accessing any module.

### 1. The Protocol Flow

1. **Driver Entry**: Driver launches app -> Requests OTP for registered mobile number.
2. **Msg91 Verification**:
    - App acts as a conduit.
    - Cloud Function triggers Msg91 API.
    - OTP is verified. Success -> `auth_token` issued.
3. **Identity Bind**: `auth_token` is bound to Device ID (IMEI/Android ID).
4. **Initial Liveness**: Before first module load, camera activates for "Active Liveness".

### 2. Msg91 OTP Integration

**Endpoint**: `POST /api/v1/auth/otp/send` & `verify`
**Provider**: Msg91 (Standard DLTs applied).

```python
# Pseudo-code for Cloud Function
def send_otp(mobile_number):
    # Msg91 Template ID: "Your verification code for FM Elite is ##OTP##"
    response = msg91.send_otp(mobile_number, template_id="FM_ELITE_LOGIN")
    return response

def verify_handshake(mobile_number, otp, device_id):
    if msg91.verify(mobile_number, otp):
        # VAJRA LOCK: Bind User to Device
        user = db.get_user(mobile_number)
        if user.device_id and user.device_id != device_id:
             return Error("Device Mismatch - Plan Hammer Alert")
        
        return mint_jwt(user.id, device_id)
    else:
        return Error("Invalid Handshake")
```

### 3. Verify Handshake Script

The local script `.conductor/verify_handshake.py` (already implemented) simulates this flow for developer verification, ensuring the `service_account` has rights to update the "Edit" transaction in Google Play, symbolizing a successful handshake with the ecosystem.

### 4. Failure Protocols

- **Wrong OTP (3x)**: Account Locked for 15 mins.
- **Device Mismatch**: Immediate "Scrub" command sent to app (wipes local data).
