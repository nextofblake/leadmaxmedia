import { reactive } from 'vue'

const FadeService = reactive({
  apply(element, type = '') {
    let fadeClass = 'fade--out'
    let revealClass = 'fade--in'
    let timeout = 1000

    // remove fade in classes
    element.classList.remove(revealClass)

    // apply fade animation
    switch (type) {
      case 'fast':
        timeout = 500
        element.classList.add(fadeClass + '-fast')
        break
      case 'slow':
        timeout = 2000
        element.classList.add(fadeClass + '-slow')
        break
      default:
        element.classList.add(fadeClass)
    }

    // remove element from interactivity
    setTimeout(() => {
      element.style.pointerEvents = 'none'
      element.style.width = 0
    }, timeout)
  },
})

export default FadeService
