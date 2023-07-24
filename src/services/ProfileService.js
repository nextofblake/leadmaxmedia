import { reactive } from 'vue'

const ProfileService = reactive({
  frontImage: 'blake_profile.png',
  backImage: 'android-chrome-512x512.png',
  loaded: false,
  showFront: true,
  load() {
    // front image MUST load
    const image = new Image()
    image.onload = () => (this.loaded = true)
    image.src = this.frontImage

    // back image lazy load
    const lazy = new Image()
    lazy.src = this.backImage
  },
  flipImage() {
    this.showFront = !this.showFront
  }
})

export default ProfileService
