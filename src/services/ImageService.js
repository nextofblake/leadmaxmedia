import { reactive } from 'vue'

const ImageService = reactive({
  loaded: false,
  financeBuddy: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/porfolio-finance-buddy.jpg',
  huntingLocator: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/huntinglocator.jpg',
  nukshuk: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/portfolio-nukshuk.jpg',
  snapfi: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/snapfi.jpg',
  boot() {
    this.lazyLoad(this.financeBuddy)
    this.lazyLoad(this.huntingLocator)
    this.lazyLoad(this.nukshuk)
    this.lazyLoad(this.snapfi)
  },
  lazyLoad(src) {
    const image = new Image()
    image.src = src
}
})

export default ImageService
