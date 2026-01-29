// The "Sovereign Eight" Module Logic
// Protocol: A-Frame WebXR | Feedback: Advaya Commercial Engine (API) | Alerts: MSG91

const SOVEREIGN_MODULES = {
    M1: {
        id: "M1",
        name: "Foundations",
        scene: "The Digital Mirror (Locker Room)",
        logic: "Visual Integrity Protocol. User must 'grab and fix' 5 errors: wrinkled collar, unpolished shoes, uneven shave, missing badge, messy hair.",
        script: "A Broadcom employee judges your safety by your sleeve. If you can't manage a collar, how can you manage a vehicle?",
        duration: "30 mins"
    },
    M2: {
        id: "M2",
        name: "Digital Skill",
        scene: "The Virtual Cabin (Floating Tablet)",
        logic: "Vajra Tick Engine. Cognitive Load Management. Verify tick while screen glitches and virtual passenger asks ETA.",
        script: "Ethics in digital data is your shield. Verify the tick, but keep your eyes on the mission.",
        duration: "30 mins"
    },
    M3: {
        id: "M3",
        name: "Elite Conduct",
        scene: "The MNC Lobby (360 Theater)",
        logic: "POSH Sphere. Gaze-Lock on boundary violations (phrases/body language).",
        script: "In this circuit, silence is not enough. You must actively maintain the Elite Guard standard.",
        duration: "30 mins"
    },
    M4: {
        id: "M4",
        name: "Vajra Guard",
        scene: "The 360 Inspection",
        logic: "5-Point Check Ritual. Touch 5 points: Tyres, Fluids, Lights, Wipers, Cabin Sanitization.",
        script: "Mechanical duty is a ritual, not a chore.",
        duration: "30 mins"
    },
    M5: {
        id: "M5",
        name: "Defensive I",
        scene: "Hazard POV (360 Video)",
        logic: "The 3-Second Rule. Keep gap from car ahead. restart if shield turns red.",
        script: "Safety isn't a feeling; it's a distance. Keep the three-second shield active.",
        duration: "30 mins"
    },
    M6: {
        id: "M6",
        name: "Defensive II",
        scene: "The Tabletop City (AR Map)",
        logic: "Intersection Master. Drag and drop vehicles into lanes. Sovereign Score drops on violation.",
        script: "Navigate the bottleneck with discipline.",
        duration: "30 mins"
    },
    M7: {
        id: "M7",
        name: "Night Watch",
        scene: "The Midnight Shift (Dark Mode)",
        logic: "Luminance Guard. Screen dims (fatigue). Perform 'Alertness Taps' on moving targets.",
        script: "The late-night pick is the most dangerous. If your eyes grow heavy, the Pragati Gateway closes.",
        duration: "30 mins"
    },
    M8: {
        id: "M8",
        name: "First Guard",
        scene: "The Crash Site (3D Audio)",
        logic: "The Golden Hour. Sequence: Secure Site -> Pulse Check -> SOS Trigger -> Basic Medical in < 60s.",
        script: "Panic is the enemy. Speed and protocol save lives.",
        duration: "30 mins"
    }
};

function getModuleInfo(moduleId) {
    return SOVEREIGN_MODULES[moduleId] || null;
}
