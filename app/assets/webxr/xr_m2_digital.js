// M2: Digital Skills - 3 data-sync verification tasks with timer
function loadXR_M2(scene, container, onComplete) {
    const status = document.getElementById('xr-status');
    const task = document.getElementById('xr-task');
    task.textContent = 'Complete 3 digital verification tasks';

    let completed = 0;
    const tasks = [
        { label:'VERIFY ROUTE', correct:0, options:['Optimal Route (Green)','Longer Route (Red)','Random Route (Yellow)'], colors:['#00cc00','#cc0000','#cccc00'] },
        { label:'SYNC TRIP DATA', correct:1, options:['Skip Sync','Sync Now','Sync Later'], colors:['#cc0000','#00cc00','#cccc00'] },
        { label:'CONFIRM PICKUP', correct:0, options:['Confirm Location','Wrong Address','Cancel Trip'], colors:['#00cc00','#cc0000','#cccc00'] }
    ];

    const title = document.createElement('a-text');
    title.setAttribute('value', 'DIGITAL NAVIGATION TRAINING');
    title.setAttribute('position', '0 3.2 -3'); title.setAttribute('align', 'center');
    title.setAttribute('color', '#FFCC00'); title.setAttribute('width', '4');
    container.appendChild(title);

    // Tablet screen
    const tablet = document.createElement('a-box');
    tablet.setAttribute('position', '0 1.5 -3');
    tablet.setAttribute('width', '2'); tablet.setAttribute('height', '1.5'); tablet.setAttribute('depth', '0.05');
    tablet.setAttribute('color', '#1a1a2e');
    container.appendChild(tablet);

    function showTask(idx) {
        // Clear previous options
        container.querySelectorAll('.task-option').forEach(e => e.parentNode.removeChild(e));
        container.querySelectorAll('.task-label').forEach(e => e.parentNode.removeChild(e));

        if (idx >= tasks.length) {
            const done = document.createElement('a-text');
            done.setAttribute('value', 'ALL TASKS COMPLETE!');
            done.setAttribute('position', '0 1.5 -2.9'); done.setAttribute('align', 'center');
            done.setAttribute('color', '#00ff00'); done.setAttribute('width', '3');
            done.classList.add('task-label');
            container.appendChild(done);
            setTimeout(() => onComplete({ passed: true, score: 100 }), 2000);
            return;
        }

        const t = tasks[idx];
        status.textContent = 'Task ' + (idx + 1) + ' / 3';

        const label = document.createElement('a-text');
        label.setAttribute('value', 'TASK: ' + t.label);
        label.setAttribute('position', '0 2.5 -3'); label.setAttribute('align', 'center');
        label.setAttribute('color', '#ffffff'); label.setAttribute('width', '3');
        label.classList.add('task-label');
        container.appendChild(label);

        t.options.forEach((opt, oi) => {
            const btn = document.createElement('a-box');
            btn.setAttribute('position', ((oi - 1) * 0.8) + ' 1.5 -2.9');
            btn.setAttribute('width', '0.7'); btn.setAttribute('height', '0.3'); btn.setAttribute('depth', '0.05');
            btn.setAttribute('color', t.colors[oi]);
            btn.setAttribute('class', 'clickable task-option');

            const btnText = document.createElement('a-text');
            btnText.setAttribute('value', opt);
            btnText.setAttribute('align', 'center'); btnText.setAttribute('color', '#ffffff');
            btnText.setAttribute('width', '2'); btnText.setAttribute('position', '0 0 0.03');
            btn.appendChild(btnText);

            btn.addEventListener('click', function handler() {
                btn.removeEventListener('click', handler);
                if (oi === t.correct) {
                    btn.setAttribute('color', '#00ff00');
                    completed++;
                    setTimeout(() => showTask(idx + 1), 1000);
                } else {
                    btn.setAttribute('color', '#ff0000');
                    const retry = document.createElement('a-text');
                    retry.setAttribute('value', 'Wrong! Try again...');
                    retry.setAttribute('position', '0 0.8 -2.9'); retry.setAttribute('align', 'center');
                    retry.setAttribute('color', '#ff4444'); retry.setAttribute('width', '3');
                    retry.classList.add('task-label');
                    container.appendChild(retry);
                    setTimeout(() => showTask(idx), 1500);
                }
            });
            container.appendChild(btn);
        });
    }

    showTask(0);
}
