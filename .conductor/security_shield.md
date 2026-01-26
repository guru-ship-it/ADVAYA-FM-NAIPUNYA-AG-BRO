# Security Shield: "Plan Hammer" Implementation Guide

## Vajra Level Security Protocol - Broadcom Pilot

This document defines the implementation of the "Security Shield" to force a "No Forward, No Recording, No Screenshots" policy across the Advaya FM Elite application.

### 1. Android Implementation

**Mechanic**: Native WindowManager Flag.

To prevent screen recording and screenshots on Android, we inject `FLAG_SECURE` into the main activity or individual video player activities.

```java
// MainActivity.java or VideoPlayerActivity.java
import android.view.WindowManager;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // INJECT VAJRA SHIELD
    getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
    setContentView(R.layout.activity_main);
}
```

**Outcome**:

- **Screenshots**: System interaction is blocked; user gets "Thinking isn't allowed by the app" (or standard OS message).
- **Screen Recording**: The app window appears completely **black** in the recording.
- **Mirroring/Casting**: Output is blackened on external displays unless explicitly allowed (disabled by default).

### 2. iOS Implementation

**Mechanic**: `UIScreen` Observers.

iOS does not have a single flag to block recording, but we can detect it and obscure the content.

```swift
// SecurityShield.swift
import UIKit

class SecurityShield {
    static let shared = SecurityShield()
    
    func setup() {
        // Detect Screen Recording
        NotificationCenter.default.addObserver(self, selector: #selector(handleRecordingChange), name: UIScreen.capturedDidChangeNotification, object: nil)
        
        // Detect Screenshots (Post-facto)
        NotificationCenter.default.addObserver(self, selector: #selector(handleScreenshot), name: UIApplication.userDidTakeScreenshotNotification, object: nil)
    }
    
    @objc func handleRecordingChange() {
        if UIScreen.main.isCaptured {
            // SHOW BLACK OVERLAY or "Plan Hammer" Warning
            OverlayManager.showSecurityCurtain("Recording Detected. Content Protected.")
        } else {
            OverlayManager.hideSecurityCurtain()
        }
    }
    
    @objc func handleScreenshot() {
        // Log Violation to Vajra Telemetry
        Telemetry.logViolation("Screenshot_Attempt", user: CurrentUser.id)
        // Optionally show alert
    }
}
```

### 3. "No Forward" Logic (Signed URLs)

**Mechanic**: Cloud Storage Signed URLs with Short TTL.

Video content is never exposed via public links.

- **Vajra API** requests a video URL.
- **GCP Logic**: Generates a Signed URL valid for **5 minutes** (sufficient to start buffering).
- **Token Binding**: The URL is bound to the specific user's IP or session ID where possible.

**Result**: If a user copies the link and shares it on WhatsApp, it will expire almost immediately, rendering the forward useless.

### 4. Verification Checklist

- [ ] Android: Verify black screen on `adb shell screenrecord`.
- [ ] iOS: Verify "Security Curtain" overlay when Control Center recording starts.
- [ ] API: Verify 403 Forbidden on expired Signed URLs.
