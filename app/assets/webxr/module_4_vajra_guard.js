// Module 4: Vajra Guard - The 5-Point Vehicle Inspection Ritual
// Refactored to work with NaipunyaEngine (loadXR_M4 pattern)

function loadXR_M4(scene, container, onComplete) {
    const status = document.getElementById('xr-status');
    const task = document.getElementById('xr-task');
    task.textContent = 'Complete 5-Point Vehicle Inspection';
    status.textContent = '0 / 5 points checked';

    let checked = 0;
    const points = {
        tyres: false, fluids: false, lights: false, wipers: false, cabin: false
    };

    function checkCompletion() {
        if (Object.values(points).every(v => v)) {
            instText.setAttribute('value', 'VAJRA GUARD COMPLIANT!\nVehicle is Mission Ready.');
            instText.setAttribute('color', '#00ff00');
            status.textContent = '5 / 5 - INSPECTION COMPLETE';
            setTimeout(() => onComplete({ passed: true, score: 100 }), 2000);
        }
    }

    // Vehicle body (primitive box instead of GLB)
    const carBody = document.createElement('a-box');
    carBody.setAttribute('position', '0 0.6 -4');
    carBody.setAttribute('width', '2.2'); carBody.setAttribute('height', '1'); carBody.setAttribute('depth', '4');
    carBody.setAttribute('color', '#2a3a5a');
    container.appendChild(carBody);

    // Car roof
    const roof = document.createElement('a-box');
    roof.setAttribute('position', '0 1.3 -4');
    roof.setAttribute('width', '1.8'); roof.setAttribute('height', '0.6'); roof.setAttribute('depth', '2');
    roof.setAttribute('color', '#1a2a4a');
    container.appendChild(roof);

    // Wheels
    [[-0.9, 0.2, -2.5], [0.9, 0.2, -2.5], [-0.9, 0.2, -5.5], [0.9, 0.2, -5.5]].forEach(p => {
        const wheel = document.createElement('a-cylinder');
        wheel.setAttribute('position', p.join(' '));
        wheel.setAttribute('radius', '0.3'); wheel.setAttribute('height', '0.15');
        wheel.setAttribute('rotation', '0 0 90'); wheel.setAttribute('color', '#111');
        container.appendChild(wheel);
    });

    // Instruction text
    const instText = document.createElement('a-text');
    instText.setAttribute('value', 'VAJRA 5-POINT INSPECTION\nClick the RED zones to inspect');
    instText.setAttribute('position', '0 2.8 -4'); instText.setAttribute('align', 'center');
    instText.setAttribute('color', '#FFCC00'); instText.setAttribute('width', '4');
    instText.setAttribute('id', 'vajra-instruction');
    container.appendChild(instText);

    // Inspection hitboxes
    const hitboxes = [
        { key:'tyres', pos:'1.2 0.3 -2.8', r:0.3, label:'TYRES' },
        { key:'fluids', pos:'0 1.0 -2.3', r:0.3, label:'FLUIDS' },
        { key:'lights', pos:'-0.9 0.7 -2.2', r:0.25, label:'LIGHTS' },
        { key:'wipers', pos:'0 1.5 -3', r:0.2, label:'WIPERS' },
        { key:'cabin', pos:'-1.2 0.9 -4', r:0.35, label:'CABIN' }
    ];

    hitboxes.forEach(h => {
        const sphere = document.createElement('a-sphere');
        sphere.setAttribute('position', h.pos);
        sphere.setAttribute('radius', h.r);
        sphere.setAttribute('color', '#ff3333');
        sphere.setAttribute('opacity', '0.6');
        sphere.setAttribute('class', 'clickable');
        sphere.setAttribute('animation', 'property: opacity; from: 0.4; to: 0.8; dur: 800; loop: true; dir: alternate');

        const label = document.createElement('a-text');
        label.setAttribute('value', h.label);
        label.setAttribute('position', '0 ' + (h.r + 0.15) + ' 0');
        label.setAttribute('align', 'center'); label.setAttribute('color', '#ff4444');
        label.setAttribute('width', '2');
        sphere.appendChild(label);

        sphere.addEventListener('click', function handler() {
            if (points[h.key]) return;
            points[h.key] = true;
            checked++;
            sphere.setAttribute('color', '#00ff00');
            sphere.setAttribute('opacity', '1');
            sphere.removeAttribute('animation');
            label.setAttribute('color', '#00ff00');
            label.setAttribute('value', h.label + ' OK');
            status.textContent = checked + ' / 5 points checked';
            checkCompletion();
        });

        container.appendChild(sphere);
    });
}
