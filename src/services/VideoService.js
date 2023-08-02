import { reactive } from 'vue'

const VideoService = reactive({
  intro: 'intro.mp4',
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
})

export default VideoService
