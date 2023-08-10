import { reactive } from 'vue'
const NetworkSpeed = require('network-speed');

const NetworkService = reactive({
  supportsVideo: false,
  downloadSpeed: 0, // Mbps
  cdnCheckUrl: 'https://lxmbucket.nyc3.cdn.digitaloceanspaces.com/500000',
  async boot() {
    await this.getNetworkDownloadSpeed()
    
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
