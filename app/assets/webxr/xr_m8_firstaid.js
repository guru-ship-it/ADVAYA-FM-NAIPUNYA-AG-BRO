// M8: First Aid - 4-step emergency sequence in correct order
function loadXR_M8(scene, container, onComplete) {
    const status = document.getElementById('xr-status');
    const task = document.getElementById('xr-task');
    task.textContent = 'Complete emergency steps in correct order';

    const steps = [
        { id:'assess', label:'1. ASSESS SCENE\nCheck for danger', color:'#ff6600', pos:'-1 1.8 -3' },
        { id:'call', label:'2. CALL 112\nEmergency services', color:'#ff4444', pos:'1 1.8 -3' },
        { id:'secure', label:'3. SECURE SITE\nWarning triangle', color:'#ffcc00', pos:'-1 0.8 -3' },
        { id:'aid', label:'4. FIRST AID\nCPR / Stop bleeding', color:'#00ccff', pos:'1 0.8 -3' }
    ];

    const correctOrder = ['assess', 'call', 'secure', 'aid'];
    let clickedOrder = [];
    let currentStep = 0;

    const title = document.createElement('a-text');
    title.setAttribute('value', 'EMERGENCY RESPONSE PROTOCOL');
    title.setAttribute('position', '0 3.2 -3'); title.setAttribute('align', 'center');
    title.setAttribute('color', '#ff4444'); title.setAttribute('width', '4');
    container.appendChild(title);

    const instruct = document.createElement('a-text');
    instruct.setAttribute('value', 'Click the steps in the CORRECT ORDER');
    instruct.setAttribute('position', '0 2.8 -3'); instruct.setAttribute('align', 'center');
    instruct.setAttribute('color', '#fff'); instruct.setAttribute('width', '3');
    instruct.setAttribute('id', 'aid-instruct');
    container.appendChild(instruct);

    const feedback = document.createElement('a-text');
    feedback.setAttribute('id', 'aid-feedback');
    feedback.setAttribute('position', '0 0.2 -3'); feedback.setAttribute('align', 'center');
    feedback.setAttribute('color', '#fff'); feedback.setAttribute('width', '3');
    container.appendChild(feedback);

    // Crash scene background
    const wreck = document.createElement('a-box');
    wreck.setAttribute('position', '0 0.3 -6');
    wreck.setAttribute('width', '2'); wreck.setAttribute('height', '0.8'); wreck.setAttribute('depth', '1.5');
    wreck.setAttribute('color', '#332222'); wreck.setAttribute('rotation', '0 15 5');
    container.appendChild(wreck);

    // Flashing hazard light
    const hazard = document.createElement('a-sphere');
    hazard.setAttribute('position', '1.5 0.8 -6');
    hazard.setAttribute('radius', '0.1'); hazard.setAttribute('color', '#ff6600');
    hazard.setAttribute('animation', 'property: material.opacity; from: 1; to: 0.2; dur: 500; loop: true; dir: alternate');
    container.appendChild(hazard);

    const stepEls = {};
    steps.forEach(s => {
        const btn = document.createElement('a-box');
        btn.setAttribute('position', s.pos);
        btn.setAttribute('width', '0.9'); btn.setAttribute('height', '0.55'); btn.setAttribute('depth', '0.06');
        btn.setAttribute('color', s.color);
        btn.setAttribute('class', 'clickable');
        btn.setAttribute('opacity', '0.8');

        const txt = document.createElement('a-text');
        txt.setAttribute('value', s.label);
        txt.setAttribute('align', 'center'); txt.setAttribute('color', '#fff');
        txt.setAttribute('width', '2'); txt.setAttribute('position', '0 0 0.04');
        btn.appendChild(txt);

        btn.addEventListener('click', function handler() {
            if (clickedOrder.includes(s.id)) return;

            if (s.id === correctOrder[currentStep]) {
                // Correct step
                btn.setAttribute('color', '#00aa00');
                btn.setAttribute('opacity', '1');
                clickedOrder.push(s.id);
                currentStep++;
                feedback.setAttribute('value', 'Step ' + currentStep + ' correct!');
                feedback.setAttribute('color', '#00ff00');
                status.textContent = currentStep + ' / 4 steps completed';

                if (currentStep === 4) {
                    document.getElementById('aid-instruct').setAttribute('value', 'PROTOCOL COMPLETE! All steps in correct order!');
                    document.getElementById('aid-instruct').setAttribute('color', '#00ff00');
                    feedback.setAttribute('value', 'Assess > Call > Secure > Aid - Perfect!');
                    setTimeout(() => onComplete({ passed: true, score: 100 }), 2500);
                }
            } else {
                // Wrong order
                btn.setAttribute('animation', 'property: position; from: ' + s.pos + '; to: ' +
                    s.pos.split(' ').map((v,i) => i===0 ? (parseFloat(v)+0.05) : v).join(' ') +
                    '; dur: 100; loop: 3; dir: alternate');
                feedback.setAttribute('value', 'Wrong order! Next step should be: ' + correctOrder[currentStep].toUpperCase());
                feedback.setAttribute('color', '#ff4444');
            }
        });

        container.appendChild(btn);
        stepEls[s.id] = btn;
    });

    status.textContent = '0 / 4 steps completed';
}
