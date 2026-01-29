import argparse
import sys
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

# CONFIG
PACKAGE_NAME = 'com.advaya.fm.naipunya'
TRACK = 'internal'
SERVICE_ACCOUNT_FILE = 'service_account.json'
AAB_FILE = r'd:\ADVAYA_FM_ELITE\app\build\app\outputs\bundle\release\app-release.aab'

def upload_bundle():
    print(f"Authenticating with {SERVICE_ACCOUNT_FILE}...")
    try:
        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE,
            scopes=['https://www.googleapis.com/auth/androidpublisher']
        )
        service = build('androidpublisher', 'v3', credentials=credentials)
    except Exception as e:
        print(f"Auth Error: {e}")
        return

    print(f"Uploading {AAB_FILE} to package {PACKAGE_NAME} (Track: {TRACK})...")
    
    try:
        # 1. Create Edit
        edit_request = service.edits().insert(body={}, packageName=PACKAGE_NAME)
        result = edit_request.execute()
        edit_id = result['id']
        print(f"Created Edit ID: {edit_id}")

        # 2. Upload Bundle
        media = MediaFileUpload(AAB_FILE, mimetype='application/octet-stream')
        bundle_response = service.edits().bundles().upload(
            editId=edit_id,
            packageName=PACKAGE_NAME,
            media_body=media
        ).execute()
        version_code = bundle_response['versionCode']
        print(f"Uploaded Bundle! Version Code: {version_code}")

        # 3. Assign to Track
        track_response = service.edits().tracks().update(
            editId=edit_id,
            packageName=PACKAGE_NAME,
            track=TRACK,
            body={
                'releases': [{
                    'versionCodes': [str(version_code)],
                    'status': 'completed'
                }]
            }
        ).execute()
        print(f"Track Updated: {track_response}")

        # 4. Commit Edit
        service.edits().commit(
            editId=edit_id,
            packageName=PACKAGE_NAME
        ).execute()
        print("SUCCESS: Edit Committed. Release is live in Internal Testing.")
        
    except Exception as e:
        print(f"Upload FAILED: {e}")
        print("Please check if the Service Account has 'Release Manager' permission in Play Console.")
        sys.exit(1)

if __name__ == '__main__':
    upload_bundle()
