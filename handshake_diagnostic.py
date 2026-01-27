
import os
import json
from googleapiclient.discovery import build
from google.oauth2 import service_account

PACKAGE_NAMES = [
    "com.fm.naipunya",
    "com.advaya.fm",
    "com.advayaLMS.fm",
    "com.advaya.naipunya",
    "com.advaya.naipunya.total"
]
KEY_FILE = "service_account.json"

def verify():
    output = []
    output.append("--- HANDSHAKE DIAGNOSTIC REPORT ---")
    try:
        output.append("Step 1: Authenticating with service_account.json...")
        creds = service_account.Credentials.from_service_account_file(KEY_FILE).with_scopes(['https://www.googleapis.com/auth/androidpublisher'])
        service = build('androidpublisher', 'v3', credentials=creds)
        output.append("Authentication Successful.\n")

        for pkg in PACKAGE_NAMES:
            output.append(f"Testing Package: {pkg}")
            try:
                edit = service.edits().insert(packageName=pkg, body={}).execute()
                output.append(f"  RESULT: SUCCESS!")
                output.append(f"  EDIT_ID: {edit['id']}\n")
            except Exception as e:
                status = getattr(e, 'resp', {}).status if hasattr(e, 'resp') else "N/A"
                if status == "N/A" and hasattr(e, 'status_code'): status = e.status_code
                
                output.append(f"  RESULT: FAILED (HTTP {status})")
                if "404" in str(status):
                    output.append("  REASON: Package Not Found (Maybe wrong package name or API project not linked).")
                elif "403" in str(status):
                    output.append("  REASON: Permission Denied (Service account needs Admin user role for this app).")
                else:
                    output.append(f"  ERROR: {str(e)}")
                output.append("")

    except Exception as e:
        output.append(f"GLOBAL FAILURE: {str(e)}")

    with open("handshake_report.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(output))
    print("Handshake report generated: handshake_report.txt")

if __name__ == "__main__":
    verify()
