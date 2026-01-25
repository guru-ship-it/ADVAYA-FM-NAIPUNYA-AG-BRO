import os
from googleapiclient.discovery import build
from google.oauth2 import service_account

PACKAGE_NAME = "com.advaya.naipunya.total"
BUNDLE_PATH = "outputs/advaya-release.aab"

def upload_to_internal_track():
    creds = service_account.Credentials.from_service_account_file('service_account.json')
    service = build('androidpublisher', 'v3', credentials=creds)
    
    edit = service.edits().insert(packageName=PACKAGE_NAME, body={}).execute()
    bundle = service.edits().bundles().upload(packageName=PACKAGE_NAME, editId=edit['id'], media_body=BUNDLE_PATH).execute()
    
    service.edits().tracks().update(packageName=PACKAGE_NAME, editId=edit['id'], track='internal', body={
        "releases": [{"versionCodes": [str(bundle['versionCode'])], "status": "completed"}]
    }).execute()
    
    service.edits().commit(packageName=PACKAGE_NAME, editId=edit['id']).execute()
    print("Advaya FM NaipuNya: Internal Track Updated Successfully.")

if __name__ == "__main__":
    upload_to_internal_track()
