// Module 4: Vajra Guard - The 5-Point Inspection Ritual
// Logic: User must physically "touch" (click/gaze) 5 distinct zones on the virtual cab.

function loadModule4() {
    const container = document.querySelector('#module-content');
    if (!container) return;

    container.innerHTML = ''; // Reset Scene

    // State Tracking
    let pointsChecked = {
        tyres: false,
        fluids: false,
        lights: false,
        wipers: false,
        cabin: false
    };

    const checkCompletion = () => {
        const allChecked = Object.values(pointsChecked).every(v => v === true);
        if (allChecked) {
            document.querySelector('#pragati-text').setAttribute('value', 'Vajra Guard Compliant. Vehicle is Mission Ready.');
            // Telemetry: POST completion to Engine
            console.log('M4_COMPLETE');
        }
    };

    const registerTouch = (point) => {
        if (!pointsChecked[point]) {
            pointsChecked[point] = true;
            document.querySelector('#pragati-text').setAttribute('value', `Checked: ${point.toUpperCase()}`);

            // Visual Feedback: Turn Green
            const el = document.querySelector(`#hpot-${point}`);
            if (el) el.setAttribute('material', 'color', '#00FF00'); // Green

            checkCompletion();
        }
    };

    // Scene Assets
    // We place "Hitboxes" (transparent spheres) around the car model for the 5 points
    container.innerHTML = `
    <!-- The Cab Model (Centerpiece) -->
    <a-entity gltf-model="#cab" position="0 0 -4" scale="1 1 1"></a-entity>

    <!-- 1. Tyres (Front Right) -->
    <a-sphere id="hpot-tyres" position="1.5 0.5 -3" radius="0.3" color="red" opacity="0.5"
              class="clickable"
              animation="property: opacity; to: 0.8; dir: alternate; loop: true; dur: 1000"></a-sphere>

    <!-- 2. Fluids (Bonnet Area) -->
    <a-sphere id="hpot-fluids" position="0 1.2 -2.5" radius="0.3" color="red" opacity="0.5"
              class="clickable"
              animation="property: opacity; to: 0.8; dir: alternate; loop: true; dur: 1000"></a-sphere>

    <!-- 3. Lights (Headlights) -->
    <a-sphere id="hpot-lights" position="-1.2 0.8 -2.5" radius="0.25" color="red" opacity="0.5"
              class="clickable"
              animation="property: opacity; to: 0.8; dir: alternate; loop: true; dur: 1000"></a-sphere>

    <!-- 4. Wipers (Windshield) -->
    <a-box id="hpot-wipers" position="0 1.6 -3.2" width="1.5" height="0.2" depth="0.2" color="red" opacity="0.5"
           class="clickable"
           animation="property: opacity; to: 0.8; dir: alternate; loop: true; dur: 1000"></a-box>

    <!-- 5. Cabin (Door/Interior) -->
    <a-sphere id="hpot-cabin" position="-1.5 1.2 -4" radius="0.4" color="red" opacity="0.5"
              class="clickable"
              animation="property: opacity; to: 0.8; dir: alternate; loop: true; dur: 1000"></a-sphere>
    
    <!-- Instruction Text -->
    <a-text value="TASK: Touch 5 Inspection Points" position="0 2.5 -4" align="center" color="#FFFF00" scale="1.5 1.5 1.5"></a-text>
  `;

    // Attach Event Listeners to the new DOM elements
    // Note: A-Frame elements need to be loaded before adding listeners, or we use event-set in HTML
    // Here we attach via JS for Logic Control
    setTimeout(() => {
        ['tyres', 'fluids', 'lights', 'wipers', 'cabin'].forEach(p => {
            const el = document.querySelector(`#hpot-${p}`);
            if (el) {
                el.addEventListener('click', () => registerTouch(p));
                // Add gaze-fuse behavior if strictly VR
                el.addEventListener('mouseenter', () => { /* optional hover feedback */ });
            }
        });
    }, 500); // Slight delay for DOM injection
}
