<template>
  <div class="video-card">
    <!-- Reel -->
    <video 
      ref="video"
      :autoplay="true"
      :controls="false"
      :disablepictureinpicture="true"
      :playsinline="true"
      @timeupdate="setProgressWidth"
      @ended="$emit('ended')"
    >
      <source :src="videoService.intro" type="video/mp4" />
    </video>
    <!-- Reel Progress -->
    <div class="video-card--progress" :style="{ width: reelProgressWidth }"></div>
  </div>
</template>
  
<script>
import { inject } from 'vue'

export default {
  name: 'VideoReel',
  setup() {
    return {
      videoService: inject('videoService'),
    }
  },
  data() {
    return {
      reelProgressWidth: '0%',
    }
  },
  methods: {
    setProgressWidth() {
      const currentTime = this.$refs.video.currentTime
      const duration = this.$refs.video.duration
      const percentage = Math.round((currentTime / duration) * 100)

      this.reelProgressWidth = percentage + '%'
    }
  }
}
</script>
  
<style scoped>
@import '../assets/styles/core.css';
.video-card {
  z-index: 100;
  position: absolute;
  top: calc(2vh + 120px + var(--global-viewPadding)); /* ProfileContainer shrunk top margin */
  height: calc(100vh - 2vh - 120px - var(--global-viewPadding)); /* ProfileContainer shrunk top margin */
  max-width: 500px;
  width: 100%;
  overflow: hidden; /* Ensure video element does not produce scroll */

  background: black;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}
.video-card--progress {
  position: absolute;
  bottom: 0;
  height: 5px;
  background-image: none;

  /* video play percent*/
  width: 0%;
  transition: width 0.25s linear;
  background: var(--gradient-alt);
  border-radius: 5px;
}
.video-card video {
  width: 100%;
  object-fit: cover;
}
</style>
  