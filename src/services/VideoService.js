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

    const checkup = new Image()
    checkup.onload = () => (this.loaded = true)
    checkup.src = this.checkupPoster

    const meeting = new Image()
    meeting.onload = () => (this.loaded = true)
    meeting.src = this.meetingPoster
  }
})

export default VideoService
