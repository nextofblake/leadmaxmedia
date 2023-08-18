import { reactive } from 'vue'

const ImageService = reactive({
  loaded: false,
  // Service images
  magnet: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/magnet.webp',
  startup: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/startup.webp',
  // Profile images
  financeBuddy: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/porfolio-finance-buddy.jpg',
  huntingLocator: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/huntinglocator.jpg',
  nukshuk: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/portfolio-nukshuk.jpg',
  snapfi: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/snapfi.jpg',
  boot() {
    this.lazyLoad(this.magnet)
    this.lazyLoad(this.startup)
    this.lazyLoad(this.financeBuddy)
  },
  lazyLoad(src) {
    const image = new Image()
    image.src = src
  }
})

export default ImageService
