
import os
import json
from googleapiclient.discovery import build
from google.oauth2 import service_account

PACKAGE_NAME = "com.fm.naipunya"
KEY_FILE = "service_account.json"

def verify():
    output = []
    try:
        output.append("Step 1: Authenticating...")
        creds = service_account.Credentials.from_service_account_file(KEY_FILE).with_scopes(['https://www.googleapis.com/auth/androidpublisher'])
        service = build('androidpublisher', 'v3', credentials=creds)
        
        output.append(f"Step 2: Checking package {PACKAGE_NAME}...")
        edit = service.edits().insert(packageName=PACKAGE_NAME, body={}).execute()
        output.append(f"SUCCESS: Handshake confirmed! Edit ID: {edit['id']}")
    except Exception as e:
        output.append(f"FAILED: {str(e)}")
        if hasattr(e, 'content'):
            output.append(f"Content: {e.content.decode('utf-8')}")
            
    with open("handshake_final.log", "w", encoding="utf-8") as f:
        f.write("\n".join(output))

if __name__ == "__main__":
    verify()
