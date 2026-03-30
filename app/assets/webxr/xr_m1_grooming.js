// M1: Grooming - Find & fix 5 appearance errors on a figure
function loadXR_M1(scene, container, onComplete) {
    const status = document.getElementById('xr-status');
    const task = document.getElementById('xr-task');
    task.textContent = 'Find and fix 5 grooming errors';
    status.textContent = '0 / 5 fixed';

    let fixed = 0;
    const errors = [
        { id:'wrinkled-collar', pos:'0 2.2 -3', color:'#ff4444', size:'0.25', label:'Wrinkled Collar' },
        { id:'dirty-shoes', pos:'-0.3 0.2 -3', color:'#8B4513', size:'0.3', label:'Unpolished Shoes' },
        { id:'messy-hair', pos:'0 2.7 -3', color:'#555', size:'0.2', label:'Messy Hair' },
        { id:'missing-badge', pos:'0.4 1.8 -3', color:'#ff8800', size:'0.15', label:'Missing Badge' },
        { id:'dirty-nails', pos:'0.5 1.2 -3', color:'#aa6633', size:'0.12', label:'Dirty Nails' }
    ];

    // Body silhouette
    const body = document.createElement('a-box');
    body.setAttribute('position', '0 1.3 -3');
    body.setAttribute('width', '0.8'); body.setAttribute('height', '2'); body.setAttribute('depth', '0.3');
    body.setAttribute('color', '#2a2a4a');
    container.appendChild(body);

    // Head
    const head = document.createElement('a-sphere');
    head.setAttribute('position', '0 2.5 -3');
    head.setAttribute('radius', '0.25'); head.setAttribute('color', '#deb887');
    container.appendChild(head);

    // Title
    const title = document.createElement('a-text');
    title.setAttribute('value', 'GROOMING INSPECTION');
    title.setAttribute('position', '0 3.5 -3'); title.setAttribute('align', 'center');
    title.setAttribute('color', '#FFCC00'); title.setAttribute('width', '4');
    container.appendChild(title);

    const instruction = document.createElement('a-text');
    instruction.setAttribute('value', 'Click on the RED error spots to fix them');
    instruction.setAttribute('position', '0 3.2 -3'); instruction.setAttribute('align', 'center');
    instruction.setAttribute('color', '#ffffff'); instruction.setAttribute('width', '3');
    instruction.setAttribute('id', 'groom-instruction');
    container.appendChild(instruction);

    errors.forEach(err => {
        const el = document.createElement('a-sphere');
        el.setAttribute('position', err.pos);
        el.setAttribute('radius', err.size);
        el.setAttribute('color', err.color);
        el.setAttribute('class', 'clickable');
        el.setAttribute('animation', 'property: scale; from: 1 1 1; to: 1.2 1.2 1.2; dur: 800; loop: true; dir: alternate');

        const label = document.createElement('a-text');
        label.setAttribute('value', err.label);
        label.setAttribute('position', '0 ' + (parseFloat(err.size) + 0.15) + ' 0');
        label.setAttribute('align', 'center'); label.setAttribute('color', '#ff4444');
        label.setAttribute('width', '2'); label.setAttribute('scale', '0.8 0.8 0.8');
        el.appendChild(label);

        el.addEventListener('click', function handler() {
            el.removeEventListener('click', handler);
            el.setAttribute('color', '#00ff00');
            el.removeAttribute('animation');
            label.setAttribute('color', '#00ff00');
            label.setAttribute('value', 'FIXED!');
            fixed++;
            status.textContent = fixed + ' / 5 fixed';
            if (fixed === 5) {
                document.getElementById('groom-instruction').setAttribute('value', 'ALL ERRORS FIXED! Well done, Pilot!');
                document.getElementById('groom-instruction').setAttribute('color', '#00ff00');
                setTimeout(() => onComplete({ passed: true, score: 100 }), 2000);
            }
        });
        container.appendChild(el);
    });
}
