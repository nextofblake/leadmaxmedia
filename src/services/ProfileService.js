import { reactive } from 'vue'

const ProfileService = reactive({
  frontImage: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/blake-profile.png',
  logoActive: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/logo-active.png',
  logoWhite: 'logo-white.png',
  loaded: false,
  showFront: true,
  activeLogo: false,
  boot() {
    // front image MUST load
    const image = new Image()
    image.onload = () => {
      this.loaded = true
      console.log('ProfileService@boot', 'loaded: ', this.loaded)
    }
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
