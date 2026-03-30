// M5: Defensive Driving I - Following distance + hazard spotting
function loadXR_M5(scene, container, onComplete) {
    const status = document.getElementById('xr-status');
    const task = document.getElementById('xr-task');
    task.textContent = 'Spot 5 road hazards';

    let found = 0;
    const total = 5;

    // Road
    const road = document.createElement('a-box');
    road.setAttribute('position', '0 0 -5');
    road.setAttribute('width', '3'); road.setAttribute('height', '0.05'); road.setAttribute('depth', '12');
    road.setAttribute('color', '#333');
    container.appendChild(road);

    // Lane markings
    for (let z = -10; z <= 0; z += 2) {
        const mark = document.createElement('a-box');
        mark.setAttribute('position', '0 0.03 ' + z);
        mark.setAttribute('width', '0.08'); mark.setAttribute('height', '0.01'); mark.setAttribute('depth', '0.8');
        mark.setAttribute('color', '#ffcc00');
        container.appendChild(mark);
    }

    const title = document.createElement('a-text');
    title.setAttribute('value', 'HAZARD PERCEPTION TEST');
    title.setAttribute('position', '0 3 -3'); title.setAttribute('align', 'center');
    title.setAttribute('color', '#FFCC00'); title.setAttribute('width', '4');
    container.appendChild(title);

    const instruct = document.createElement('a-text');
    instruct.setAttribute('value', 'Click on the HAZARDS before they cause danger');
    instruct.setAttribute('position', '0 2.7 -3'); instruct.setAttribute('align', 'center');
    instruct.setAttribute('color', '#fff'); instruct.setAttribute('width', '3');
    instruct.setAttribute('id', 'hazard-instruct');
    container.appendChild(instruct);

    const hazards = [
        { pos:'-0.8 0.4 -4', color:'#ff4444', label:'Jaywalker', shape:'cylinder', r:0.15, h:0.6 },
        { pos:'1.0 0.3 -6', color:'#ff8800', label:'Pothole', shape:'cylinder', r:0.3, h:0.05 },
        { pos:'-0.5 0.5 -8', color:'#ff4444', label:'Child on Road', shape:'sphere', r:0.2 },
        { pos:'1.2 0.4 -5', color:'#ff6600', label:'Stray Animal', shape:'box', w:0.5, h:0.3, d:0.3 },
        { pos:'-1.0 0.6 -7', color:'#ff3333', label:'Cyclist Blind Spot', shape:'box', w:0.15, h:0.5, d:0.4 }
    ];

    hazards.forEach(h => {
        let el;
        if (h.shape === 'sphere') {
            el = document.createElement('a-sphere');
            el.setAttribute('radius', h.r);
        } else if (h.shape === 'cylinder') {
            el = document.createElement('a-cylinder');
            el.setAttribute('radius', h.r); el.setAttribute('height', h.h);
        } else {
            el = document.createElement('a-box');
            el.setAttribute('width', h.w); el.setAttribute('height', h.h); el.setAttribute('depth', h.d);
        }
        el.setAttribute('position', h.pos);
        el.setAttribute('color', h.color);
        el.setAttribute('class', 'clickable');
        el.setAttribute('animation', 'property: position; to: ' + h.pos.split(' ').map((v,i) => i===2 ? (parseFloat(v)+0.5) : v).join(' ') + '; dur: 2000; loop: true; dir: alternate');

        const label = document.createElement('a-text');
        label.setAttribute('value', h.label);
        label.setAttribute('position', '0 0.4 0'); label.setAttribute('align', 'center');
        label.setAttribute('color', '#ff4444'); label.setAttribute('width', '2');
        el.appendChild(label);

        el.addEventListener('click', function handler() {
            el.removeEventListener('click', handler);
            el.setAttribute('color', '#00ff00');
            el.removeAttribute('animation');
            label.setAttribute('value', 'SPOTTED!');
            label.setAttribute('color', '#00ff00');
            found++;
            status.textContent = found + ' / ' + total + ' hazards found';
            if (found === total) {
                document.getElementById('hazard-instruct').setAttribute('value', 'ALL HAZARDS IDENTIFIED! Excellent awareness, Pilot!');
                document.getElementById('hazard-instruct').setAttribute('color', '#00ff00');
                setTimeout(() => onComplete({ passed: true, score: 100 }), 2000);
            }
        });
        container.appendChild(el);
    });

    status.textContent = '0 / ' + total + ' hazards found';
}
