# Advaya FM NaipuNya: Final Production Release

The build pipeline has been fully optimized and finalized for the Google Play Store. This document provides the location of all necessary files and the final build configuration.

## 1. Core Build Artifacts

These are the files you need to upload to the Play Console:

| Artifact | Location | Description |
| :--- | :--- | :--- |
| **App Bundle** | `app/build/app/outputs/bundle/release/app-release.aab` | The primary application package. |
| **Native Symbols** | `d:\ADVAYA_FM_ELITE\symbols` | Folder for "Native Debug Symbols". |
| **Mapping File** | `app/build/app/outputs/mapping/release/mapping.txt` | File for "ProGuard/R8 mapping". |

## 2. Release Configuration Info

| Component | Value |
| :--- | :--- |
| **Package Name** | `com.advaya.fm.naipunya` |
| **Target SDK** | 35 (Android 15) |
| **Signing Key** | `advaya_release_key.jks` |
| **Key Alias** | `advaya_upload_key` |

## 3. Play Console Upload Guide

1. **Upload AAB**: Drag and drop the `app-release.aab` into the "App bundles" section.
2. **Native Debug Symbols**: When prompted or in the "App bundle explorer", upload the **contents** of the `symbols` folder as a Zip file if required.
3. **De-obfuscation Mapping**: Upload the `mapping.txt` to the "Releases" -> "App bundle explorer" -> "Downloads" -> "Assets" under the mapping file section.

> [!IMPORTANT]
> The build script `run_build_auto.bat` is now configured to automatically generate these symbols in any future builds.

**Status: GOLD READY FOR PRODUCTION**
