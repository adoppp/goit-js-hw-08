import throttle from 'lodash.throttle';
import Vimeo from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

const updatePlaybackTime = throttle(function(event) {
  const videoTime = event.seconds;
  localStorage.setItem('videoplayer-current-time', videoTime);
}, 1000);

player.on('timeupdate', updatePlaybackTime);

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(savedTime);
}

iframe.addEventListener('timeupdate', function (event) {
    event.preventDefault();
});