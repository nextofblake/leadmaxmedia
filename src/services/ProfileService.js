import { reactive } from 'vue'

const ProfileService = reactive({
  frontImage: 'blake-profile.png',
  logoActive: 'logo-active.png',
  logoWhite: 'logo-white.png',
  loaded: false,
  showFront: true,
  activeLogo: false,
  load() {
    // front image MUST load
    const image = new Image()
    image.onload = () => (this.loaded = true)
    image.src = this.frontImage

    // back image lazy load
    const lazyActive = new Image()
    lazyActive.src = this.logoActive
  },
  flipImage() {
    this.showFront = !this.showFront

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 750);
    });
  },
  spinImage() {
    this.showFront = !this.showFront
    setTimeout(() => this.showFront = !this.showFront, 750)
  }
})

export default ProfileService
