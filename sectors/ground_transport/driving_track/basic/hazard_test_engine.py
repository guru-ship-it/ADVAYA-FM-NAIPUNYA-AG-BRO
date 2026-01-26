import random
import time
import json
import os
import sys

# Add project root to path for imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../..")))
from gemma_translator.translator_bridge import GemmaTranslator

class HazardTestEngine:
    def __init__(self):
        self.translator = GemmaTranslator()
        self.welcome_script = self._load_json("pragati_welcome.json")
        self.manifest = self._load_json("curriculum_manifest.json")
        
        # Load config from manifest or fallback
        if self.manifest:
            self.hazards = self.manifest.get("hazards", [])
            self.pass_criteria = self.manifest.get("pass_criteria", {"min_score": 80, "max_avg_latency": 1300})
            print(f"Loaded Track: {self.manifest.get('track_name', 'Unknown')}")
        else:
            self.hazards = []
            self.pass_criteria = {"min_score": 80, "max_avg_latency": 1300}
            print("⚠️ Warning: No manifesto found. Simulation empty.")

    def _load_json(self, filename):
        try:
            path = os.path.join(os.path.dirname(__file__), filename)
            with open(path, "r") as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"⚠️ Warning: {filename} not found.")
            return None

    def start_simulation(self, driver_id):
        print(f"Starting Hazard Test for Driver: {driver_id}")
        
        # Pragati Welcome Sequence (Phase 1 only per user request emphasis)
        if self.welcome_script:
            self._display_phase("phase_1")
        
        if not self.hazards:
            print("No hazards defined in manifest.")
            return

        print("\n--- SIMULATION STARTING ---")
        
        total_hazards = len(self.hazards)
        passed_hazards = 0
        total_latency_ms = 0
        
        print(f"Track ID: {self.manifest.get('module_id', 'N/A')}")
        print(f"Pass Criteria: Min Score {self.pass_criteria['min_score']}%, Max Avg Latency {self.pass_criteria['max_avg_latency']}ms")

        for hazard in self.hazards:
            print(f"\n--- [T+{hazard['timestamp']}] Scenario: {hazard['type']} (Severity: {hazard['severity']}) ---")
            
            # Simulate reaction (random float seconds)
            reaction_s = self._simulate_driver_reaction()
            reaction_ms = int(reaction_s * 1000)
            threshold_ms = hazard['reaction_threshold_ms']
            
            is_success = reaction_ms <= threshold_ms
            status_icon = "✅" if is_success else "❌"
            
            print(f"{status_icon} Reaction: {reaction_ms}ms (Threshold: {threshold_ms}ms)")
            
            if is_success:
                passed_hazards += 1
            
            total_latency_ms += reaction_ms
            time.sleep(0.5)

        avg_latency = total_latency_ms / total_hazards if total_hazards > 0 else 0
        score_pct = (passed_hazards / total_hazards) * 100
        
        self._generate_report(driver_id, score_pct, avg_latency)

    def _display_phase(self, phase_key):
        if not self.welcome_script or phase_key not in self.welcome_script:
            return

        phase = self.welcome_script[phase_key]
        print(f"\n--- {phase['title']} ({phase['tone']}) ---")
        
        # Translate using 4B model (simulated via bridge)
        translated_text = self.translator.translate(phase["text"], target_language="Hindi")
        print(translated_text)
        time.sleep(1) 

    def _simulate_driver_reaction(self):
        # Simulating random reaction times between 0.5s and 2.0s
        return round(random.uniform(0.5, 2.0), 3)

    def _generate_report(self, driver_id, score, avg_latency):
        print(f"\n*** TEST RESULT FOR {driver_id} ***")
        print(f"Score: {score:.1f}% (Required: {self.pass_criteria['min_score']}%)")
        print(f"Avg Latency: {int(avg_latency)}ms (Max Allowed: {self.pass_criteria['max_avg_latency']}ms)")
        
        pass_score = score >= self.pass_criteria['min_score']
        pass_latency = avg_latency <= self.pass_criteria['max_avg_latency']
        
        if pass_score and pass_latency:
            status = "PASSED (Distinction)"
        else:
            status = "FAILED"
            if not pass_score: print("Reason: Score too low.")
            if not pass_latency: print("Reason: Reaction too slow.")

        print(f"Final Status: {status}")
        
        if status == "FAILED":
            print("Action: Mandatory Retake of Module 5 Video.")

if __name__ == "__main__":
    engine = HazardTestEngine()
    engine.start_simulation("Pilot_001")
