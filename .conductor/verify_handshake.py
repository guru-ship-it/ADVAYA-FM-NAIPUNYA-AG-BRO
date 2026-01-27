import os
from googleapiclient.discovery import build
from google.oauth2 import service_account

PACKAGE_NAME = "com.advaya.naipunya.total"
KEY_FILE = "service_account.json"

def verify():
    if not os.path.exists(KEY_FILE):
        print(f"❌ Error: {KEY_FILE} not found in root.")
        return

    try:
        print("🔐 Authenticating with Google Play...")
        creds = service_account.Credentials.from_service_account_file(KEY_FILE)
        # Scopes are required for some libraries, but build() usually handles it with the creds object if correct scopes are baked in or default. 
        # Best practice for google-auth is to define scopes if creating from service_account_file directly for specific APIs.
        scoped_creds = creds.with_scopes(['https://www.googleapis.com/auth/androidpublisher'])
        
        service = build('androidpublisher', 'v3', credentials=scoped_creds)

        print(f"📡 Listing accessible apps...")
        # Since we don't know if the package exists/is accessible, let's try reading tracks for the package
        # Actually, let's try to get the app details
        try:
            edit_request = service.edits().insert(packageName=PACKAGE_NAME, body={})
            edit = edit_request.execute()
            print(f"✅ SUCCESS: Handshake confirmed! Connected to Google Play.")
            print(f"ℹ️  Transaction (Edit) ID: {edit['id']}")
        except Exception as e:
            print(f"❌ Could not access {PACKAGE_NAME}. Trying listing if possible (Note: Play API doesn't have a simple 'list apps' for service accounts easily, checking permissions next)")
            raise e
        
    except Exception as e:
        print(f"❌ FAILED: {str(e)}")
        if hasattr(e, 'content'):
            print(f"Error Content: {e.content.decode('utf-8')}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    verify()
