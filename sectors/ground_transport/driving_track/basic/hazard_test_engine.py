import random
import time

class HazardTestEngine:
    def __init__(self):
        self.hazards = [
            {"id": "H1", "type": "Pedestrian_Crossing", "severity": "HIGH"},
            {"id": "H2", "type": "Cow_On_Road", "severity": "MEDIUM"},
            {"id": "H3", "type": "Sudden_Braking_Ahead", "severity": "HIGH"},
            {"id": "H4", "type": "Blind_Curve_Overtake", "severity": "CRITICAL"}
        ]
        self.passing_score = 80  # Percent

    def start_simulation(self, driver_id):
        print(f"Starting Hazard Test for Driver: {driver_id}")
        print("Protocol: React within 3 seconds of Hazard Trigger.")
        
        score = 0
        total_scenarios = len(self.hazards)

        for hazard in self.hazards:
            print(f"\n--- Scenario: {hazard['type']} ---")
            reaction_time = self._simulate_driver_reaction()
            
            if reaction_time <= 3.0:
                print(f"✅ Reaction: {reaction_time}s (SAFE)")
                score += 1
            else:
                print(f"❌ Reaction: {reaction_time}s (TOO SLOW - DANGER)")

        final_percentage = (score / total_scenarios) * 100
        self._generate_report(driver_id, final_percentage)

    def _simulate_driver_reaction(self):
        # Simulating random reaction times between 0.5s and 4.0s
        return round(random.uniform(0.5, 4.0), 2)

    def _generate_report(self, driver_id, score):
        status = "PASSED" if score >= self.passing_score else "FAILED"
        print(f"\n*** TEST RESULT: {status} ***")
        print(f"Driver: {driver_id}")
        print(f"Score: {score}%")
        if status == "FAILED":
            print("Action: Mandatory Retake of Module 5 Video.")

if __name__ == "__main__":
    engine = HazardTestEngine()
    engine.start_simulation("Pilot_001")
