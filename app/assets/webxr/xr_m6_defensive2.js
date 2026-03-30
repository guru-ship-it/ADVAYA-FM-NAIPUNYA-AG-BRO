// M6: City Mastery - Intersection right-of-way scenarios
function loadXR_M6(scene, container, onComplete) {
    const status = document.getElementById('xr-status');
    const task = document.getElementById('xr-task');
    task.textContent = 'Solve 3 intersection scenarios';

    let current = 0;
    let correct = 0;

    const scenarios = [
        {
            text: 'You approach a roundabout.\nA vehicle is already inside.\nWhat do you do?',
            options: ['Yield and wait', 'Enter quickly', 'Honk and go'],
            correctIdx: 0, hint: 'Yield to vehicles already in the roundabout'
        },
        {
            text: 'Green signal but the junction\nahead is blocked by traffic.\nWhat do you do?',
            options: ['Wait behind the line', 'Enter the junction', 'Switch lanes fast'],
            correctIdx: 0, hint: 'Never block a junction even on green'
        },
        {
            text: 'You want to go straight.\nAnother car wants to turn right.\nWho has priority?',
            options: ['You (straight)', 'Turning car', 'Whoever is faster'],
            correctIdx: 0, hint: 'Straight traffic has priority over turning'
        }
    ];

    // Intersection ground
    const ground = document.createElement('a-box');
    ground.setAttribute('position', '0 -0.1 -4');
    ground.setAttribute('width', '4'); ground.setAttribute('height', '0.05'); ground.setAttribute('depth', '4');
    ground.setAttribute('color', '#444');
    container.appendChild(ground);

    const title = document.createElement('a-text');
    title.setAttribute('value', 'CITY INTERSECTION MASTERY');
    title.setAttribute('position', '0 3.2 -3'); title.setAttribute('align', 'center');
    title.setAttribute('color', '#FFCC00'); title.setAttribute('width', '4');
    container.appendChild(title);

    const scenarioText = document.createElement('a-text');
    scenarioText.setAttribute('id', 'city-scenario');
    scenarioText.setAttribute('position', '0 2.3 -3'); scenarioText.setAttribute('align', 'center');
    scenarioText.setAttribute('color', '#fff'); scenarioText.setAttribute('width', '2.8');
    container.appendChild(scenarioText);

    const feedbackText = document.createElement('a-text');
    feedbackText.setAttribute('id', 'city-feedback');
    feedbackText.setAttribute('position', '0 0.5 -3'); feedbackText.setAttribute('align', 'center');
    feedbackText.setAttribute('color', '#fff'); feedbackText.setAttribute('width', '3');
    container.appendChild(feedbackText);

    const optionEls = [];
    for (let i = 0; i < 3; i++) {
        const btn = document.createElement('a-box');
        btn.setAttribute('position', ((i - 1) * 1) + ' 1.3 -3');
        btn.setAttribute('width', '0.85'); btn.setAttribute('height', '0.35'); btn.setAttribute('depth', '0.06');
        btn.setAttribute('color', '#2a4a6a');
        btn.setAttribute('class', 'clickable');
        btn.setAttribute('id', 'city-opt-' + i);

        const txt = document.createElement('a-text');
        txt.setAttribute('align', 'center'); txt.setAttribute('color', '#fff');
        txt.setAttribute('width', '2'); txt.setAttribute('position', '0 0 0.04');
        txt.setAttribute('id', 'city-opt-txt-' + i);
        btn.appendChild(txt);
        container.appendChild(btn);
        optionEls.push(btn);
    }

    function showScenario(idx) {
        feedbackText.setAttribute('value', '');
        if (idx >= scenarios.length) {
            const passed = correct >= 2;
            scenarioText.setAttribute('value', 'Score: ' + correct + '/3 - ' + (passed ? 'PASSED!' : 'TRY AGAIN'));
            scenarioText.setAttribute('color', passed ? '#00ff00' : '#ff4444');
            optionEls.forEach(o => o.setAttribute('visible', 'false'));
            setTimeout(() => onComplete({ passed, score: Math.round((correct/3)*100) }), 2500);
            return;
        }

        const s = scenarios[idx];
        scenarioText.setAttribute('value', 'Scenario ' + (idx+1) + '/3:\n' + s.text);
        status.textContent = 'Scenario ' + (idx+1) + '/3 | Correct: ' + correct;

        s.options.forEach((opt, oi) => {
            const btn = optionEls[oi];
            btn.setAttribute('visible', 'true');
            btn.setAttribute('color', '#2a4a6a');
            btn.querySelector('[id^=city-opt-txt]').setAttribute('value', opt);

            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            optionEls[oi] = newBtn;
            newBtn.setAttribute('class', 'clickable');

            newBtn.addEventListener('click', function() {
                if (oi === s.correctIdx) {
                    correct++;
                    newBtn.setAttribute('color', '#2d8a4e');
                    feedbackText.setAttribute('value', 'CORRECT! ' + s.hint);
                    feedbackText.setAttribute('color', '#00ff00');
                } else {
                    newBtn.setAttribute('color', '#8a2d2d');
                    feedbackText.setAttribute('value', 'WRONG. ' + s.hint);
                    feedbackText.setAttribute('color', '#ff4444');
                }
                current++;
                setTimeout(() => showScenario(current), 2000);
            });
        });
    }

    showScenario(0);
}
