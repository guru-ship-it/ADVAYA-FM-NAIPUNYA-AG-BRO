// This script prevents the driver from skipping to the assessment
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390', width: '640', videoId: 'VIDEO_ID_HERE',
        events: { 'onStateChange': onPlayerStateChange }
    });
}

function onPlayerStateChange(event) {
    // If video reaches the end (ENDED = 0)
    if (event.data == YT.PlayerState.ENDED) {
        alert("Module Complete! Unlocking Native Assessment...");
        document.getElementById('startQuiz').disabled = false;
    }
}
