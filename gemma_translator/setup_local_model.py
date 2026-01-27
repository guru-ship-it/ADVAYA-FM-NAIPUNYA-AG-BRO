import os
import json

def configure_local_models():
    models = {
        "translator": {
            "name": "Translate Gemma 4B",
            "path": r"d:\AI_Models\kaggle_cache\models\google\translategemma\transformers\translategemma-4b-it",
            "required_files": ["config.json", "model.safetensors.index.json"]
        }
    }
    
    config_data = {}
    
    for key, model in models.items():
        print(f"Checking for {model['name']} at: {model['path']}")
        if os.path.exists(model['path']):
            print(f"{model['name']} found!")
            config_data[key] = model['path']
        else:
            print(f"{model['name']} NOT found.")
            
    # Save the paths to a JSON file for better structure
    with open("model_config.json", "w") as f:
        json.dump(config_data, f, indent=4)
        print("Configuration saved to model_config.json")

if __name__ == "__main__":
    configure_local_models()
