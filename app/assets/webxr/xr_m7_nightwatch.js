// M7: Night Watch - Click glowing targets in dark scene (7/10 = pass)
function loadXR_M7(scene, container, onComplete) {
    const status = document.getElementById('xr-status');
    const task = document.getElementById('xr-task');
    task.textContent = 'Spot 10 targets in the dark (7 to pass)';

    // Dark sky
    scene.querySelector('a-sky').setAttribute('color', '#050510');
    // Dim ambient light
    scene.querySelector('a-light[type="ambient"]').setAttribute('intensity', '0.15');

    let hit = 0;
    let missed = 0;
    let spawned = 0;
    const total = 10;

    const title = document.createElement('a-text');
    title.setAttribute('value', 'NIGHT VISION TEST');
    title.setAttribute('position', '0 3 -3'); title.setAttribute('align', 'center');
    title.setAttribute('color', '#DFFF00'); title.setAttribute('width', '4');
    container.appendChild(title);

    const instruct = document.createElement('a-text');
    instruct.setAttribute('value', 'Click the glowing targets before they disappear!');
    instruct.setAttribute('position', '0 2.7 -3'); instruct.setAttribute('align', 'center');
    instruct.setAttribute('color', '#aaa'); instruct.setAttribute('width', '3');
    instruct.setAttribute('id', 'night-instruct');
    container.appendChild(instruct);

    // Dark road surface
    const road = document.createElement('a-box');
    road.setAttribute('position', '0 -0.1 -5');
    road.setAttribute('width', '6'); road.setAttribute('height', '0.05'); road.setAttribute('depth', '12');
    road.setAttribute('color', '#111');
    container.appendChild(road);

    function spawnTarget() {
        if (spawned >= total) return;
        spawned++;

        const x = (Math.random() - 0.5) * 4;
        const y = 0.5 + Math.random() * 2;
        const z = -2 - Math.random() * 6;

        const colors = ['#DFFF00','#00ffcc','#ff6600','#ff00ff','#00ff88'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        const target = document.createElement('a-sphere');
        target.setAttribute('position', x + ' ' + y + ' ' + z);
        target.setAttribute('radius', '0.15');
        target.setAttribute('color', color);
        target.setAttribute('class', 'clickable');
        target.setAttribute('animation', 'property: scale; from: 0.5 0.5 0.5; to: 1.3 1.3 1.3; dur: 600; loop: true; dir: alternate');

        // Add glow effect
        const glow = document.createElement('a-sphere');
        glow.setAttribute('radius', '0.25');
        glow.setAttribute('color', color);
        glow.setAttribute('opacity', '0.2');
        target.appendChild(glow);

        let active = true;
        target.addEventListener('click', function handler() {
            if (!active) return;
            active = false;
            target.removeEventListener('click', handler);
            target.setAttribute('color', '#00ff00');
            target.removeAttribute('animation');
            hit++;
            updateStatus();
            setTimeout(() => {
                if (target.parentNode) target.parentNode.removeChild(target);
                checkEnd();
                spawnTarget();
            }, 500);
        });

        // Disappear after 3 seconds if not clicked
        setTimeout(() => {
            if (active) {
                active = false;
                missed++;
                if (target.parentNode) target.parentNode.removeChild(target);
                updateStatus();
                checkEnd();
                spawnTarget();
            }
        }, 3000);

        container.appendChild(target);
    }

    function updateStatus() {
        status.textContent = 'Hit: ' + hit + ' | Missed: ' + missed + ' | Remaining: ' + (total - hit - missed);
    }

    function checkEnd() {
        if (hit + missed >= total) {
            const passed = hit >= 7;
            document.getElementById('night-instruct').setAttribute('value',
                'Score: ' + hit + '/' + total + ' - ' + (passed ? 'PASSED! Excellent night vision!' : 'FAILED. Need 7/10 to pass.'));
            document.getElementById('night-instruct').setAttribute('color', passed ? '#00ff00' : '#ff4444');
            setTimeout(() => onComplete({ passed, score: (hit / total) * 100 }), 2500);
        }
    }

    updateStatus();
    // Stagger target spawning
    for (let i = 0; i < 3; i++) setTimeout(() => spawnTarget(), i * 1000);
}
