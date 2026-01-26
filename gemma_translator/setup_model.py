import kagglehub
import os

def download_model():
    print("Starting download of google/translategemma/transformers/translategemma-12b-it...")
    try:
        # Download latest version
        path = kagglehub.model_download("google/translategemma/transformers/translategemma-12b-it")
        print(f"Model downloaded successfully to: {path}")
        
        # Save the path to a file for other scripts to use
        with open("model_path.txt", "w") as f:
            f.write(path)
            
        return path
    except Exception as e:
        print(f"Failed to download model: {e}")
        return None

if __name__ == "__main__":
    download_model()
