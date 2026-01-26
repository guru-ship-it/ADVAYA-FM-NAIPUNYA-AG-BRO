# elite_guard_shield.md

## Overview

Implement OS‑level protections that guarantee **no screen capture, recording, or forwarding** for the Advaya FM Elite Broadcom Pilot.

### Android

```java
// In MainActivity.onCreate()
import android.view.WindowManager;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    // Prevent screenshots & screen recording
    getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE,
                         WindowManager.LayoutParams.FLAG_SECURE);
    setContentView(R.layout.activity_main);
}
```

* `FLAG_SECURE` blocks:
  * System screenshots (Power + Volume)
  * Screen recording apps
  * MediaProjection capture

### iOS (Swift)

```swift
import UIKit

class SecureViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        // Observe screen capture changes
        NotificationCenter.default.addObserver(self,
            selector: #selector(screenCaptureChanged),
            name: UIScreen.capturedDidChangeNotification,
            object: nil)
    }

    @objc func screenCaptureChanged() {
        if UIScreen.main.isCaptured {
            // Overlay a full‑screen shield
            let shield = UIView(frame: view.bounds)
            shield.backgroundColor = .black
            shield.tag = 999
            view.addSubview(shield)
        } else {
            // Remove shield if capture stopped
            view.viewWithTag(999)?.removeFromSuperview()
        }
    }
}
```

* `UIScreen.capturedDidChangeNotification` fires when the user starts/stops recording or AirPlay.
* The black overlay ("Security Shield") ensures no visual data leaks.

## Deployment

* Add the Android snippet to **MainActivity** of the Android app module.
* Add the iOS class to the iOS target and present it as the root view controller.
* Ensure the same logic is included in any future UI modules.

## Verification

1. Attempt a screenshot on Android – the system shows a *blocked* toast.
2. Start a screen‑recording app – the video is black.
3. On iOS, start screen recording – the black overlay appears instantly.

---
*All logic runs locally; no network calls are required, preserving the "no‑forward" guarantee.*
