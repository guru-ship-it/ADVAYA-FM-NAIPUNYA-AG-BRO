
import os
import json
from googleapiclient.discovery import build
from google.oauth2 import service_account

KEY_FILE = "service_account.json"
PACKAGES = ["com.fm.naipunya", "com.advaya.naipunya.total", "com.advaya.fm"]

def check_tracks():
    creds = service_account.Credentials.from_service_account_file(KEY_FILE).with_scopes(['https://www.googleapis.com/auth/androidpublisher'])
    service = build('androidpublisher', 'v3', credentials=creds)
    
    for pkg in PACKAGES:
        print(f"\n--- Checking Package: {pkg} ---")
        try:
            # Check all tracks
            tracks = service.edits().tracks().list(packageName=pkg, editId=service.edits().insert(packageName=pkg, body={}).execute()['id']).execute()
            for track in tracks.get('tracks', []):
                print(f"Track: {track['track']}")
                for release in track.get('releases', []):
                    print(f"  Release: {release.get('name', 'Unnamed')} (Status: {release.get('status')})")
                    print(f"  Version Codes: {release.get('versionCodes')}")
        except Exception as e:
            print(f"  Error: {str(e)}")

if __name__ == "__main__":
    check_tracks()
