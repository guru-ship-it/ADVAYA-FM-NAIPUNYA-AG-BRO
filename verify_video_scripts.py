import json
import os

DIALOGUE_FILE = r"d:\ADVAYA_FM_Elite\sectors\ground_transport\training_modules\docs\full_module_dialogues.json"
MANIFEST_FILE = r"d:\ADVAYA_FM_Elite\sectors\ground_transport\video_script_manifest.json"

def verify():
    with open(DIALOGUE_FILE, 'r') as f:
        dialogues = json.load(f)
    with open(MANIFEST_FILE, 'r') as f:
        manifest = json.load(f)

    print("--- Video Script Consistency Audit ---")
    results = []
    
    for mod in manifest:
        mod_id = mod['mod_id']
        dialogue = next((d for d in dialogues if d['module'] == mod_id), None)
        
        status = "OK"
        issues = []
        
        if not dialogue:
            status = "MISSING DIALOGUE"
            issues.append(f"No entry found in dialogues for Module {mod_id}")
        else:
            # Check for logo/site cues in visual prompts as requested by CTO
            visual = mod.get('veo_visual', '')
            if "logo" not in visual.lower():
                issues.append("MISSING: 'Advaya FM logo overlay' instruction in Veo prompt.")
            if "broadcom" not in visual.lower() and "site" not in visual.lower():
                issues.append("MISSING: Specific 'Broadcom site cues' in Veo prompt.")

        results.append({
            "Module": mod_id,
            "Title": mod['title'],
            "Status": status,
            "Issues": issues
        })

    print(json.dumps(results, indent=2))
    
    with open("script_verification_results.json", "w") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    verify()
