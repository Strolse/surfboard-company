
  const playButton = document.querySelector('.video__player-img');
  const video = document.getElementById('player');
  const playControlButton = document.querySelector('.duration__img');
  const videoWrapper = document.querySelector('.video__wrapper');
  const soundButton = document.querySelector('.sound');
   
  
  let durationControl;
  let soundControl;
  let intervalId;
  let soundLevel;
  
  
  video.addEventListener('loadeddata', () =>{
    video.addEventListener('click', playStop);
  
    videoWrapper.addEventListener('click', (e) =>{
      if(e.target.classList.contains('play')){
        playStop();
  
      }
    })
    durationControl = document.getElementById('durationLevel');
    durationControl.addEventListener('input', setVideoDuration);
  
    durationControl.min = 0;
    durationControl.value = 0;
  
    durationControl.max = video.duration;
  
    video.addEventListener('ended', function(){
      playButton.classList.toggle('video__player-img--active');
      video.currentTime = 0;
      playControlButton.classList.remove('active');
      clearInterval(intervalId);
    })
  
    let soundControl = document.querySelector('.sound__button');
    soundControl.addEventListener('click', soundOf);
  
    soundLev = document.getElementById('soundLevel');
    soundLev.addEventListener('input', changeSoundVolume);
  
    soundLev.min = 0;
    soundLev.max = 10;
  
    soundLev.value =  soundLev.max;
  
  
  });
  
  function playStop() {
    playButton.classList.toggle('video__player-img--active');
    if(video.paused) {
      video.play();
      intervalId = setInterval(updateDuration, 1000 / 60);
      playControlButton.classList.add('active');
    } else {
      video.pause();
      clearInterval(intervalId);
      playControlButton.classList.remove('active');
    }
    
  }
  
  function setVideoDuration() {
    video.currentTime = durationControl.value;
    updateDuration();
  }
  
  function updateDuration() {
    durationControl.value = video.currentTime;
  
    let step = video.duration / 100;
    let percent = video.currentTime / step;
  
    durationControl.style.background = `linear-gradient(90deg, #FEDB3F 0%, #FEDB3F ${percent}%, #626262 ${percent}%)`;
  
  }
  
  function soundOf () {
    if (video.volume === 0) {
      video.volume = soundLevel;
      soundLev.value = soundLevel * 10;
      soundButton.classList.remove('active');
    } else {
      soundLevel = video.volume;
      video.volume = 0;
      soundLev.value = 0;
      soundButton.classList.add('active');
    }
  }
  
  function changeSoundVolume() {
  
    video.volume = soundLev.value / 10;
    if (video.volume === 0) {
      soundButton.classList.add('active');
    } else {
      soundButton.classList.remove('active');
    }
  }
  
  function updateSoundVolume() {
    soundLev.value = video.volume;
  
    let step = video.volume / 10;
    let percent = video.currentTime / step;
  
    durationControl.style.background = `linear-gradient(90deg, #FEDB3F 0%, #FEDB3F ${percent}%, #626262 ${percent}%)`;
  
  }


