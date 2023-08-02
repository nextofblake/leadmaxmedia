import { reactive } from 'vue'

const VideoService = reactive({
  intro: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/intro.mp4',
  services: 'services.mp4',
  meeting: 'meeting.mp4',
  loaded: false,
  load() {
    console.log('VideoService@load')
    // intro video MUST load
    const image = new Image()
    image.onload = () => (this.loaded = true)
    image.src = this.intro
  },
  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
})

export default VideoService