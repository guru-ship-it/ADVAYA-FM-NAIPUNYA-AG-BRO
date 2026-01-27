
import os
import json
from googleapiclient.discovery import build
from google.oauth2 import service_account

PACKAGE_NAMES = ["com.advaya.fm", "com.advayaLMS.fm"]
KEY_FILE = "service_account.json"

def verify():
    output = []
    try:
        output.append("Step 1: Authenticating...")
        creds = service_account.Credentials.from_service_account_file(KEY_FILE).with_scopes(['https://www.googleapis.com/auth/androidpublisher'])
        service = build('androidpublisher', 'v3', credentials=creds)
        
        for pkg in PACKAGE_NAMES:
            output.append(f"\nChecking package {pkg}...")
            try:
                edit = service.edits().insert(packageName=pkg, body={}).execute()
                output.append(f"SUCCESS for {pkg}! Edit ID: {edit['id']}")
            except Exception as e:
                output.append(f"FAILED for {pkg}: {str(e)}")
                if hasattr(e, 'content'):
                    output.append(f"Content: {e.content.decode('utf-8')}")
            
    except Exception as e:
        output.append(f"GLOBAL FAILURE: {str(e)}")
            
    with open("handshake_others.log", "w", encoding="utf-8") as f:
        f.write("\n".join(output))

if __name__ == "__main__":
    verify()
