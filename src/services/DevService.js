import { reactive } from 'vue'

const DevService = reactive({
  enabled: false,
  boot() {
    // Create a URL object from the current window's location
    const url = new URL(window.location.href);

    // Get the value of the "dev" query parameter
    this.enabled = url.searchParams.get("dev") ? true : false;

    console.log('DevService@boot', 'enabled: ', this.enabled)
  },
})

export default DevService
