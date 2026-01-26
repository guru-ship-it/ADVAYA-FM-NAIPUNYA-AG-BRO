/**
 * YouTube Gatekeeper Wrapper for FM Elite
 * Enforces mandatory watch time before unlocking the NEXT button.
 */

let player;
let videoId;
let minWatchTime;
let watchTimer;
let isUnlocked = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log("[VAJRA GATEKEEPER]: Player Ready. Locking Module.");
    document.getElementById('next-btn').disabled = true;
    startWatchTimer();
}

function onPlayerStateChange(event) {
    // If user tries to skip forward past watched content
    if (event.data === YT.PlayerState.PLAYING) {
        // Implementation of seek-prevention logic here
    }
}

function startWatchTimer() {
    watchTimer = setInterval(() => {
        if (player && player.getCurrentTime) {
            let currentTime = player.getCurrentTime();
            if (currentTime >= minWatchTime && !isUnlocked) {
                unlockModule();
            }
        }
    }, 1000);
}

function unlockModule() {
    isUnlocked = true;
    clearInterval(watchTimer);
    document.getElementById('next-btn').disabled = false;
    document.getElementById('status-msg').innerText = "Module Unlocked! You may proceed.";
    console.log("[VAJRA GATEKEEPER]: Minimum watch time met. Unlocking.");
}

// Initialization parameters from Course Manifest/Navigator
function initGatekeeper(vid, timeLimit) {
    videoId = vid;
    minWatchTime = timeLimit;
}
