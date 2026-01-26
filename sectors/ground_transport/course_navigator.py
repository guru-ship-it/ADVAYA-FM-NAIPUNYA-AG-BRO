import json
import os
import random
import time
import sys

# Add project root to path for imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
try:
    from gemma_translator.translator_bridge import GemmaTranslator
except ImportError:
    class GemmaTranslator:
        def translate(self, text, target_language="Hindi"): return text

class CourseNavigator:
    def __init__(self, driver_id):
        self.driver_id = driver_id
        self.translator = GemmaTranslator()
        self.manifest_path = os.path.join(os.path.dirname(__file__), "course_manifest.json")
        self.progress_path = os.path.join(os.path.dirname(__file__), f"{driver_id}_progress.json")
        self.manifest = self._load_json(self.manifest_path)
        self.progress = self._load_progress()

    def _load_json(self, path):
        try:
            with open(path, "r") as f:
                return json.load(f)
        except Exception:
            return {}

    def _load_progress(self):
        if os.path.exists(self.progress_path):
            return self._load_json(self.progress_path)
        return {"completed_modules": [], "current_module": "M1"}

    def _save_progress(self):
        with open(self.progress_path, "w") as f:
            json.dump(self.progress, f, indent=2)

    def start_session(self):
        current_id = self.progress.get("current_module", "M1")
        module = next((m for m in self.manifest.get("modules", []) if m["id"] == current_id), None)

        if not module:
            print("[Didi]: All modules completed, brother! You are a Vajra-level professional now.")
            return

        print(f"\n--- SESSION START: {module['title']} ({module['id']}) ---")
        
        # Vajra Handshake Simulation
        if not self._check_vajra_liveness():
            print("[FAIL] Vajra Handshake Failed. Session Locked.")
            return

        print(f"[Pragati (Gemma 4B)]: Let's begin {module['title']}. Pay close attention.")

        if module["type"] == "theory":
            self._run_theory_session(module)
        elif module["type"] == "interactive_xr":
            self._run_xr_session(module)

    def _check_vajra_liveness(self):
        challenges = ["Blink Twice", "Look Left", "Nod Slightly"]
        challenge = random.choice(challenges)
        print(f"\n[VAJRA ACTION]: Please {challenge} for the camera...")
        time.sleep(1) # Simulated analysis
        print(f"[PASS] Identity Verified via GCP Math Engine.")
        return True

    def _run_theory_session(self, module):
        watch_time = module.get("min_watch_time_s", 30)
        print(f"[SYSTEM]: Buffering theory video... ({watch_time}s required)")
        
        # Intermittent liveness logic
        if watch_time > 10:
            time.sleep(1)
            print("[VAJRA WATCH]: Continuous liveness check triggered...")
            self._check_vajra_liveness()
        
        time.sleep(1) # Simulated watch time completion
        print(f"[SUCCESS]: Module {module['id']} theory content completed.")
        self._mark_complete(module['id'])

    def _run_xr_session(self, module):
        print(f"[LAUNCHING XR]: {module.get('xr_scene', 'default.html')}")
        print("[SYSTEM]: Please complete the Hazard Detection in the mobile browser...")
        time.sleep(2) # Simulated XR completion
        
        # Mocking score from XR
        score = random.randint(85, 100)
        print(f"[RESULT]: Hazard Score: {score}%")
        
        if score >= module["pass_criteria"]["min_score"]:
            print(f"[Didi]: Excellent work! {module['id']} is complete.")
            self._mark_complete(module['id'])
        else:
            print(f"[Didi]: You missed a few hazards. Let's try Module {module['id']} again.")

    def _mark_complete(self, module_id):
        if module_id not in self.progress["completed_modules"]:
            self.progress["completed_modules"].append(module_id)
        
        # Determine next module
        manifest_modules = self.manifest.get("modules", [])
        current_idx = next((i for i, m in enumerate(manifest_modules) if m["id"] == module_id), -1)
        
        if current_idx != -1 and current_idx < len(manifest_modules) - 1:
            self.progress["current_module"] = manifest_modules[current_idx + 1]["id"]
        else:
            self.progress["current_module"] = "COMPLETED"
            
        self._save_progress()
        print(f"[PROGRESS SAVED]: Current position is now {self.progress['current_module']}")

if __name__ == "__main__":
    nav = CourseNavigator("Driver_007")
    # Simulate first two modules
    nav.start_session() # M1
    nav.start_session() # M2
