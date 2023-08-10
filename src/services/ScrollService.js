import { reactive } from 'vue'

const ScrollService = reactive({
  fixScrollToBottom(duration) {
    const startTime = performance.now();
    const startScrollTop = window.scrollY;
  
    function scrollStep(timestamp) {
      let targetScrollTop = document.documentElement.scrollHeight - window.innerHeight;
      const currentTime = timestamp - startTime;
      const scrollFraction = currentTime / duration;
      const easedScrollFraction = Math.min(1, scrollFraction); // Ensure fraction is not greater than 1
  
      window.scrollTo(0, startScrollTop + easedScrollFraction * (targetScrollTop - startScrollTop));
  
      if (currentTime < duration) {
        requestAnimationFrame(scrollStep);
      }
    }
  
    requestAnimationFrame(scrollStep);
  }
})

export default ScrollService