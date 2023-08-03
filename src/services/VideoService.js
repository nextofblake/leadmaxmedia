import { reactive } from 'vue'

const VideoService = reactive({
  intro: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/intro.mp4',
  checkup: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/checkup.MP4',
  meeting: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/meeting.MP4',
  checkupPoster: 'checkup-poster.png',
  meetingPoster: 'meeting-poster.png',
  loaded: false,
  load() {
    console.log('VideoService@load')
    // const intro = new Image()
    // intro.onload = () => (this.loaded = true)
    // intro.src = this.intro

    const checkup = new Image()
    checkup.onload = () => (this.loaded = true)
    checkup.src = this.checkupPoster

    const meeting = new Image()
    meeting.onload = () => (this.loaded = true)
    meeting.src = this.meetingPoster
  }
})

export default VideoService
