import { reactive } from 'vue'

const NetworkService = reactive({
  supportsVideo: false,
  effectiveType: null, // slow-2g, 2g, 3g, 5g
  boot() {
    /**
     *  Unsupported: Safari, Firefox
     */
    if (navigator.connection) {
      this.updateEffectiveSpeed()
      console.log('NetworkService@boot', 'supportsVideo: ', this.supportsVideo)
      navigator.connection.onchange = this.updateEffectiveSpeed()
    }
  },
  updateEffectiveSpeed() {
    this.effectiveType = navigator.connection.effectiveType ?? null

    this.supportsVideo = ['3g', '4g'].includes(navigator.connection.effectiveType)
  }
})

export default NetworkService
