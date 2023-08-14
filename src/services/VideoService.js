import { reactive } from 'vue'

const VideoService = reactive({
  intro: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/intro.mp4',
  checkup: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/checkup.mp4',
  meeting: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/meeting.mp4',
  checkupPoster: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/checkup-poster.png',
  meetingPoster: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/meeting-poster.png',
  loaded: false,
  boot() {
    console.log('VideoService@boot')

    this.lazyLoad(this.checkupPoster)
    this.lazyLoad(this.meetingPoster)
  },
  lazyLoad(src) {
    const image = new Image()
    image.src = src
  }
})

export default VideoService
