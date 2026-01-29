// Module 1: Grooming - Visual Integrity Protocol

function loadModule1() {
    const container = document.querySelector('#module-content');
    if (!container) {
        console.error("Module content container not found!");
        return;
    }

    // Clear previous content
    container.innerHTML = '';

    // Load M1 Assets
    container.innerHTML = `
    <!-- Grooming Kit Model -->
    <a-entity gltf-model="#kit" position="-1 1 -3" scale="0.2 0.2 0.2"></a-entity>
    
    <!-- Instruction Board -->
    <a-box position="0 1.5 -4" depth="0.1" width="2" height="3" color="#444">
      <a-text value="THE FIRST IMPRESSION: MNC STANDARDS" position="0 1 0.1" align="center" width="4"></a-text>
      
      <!-- Interactive Error Node: Wrinkled Collar -->
      <a-sphere id="error1" position="-0.5 0.5 0.2" radius="0.05" color="red" 
                event-set__click="text: 'Pragati: Wrinkled Collar Corrected'; _target: #pragati-text">
      </a-sphere>
    </a-box>
  `;

    console.log("Module 1 (Foundations) Loaded: Visual Integrity Protocol Active.");
}
