<template>
  <div class="reel-wrapper">
    <div class="reel-card">
      <!-- Exit -->
      <div class="reel-card--exit" @click="onEnd">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path style="fill: var(--color-white)" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>
      </div>
      <!-- Reel -->
      <video 
        ref="video"
        :autoplay="true"
        :controls="false"
        :disablepictureinpicture="true"
        :playsinline="true"
        @timeupdate="setProgressWidth"
        @ended="onEnd"
      >
        <source :src="videoService.intro" type="video/mp4" />
      </video>
      <!-- Reel Progress -->
      <div class="reel-card--progress" :style="{ width: reelProgressWidth }"></div>
    </div>
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
    onEnd() {
      this.$refs.video.pause()
      this.$emit('ended')
    },
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
.reel-wrapper {
  z-index: 100;
  position: absolute;
  top: calc(4vh + 120px + var(--global-viewPadding) + var(--global-viewPadding)); /* ProfileContainer shrunk top margin */
  height: calc(100vh - 4vh - 120px - var(--global-viewPadding) - var(--global-viewPadding)); /* ProfileContainer shrunk top margin */
  width: 100%;
  display: flex;
  justify-content: center;
}
.reel-card--exit {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  padding: 20px;
  z-index: 2;
}
.reel-card {
  position: relative;
  max-width: 500px;
  width: 100%;
  overflow: hidden; /* Ensure video element does not produce scroll */
  background: black;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}
.reel-card--progress {
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
.reel-card video {
  width: 100%;
  object-fit: cover;
}
</style>
  