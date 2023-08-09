import { reactive } from 'vue'
const NetworkSpeed = require('network-speed');

const NetworkService = reactive({
  supportsVideo: false,
  downloadSpeed: 0, // Mbps
  cdnCheckUrl: 'https://eu.httpbin.org/stream-bytes/500000',
  async boot() {
    await this.getNetworkDownloadSpeed() // Safari, Firefox

    console.log('NetworkService@boot', 'downloadSpeed', this.downloadSpeed, 'supportsVideo: ', this.supportsVideo)
  },
  async getNetworkDownloadSpeed() {
    const fileSizeInBytes = 500000;
    const speed = await (new NetworkSpeed()).checkDownloadSpeed(this.cdnCheckUrl, fileSizeInBytes);

    this.downloadSpeed = parseFloat(speed.mbps)
    this.supportsVideo = this.downloadSpeed >= 5
  }
})

export default NetworkService
