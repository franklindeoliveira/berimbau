// seek bar---------------------------------
var range = document.getElementById("range");
var completionBar = document.getElementById("completionBar");
var slide = document.querySelector('.slide input[type="range"]');

var audioSeek = document.getElementById("audioSrc");

range.oninput = function () {
  completionBar.style.width = this.value + '%';
  audioSeek.currentTime = ((this.value / 100)) * audioSeek.duration;
}


//------------------------------------------

function play(element) {

  var nowPlayingBoardId = document.getElementById("now-playing-board-id");
  var nowPlayingBoardBottomBarId = document.getElementById("now-playing-board-bottom-bar-id");

  var vynlId = document.getElementById("vynl-id");

  var audio = document.getElementById("audioSrc");

  audio.loop = true;

  // Assign an ontimeupdate event to the video element, and execute a function if the current playback position has changed
  audio.ontimeupdate = function () {
    completionBar.style.width = ((this.currentTime / this.duration) * 100) + '%';
    if (completionBar.style.width > "99%") {
      range.value = 0;
    }
    else {
      console.log(' ' + completionBar.style.width);
    }
  };
  if (isPlay()) {
    vynlId.classList.add("vynl-animation");

    //document.getElementById("audioSrc").play();
    tocar("0.5s tchi 0.5s tchi 0.5s domchi 1.25s dim")

    nowPlayingBoardId.style.transform = "translatey(-30%)";
    nowPlayingBoardBottomBarId.style.transform = "translatey(0)";

    document.getElementById("playpause").classList.remove("play-circle");
    document.getElementById("playpause").classList.add("pause-circle");
  }
  else if (isPause()) {
    vynlId.classList.remove("vynl-animation");

    //document.getElementById("audioSrc").pause(); 
    document.querySelectorAll(".parar").forEach(pararAudio => pararAudio.addEventListener("click", parar))
    nowPlayingBoardId.style.transform = "translatey(56%)";
    nowPlayingBoardBottomBarId.style.transform = "translatey(-20%)";

    document.getElementById("playpause").classList.remove("pause-circle");
    document.getElementById("playpause").classList.add("play-circle");
  }
}

function isPlay() {  
  return document.getElementById("playpause").classList.contains("play-circle")
}

function isPause() {  
  return document.getElementById("playpause").classList.contains("pause-circle")
}
