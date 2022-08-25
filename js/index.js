const videoSection = document.querySelector(".main-video");
const video = document.querySelector("video");
const timeWrapper = document.querySelector(".time-wrapper");
const mediaControls = document.querySelector(".media-controls");
const timeBar = document.querySelector(
  ".media-controls .time-wrapper .time-bar"
);
const playButton = document.querySelector(".playButton");
const rewindButton = document.querySelector(".rewindButton");
const forwardButton = document.querySelector(".forwardButton");
const soundButton = document.querySelector(".soundButton");
const time = document.querySelector(".time");
const speedButton = document.querySelector(".speedButton");
const speedOptions = document.querySelector(".speed-options");
const fullscreenButton = document.querySelector(".fullscreenButton");
const soundBar = document.querySelector("input.soundBar");

//Pone pausa y play, tambien renderiza el boton que aparece en el centro y la imagen de play y pausa central
const playPause = () => {
  const playPauseCenter = document.querySelector(".play-pause-central");

  if (video.paused) {
    document
      .getElementById("centralButton")
      .setAttribute("src", "./assets/icons/play-central.png");
    playPauseCenter.classList.add("animation1");
    mediaControls.classList.add("media-controls__active");
    function animation() {
      playPauseCenter.classList.remove("animation1");
    }
    setTimeout(animation, 200);

    video.play();
    playButton.setAttribute("src", "./assets/icons/pause.png");
  } else {
    document
      .getElementById("centralButton")
      .setAttribute("src", "./assets/icons/pause-central.png");
    playPauseCenter.classList.add("animation2");
    mediaControls.classList.remove("media-controls__active");

    function animation() {
      playPauseCenter.classList.remove("animation2");
    }
    setTimeout(animation, 200);

    video.pause();
    playButton.setAttribute("src", "./assets/icons/play-button.png");
  }
};

//Lleva el video a 0
const stopVideo = () => {
  video.currentTime = 0;
};

//Atraza 10 segundos
const rewindTenSeconds = () => {
  if (video.currentTime <= video.currentTime - 10) {
    stopVideo();
  } else {
    videoTime = video.currentTime - 10;
    video.currentTime = videoTime;
  }
};

//Adelanta 10 segundos
const forwardTenSeconds = () => {
  videoTime = video.currentTime + 10;
  video.currentTime = videoTime;
};

//Cambia el volumen
const changeVolume = () => {
  video.volume = soundBar.value / 100;
  if (soundBar.value < 50 && soundBar.value != 0) {
    soundButton.setAttribute("src", "./assets/icons/low-volume.png");
  } else if (soundBar.value >= 50) {
    soundButton.setAttribute("src", "./assets/icons/medium-volume.png");
  } else if (soundBar.value == 0) {
    soundButton.setAttribute("src", "./assets/icons/volume-mute.png");
  }
};

//Mutea y cambia el icono 
const mute = () => {
  if (video.volume != 0) {
    video.volume = 0;
    soundButton.setAttribute("src", "./assets/icons/volume-mute.png");
  } else {
    changeVolume();
  }
};

//Muestra el tiempo de reproducción del video
const setTime = () => {
  const minutes = Math.floor(video.currentTime / 60);
  const seconds = Math.floor(video.currentTime - 60 * minutes);
  const minuteValue = minutes.toString().padStart(2, "0");
  const secondValue = seconds.toString().padStart(2, "0");

  if (video.currentTime >= 3600) {
    const hours = Math.floor(video.currentTime / 3600);
    const hoursValue = hours.toString().padStart(2, "0");
    videoTime = `${hoursValue}:${minuteValue}:${secondValue}`;
    time.textContent = videoTime;
  } else {
    const videoTime = `${minuteValue}:${secondValue}`;
    time.textContent = videoTime;
  }

  const barLenght =
    timeWrapper.clientWidth * (video.currentTime / video.duration);
  timeBar.style.width = `${Math.floor(barLenght)}px`;
};

//Hace aumentar el tamaño de la barra de reproduccion
const search = (e) => {
  let barLenght = e.offsetX;
  timeBar.style.width = `${barLenght}px`;
  videoTime = (barLenght / timeWrapper.clientWidth) * video.duration;
  video.currentTime = videoTime;
};

//Maximiza o minimiza el video
const maximizeMinimize = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullscreenButton.setAttribute("src", "./assets/icons/fullscreen.png");
  } else {
    videoSection.webkitRequestFullscreen();
    fullscreenButton.setAttribute("src", "./assets/icons/minimize.png");
    video.style.width = "100%";
  }
};

//Toma el valor y acelera o disminuye la velocidad de reproduccion
const selectSpeed = (e) => {
  speedButton.classList.remove("active");
  const videoSpeed = e.target.textContent;
  if (videoSpeed != "Normal") {
    video.playbackRate = videoSpeed;
  } else {
    video.playbackRate = 1;
  }
};

//Hace aparecer las velocidades de reproduccion
const toggleMenuDisplay = (e) => {
  if (
    speedOptions.style.display == "none" ||
    speedOptions.style.display == ""
  ) {
    speedOptions.style.display = "block";
    speedOptions.addEventListener("click", selectSpeed);
  } else {
    speedOptions.style.display = "none";
  }
};

window.onload = start;

function start() {
  playButton.addEventListener("click", playPause);

  window.addEventListener("keydown", (e) => {
    if (e.code == "Space") {
      playPause();
    }
  });

  rewindButton.addEventListener("click", rewindTenSeconds);

  forwardButton.addEventListener("click", forwardTenSeconds);

  soundBar.addEventListener("change", changeVolume);

  soundButton.addEventListener("click", mute);

  video.addEventListener("timeupdate", setTime);

  video.addEventListener("click", playPause);

  timeWrapper.addEventListener("click", search);

  fullscreenButton.addEventListener("click", maximizeMinimize);

  speedButton.addEventListener("click", toggleMenuDisplay);

  speedOptions.addEventListener("click", toggleMenuDisplay);

  speedButton.addEventListener("click", function () {
    speedButton.classList.toggle("active");
  });

  mediaControls.classList.remove("media-controls__active");
}
