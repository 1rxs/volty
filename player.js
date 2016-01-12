var videoid, bplay, bseek, curtime, durtime, bmute, volume_slider, fullscr;

function initializePlayer() {
    // Grab object references
    videoid = document.getElementById("sample-video");
    bplay = document.getElementById("play-and-pause");
    bseek = document.getElementById("seek")
    curtime = document.getElementById("curtime")
    durtime = document.getElementById("durtime")
    bmute = document.getElementById("mute")
    volume_slider = document.getElementById("volume")
    fullscr = document.getElementById("fullscreen")

    // Add eventlisteners
    bplay.addEventListener("click", playPauseF, !1)
    bseek.addEventListener("change", seekVideo, !1)
    videoid.addEventListener("timeupdate", seekTimeUpdate, !1)
    bmute.addEventListener("click", muteVideo, !1)
    volume_slider.addEventListener("change", setVolume, !1)
    fullscr.addEventListener("click", goFullScreen, !1)
}

window.onload = initializePlayer(); // Initialize player

videoid.onended = function() {
    bplay.style.background = "url(assets/breplay.png)"
};

/*
 *
 * Volty core functionality
 *
 */

 function playPauseF(){
 	if(videoid.paused){
 		videoid.play();
 		bplay.style.background = "url(assets/bpause.png)";
 	} else {
 		videoid.pause();
 		bplay.style.background = "url(assets/bplay.png)";
 	}
 }

function seekVideo() {
  var seek_to = videoid.duration * (bseek.value / 100);
  videoid.currentTime = seek_to;
}

function seekTimeUpdate() {
  var new_time = videoid.currentTime * (100 / videoid.duration);
  bseek.value = new_time;

  var current_mins = Math.floor(videoid.currentTime / 60);
  var current_secs = Math.floor(videoid.currentTime - current_mins * 60);
  var duration_in_mins = Math.floor(videoid.duration / 60);
  var duration_in_secs = Math.floor(videoid.duration - duration_in_mins * 60);
  if(current_secs < 10){ current_secs = "0"+current_secs; }
  if(duration_in_secs < 10){ duration_in_secs = "0"+duration_in_secs; }
  if(current_mins < 10){ current_mins = "0"+current_mins; }
  if(duration_in_mins < 10){ duration_in_mins = "0"+duration_in_mins; }
  curtime.innerHTML = current_mins+":"+current_secs;
  durtime.innerHTML = duration_in_mins+":"+duration_in_secs;
}

function muteVideo() {
    videoid.muted ? (videoid.muted = !1, bmute.style.background = "url(assets/bunmuted.png)", volume_slider.value = 50) : (videoid.muted = !0, bmute.style.background = "url(assets/bmuted.png)", volume_slider.value = 0)
}
function setVolume() {
    videoid.volume = volume_slider.value / 100, 0 == videoid.volume ? bmute.style.background = "url(assets/bmuted.png)" : bmute.style.background = "url(assets/bunmuted.png)"
}
function goFullScreen() {
    videoid.requestFullScreen ? videoid.requestFullScreen() : videoid.webkitRequestFullScreen ? videoid.webkitRequestFullScreen() : videoid.mozRequestFullScreen && videoid.mozRequestFullScreen()
}
