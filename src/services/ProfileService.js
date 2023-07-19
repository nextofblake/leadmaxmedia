import { reactive } from 'vue'

const ProfileService = reactive({
  src: 'blake_profile.png',
  loaded: false,
  load() {
    const image = new Image()
    image.onload = () => (this.loaded = true)
    image.src = this.src
  },
})

export default ProfileService
