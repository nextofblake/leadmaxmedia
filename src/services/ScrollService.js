import { reactive } from 'vue'

const ScrollService = reactive({
  scrollToBottom(duration) {
    const startTime = performance.now();
    const startScrollTop = window.scrollY;
  
    function scrollStep(timestamp) {
      let targetScrollTop = document.documentElement.scrollHeight - window.innerHeight; // Recalculate scroll height every time
      const currentTime = timestamp - startTime;
      const scrollFraction = currentTime / duration;
      const easedScrollFraction = Math.min(1, scrollFraction); // Ensure fraction is not greater than 1
  
      window.scrollTo(0, startScrollTop + easedScrollFraction * (targetScrollTop - startScrollTop));
  
      if (currentTime < duration) {
        requestAnimationFrame(scrollStep);
      }
    }
  
    requestAnimationFrame(scrollStep);
  },
  scrollToTop(duration) {
    const startTime = performance.now();
    const startScrollTop = window.scrollY;
  
    function scrollStep(timestamp) {
      const currentTime = timestamp - startTime;
      const scrollFraction = currentTime / duration;
      const easedScrollFraction = Math.min(1, scrollFraction); // Ensure fraction is not greater than 1
  
      window.scrollTo(0, startScrollTop - easedScrollFraction * startScrollTop);
  
      if (currentTime < duration) {
        requestAnimationFrame(scrollStep);
      }
    }
  
    requestAnimationFrame(scrollStep);
  }
})

export default ScrollService