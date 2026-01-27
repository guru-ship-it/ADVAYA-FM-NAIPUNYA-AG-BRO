import os
from googleapiclient.discovery import build
from google.oauth2 import service_account

PACKAGE_NAME = "com.fm.naipunya" # Primary target from internal testing
KEY_FILE = "service_account.json"

def verify():
    if not os.path.exists(KEY_FILE):
        print(f"ERROR: {KEY_FILE} not found in root.")
        return

    try:
        print("Authenticating with Google Play...")
        creds = service_account.Credentials.from_service_account_file(KEY_FILE)
        scoped_creds = creds.with_scopes(['https://www.googleapis.com/auth/androidpublisher'])
        
        service = build('androidpublisher', 'v3', credentials=scoped_creds)

        print(f"Testing package names...")
        packages = ["com.fm.naipunya", "com.advaya.fm", "com.advayaLMS.fm", "com.advaya.naipunya.total"]
        for pkg in packages:
            try:
                print(f"Trying: {pkg}...")
                edit_request = service.edits().insert(packageName=pkg, body={})
                edit = edit_request.execute()
                print(f"SUCCESS: Handshake confirmed! Connected to Google Play via {pkg}.")
                print(f"Transaction (Edit) ID: {edit['id']}")
                return # Exit on first success
            except Exception as e:
                if hasattr(e, 'resp') and e.resp.status:
                     print(f"FAILED for {pkg}: HTTP {e.resp.status}")
                if hasattr(e, 'content'):
                    print(f"Details: {e.content.decode('utf-8')}")
                else:
                    print(f"Exception: {str(e)}")
                pass
        
        print("ERROR: None of the target package names were found.")
        raise Exception("Package Not Found")
        
    except Exception as e:
        print("HANDSHAKE FAILED.")
        import traceback
        # traceback.print_exc()

if __name__ == "__main__":
    verify()
