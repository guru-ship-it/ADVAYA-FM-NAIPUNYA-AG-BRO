// M3: Elite Conduct & POSH - Rate 5 workplace scenarios
function loadXR_M3(scene, container, onComplete) {
    const status = document.getElementById('xr-status');
    const task = document.getElementById('xr-task');
    task.textContent = 'Rate 5 workplace scenarios';

    let current = 0;
    let correct = 0;
    const scenarios = [
        { text:'Passenger asks you to comment\non how they look today.', answer:'inappropriate', hint:'Never comment on appearance' },
        { text:'You adjust the AC before\nthe passenger asks.', answer:'appropriate', hint:'Anticipating needs is professional' },
        { text:'You share your political\nopinion with the passenger.', answer:'inappropriate', hint:'Never share personal opinions' },
        { text:'You maintain silence\nafter greeting the VIP.', answer:'appropriate', hint:'Professional silence is golden' },
        { text:'You stare at the passenger\nthrough the rearview mirror.', answer:'inappropriate', hint:'Staring is strictly prohibited' }
    ];

    const title = document.createElement('a-text');
    title.setAttribute('value', 'ELITE CONDUCT ASSESSMENT');
    title.setAttribute('position', '0 3.2 -3'); title.setAttribute('align', 'center');
    title.setAttribute('color', '#FFCC00'); title.setAttribute('width', '4');
    container.appendChild(title);

    // Scenario board
    const board = document.createElement('a-box');
    board.setAttribute('position', '0 2 -3.5');
    board.setAttribute('width', '3'); board.setAttribute('height', '1.2'); board.setAttribute('depth', '0.05');
    board.setAttribute('color', '#1a2744');
    container.appendChild(board);

    const scenarioText = document.createElement('a-text');
    scenarioText.setAttribute('id', 'scenario-text');
    scenarioText.setAttribute('position', '0 2 -3.4'); scenarioText.setAttribute('align', 'center');
    scenarioText.setAttribute('color', '#ffffff'); scenarioText.setAttribute('width', '2.5');
    container.appendChild(scenarioText);

    const feedback = document.createElement('a-text');
    feedback.setAttribute('id', 'conduct-feedback');
    feedback.setAttribute('position', '0 0.8 -3'); feedback.setAttribute('align', 'center');
    feedback.setAttribute('color', '#ffffff'); feedback.setAttribute('width', '3');
    container.appendChild(feedback);

    // Appropriate button
    const btnApp = document.createElement('a-box');
    btnApp.setAttribute('position', '-0.6 1.2 -3');
    btnApp.setAttribute('width', '0.9'); btnApp.setAttribute('height', '0.35'); btnApp.setAttribute('depth', '0.08');
    btnApp.setAttribute('color', '#2d8a4e'); btnApp.setAttribute('class', 'clickable');
    btnApp.setAttribute('id', 'btn-appropriate');
    const btnAppText = document.createElement('a-text');
    btnAppText.setAttribute('value', 'APPROPRIATE');
    btnAppText.setAttribute('align', 'center'); btnAppText.setAttribute('color', '#fff'); btnAppText.setAttribute('width', '2');
    btnApp.appendChild(btnAppText);
    container.appendChild(btnApp);

    // Inappropriate button
    const btnInapp = document.createElement('a-box');
    btnInapp.setAttribute('position', '0.6 1.2 -3');
    btnInapp.setAttribute('width', '0.9'); btnInapp.setAttribute('height', '0.35'); btnInapp.setAttribute('depth', '0.08');
    btnInapp.setAttribute('color', '#8a2d2d'); btnInapp.setAttribute('class', 'clickable');
    btnInapp.setAttribute('id', 'btn-inappropriate');
    const btnInappText = document.createElement('a-text');
    btnInappText.setAttribute('value', 'INAPPROPRIATE');
    btnInappText.setAttribute('align', 'center'); btnInappText.setAttribute('color', '#fff'); btnInappText.setAttribute('width', '2');
    btnInapp.appendChild(btnInappText);
    container.appendChild(btnInapp);

    function showScenario(idx) {
        if (idx >= scenarios.length) {
            const passed = correct >= 4;
            scenarioText.setAttribute('value', 'Score: ' + correct + '/5 - ' + (passed ? 'PASSED!' : 'NEEDS IMPROVEMENT'));
            scenarioText.setAttribute('color', passed ? '#00ff00' : '#ff4444');
            feedback.setAttribute('value', '');
            btnApp.setAttribute('visible', 'false');
            btnInapp.setAttribute('visible', 'false');
            setTimeout(() => onComplete({ passed, score: (correct / 5) * 100 }), 2500);
            return;
        }
        const s = scenarios[idx];
        scenarioText.setAttribute('value', 'Scenario ' + (idx+1) + '/5:\n' + s.text);
        feedback.setAttribute('value', '');
        status.textContent = 'Scenario ' + (idx+1) + ' / 5 | Score: ' + correct;
    }

    function handleAnswer(answer) {
        const s = scenarios[current];
        if (answer === s.answer) {
            correct++;
            feedback.setAttribute('value', 'CORRECT! ' + s.hint);
            feedback.setAttribute('color', '#00ff00');
        } else {
            feedback.setAttribute('value', 'WRONG. ' + s.hint);
            feedback.setAttribute('color', '#ff4444');
        }
        current++;
        setTimeout(() => showScenario(current), 1800);
    }

    btnApp.addEventListener('click', () => handleAnswer('appropriate'));
    btnInapp.addEventListener('click', () => handleAnswer('inappropriate'));

    showScenario(0);
}
