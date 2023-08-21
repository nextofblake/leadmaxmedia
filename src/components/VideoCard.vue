<!-- 
    Features:
    - preloaded video
    - playsinline (no fullscreen)
    - blackout on first play (mobile bug fix)
    WARNING: 
    I set the video height directly via --video-card-height in variables.css, 
    this is to make it work for all mobile devices, it is a HACK!
-->
<template>
  <div ref="self" class="card" :class="{'card--playing': playing && !hideVideo, 'card--hide-video' : hideVideo}">
    <div class="card-head">
      <video 
        ref="video"
        :controls="false"
        :disablepictureinpicture="true"
        :playsinline="true"
        :poster="poster"
        :preload="'auto'"
        @timeupdate="setControlWidth"
        @progress="onProgress"
        @canplay="onPlayable"
        @ended="onEndedVideo"
      >
        <source v-if="networkService.supportsVideo" :src="src" type="video/mp4" />
      </video>
      <div class="card-head--controls">
        <div class="card-head--controls-icons">
          <div class="mute-icon-wrapper" @click.stop="toggleMute">
              <svg 
              v-if="muted && playing"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 576 512"
            >
              <path style="fill: var(--color-white)" d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/>
            </svg>
            <svg 
              v-if="!muted && playing"
              style="position: relative;"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 640 512"
            >
              <path style="fill: var(--color-white)" d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/>
            </svg>
          </div>
        </div>
        <div class="card-head--controls-progress" :style="{ width: controlWidth }"></div>
      </div>
      <div class="card-head--overlay" @click="toggleVideo">
        <span class="card-head--overlay-title">
          <slot v-if="!playing" name="title"></slot>
        </span>
        <div class="card-head--overlay-icon-wrapper">
          <svg
            v-if="isPlayable && !playing"
            class="card-head--overlay-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path style="fill: var(--color-gray-3)" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
          </svg>
        </div>
        <Break height="40px"></Break>
      </div>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
  
<script>
import { inject } from 'vue'
import Break from './Break.vue'

export default {
  name: 'VideoCard',
  props: {
    src: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    showPreview: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    Break,
  },
  setup() {
    return {
      devService: inject('devService'),
      networkService: inject('networkService'),
    }
  },
  data() {
    return {
      playing: false,
      isPlayable: false,
      hasPlayed: false,
      hideVideo: false,
      showIcon: false,
      controlWidth: '0%',
      muted: true,
    }
  },
  mounted() {
    this.$refs.video.muted = true // Force video muted
    this.$refs.video.load() // Force video load
    document.addEventListener('click', this.onClickAwayVideo)
  },
  watch: {
    showPreview: {
      handler() {
        this.onProgress()
      }
    },
    muted: {
      handler(muted) {
        this.$refs.video.muted = muted
      }
    }
  },
  methods: {
    onProgress() {
      if (!this.isPlayable) return
      if (this.$refs.video.buffered.length === 0) return

      // Video is playable, 1 second of buffer, and is first play
      if (this.$refs.video.buffered.end(0) > 0 && !this.hasPlayed) {
        this.startPreview()
      }
    },
    onPlayable() {
      // Only allow video if network connection supports it
      this.isPlayable = this.networkService.supportsVideo
      this.onProgress()
    },
    onEndedVideo() {
      this.stopVideo()
      this.$refs.video.currentTime = 0
    },
    onClickAwayVideo(event) {
      window.lastVid = this.$refs.self
      window.lastClick = event
      // stop video if playing and clicked off
      if (this.playing && this.$refs.self && !this.$refs.self.contains(event.target)) {
        this.stopVideo()
      }
    },
    startPreview() {
      if (
        this.playing ||     // No preview when playing 
        !this.showPreview   // No preview when unspecified
      ) return

      // Autoplay video + audio
      this.$refs.video.currentTime = 0.5
      this.muted = false
      this.startVideo()
    },
    toggleVideo() {
      if (!this.isPlayable) return

      if (this.playing) {
        this.stopVideo()
      } else {
        this.startVideo()
      }
    },
    toggleMute() {
      this.muted = !this.muted
    },
    startVideo() {
      this.playing = true

      if (this.hasPlayed) {
        this.$refs.video.play()
      } else {
        this.startFirstVideo()
      }
    },
    startFirstVideo() {
      // This method exists so that black bars do not showup when initial loading of video
      this.hideVideo = true
      this.hasPlayed = true
      setTimeout(() => {
        this.hideVideo = false
        this.$refs.video.play()
      }, 500)
    },
    stopVideo() {
      this.playing = false
      this.$refs.video.pause()
    },
    setControlWidth() {
      const currentTime = this.$refs.video.currentTime
      const duration = this.$refs.video.duration
      const percentage = Math.round((currentTime / duration) * 100)

      this.controlWidth = this.playing ? percentage + '%' : '0%'
    },
  },
}
</script>

<style scoped>
.card {
  background-image: var(--gradient-white);
  border-radius: var(--radius-md);
  width: 100%;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.25);
}
.card-shadow {
  box-shadow: 3px 3px 5px var(--color-gray-6);
}
.card-head {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2.5rem;
  font-family: var(--font-family-big);
  color: var(--color-gray-7);
  border-bottom: 3px solid var(--color-gray-3);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}
.card-head + .card-body {
  padding-top: 10px;
}
.card-body {
  padding: 20px;
}
.card-footer {
  padding: 10px;
}

/* 
  * Video Cards 
  * - needed to apply styling directly to the video slot
  */
.card-head > * {
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}
.card-head video {
  object-fit: cover;
  width: 100%;
}
.card-head--controls {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.card-head--controls-icons {
  display: none;
}
.card--playing .card-head--controls-icons {
  height: 100%;
  display: flex;
  justify-content: flex-end;
}
.card-head--controls .mute-icon-wrapper {
  z-index: 2;
  height: 40px;
  width: 40px;
  padding: 20px;
}
.card-head--controls svg {
  height: 30px;
}
.card-head--controls-progress {
  position: absolute;
  bottom: -3px;
  height: 3px;
  background-image: var(--gradient-alt);
  border-radius: 3px;

  /* video play percent*/
  width: 0%;
  transition: width 0.25s linear;
}
.card-head--overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: var(--color-gray-2);
  background: rgba(0, 0, 0, 0.5);
  transition: background 0.25s;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}
.card--hide-video .card-head--overlay {
  background: rgba(0, 0, 0, 1); /** Background black for mobile support */
}
.card--playing .card-head--overlay {
  background: rgba(0, 0, 0, 0); /** Background transparent */
}
.card-head--overlay-title {
  margin-top: 10px;
  font-size: 36px;
  margin-top: 25px;
  pointer-events: none; /** WARNING: this disables @click event */
}
.card-head--overlay-icon-wrapper {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-head--overlay-icon {
  height: 40px;
  pointer-events: none; /** WARNING: this disables @click event */
}
/* Mobile width */
@media(max-width: 500px) {
  .card-head--overlay-title {
    font-size: 30px;
    margin-top: 15px;
  }
  .card-head--overlay-icon {
    height: 35px;
  }
  .card-head--controls .mute-icon-wrapper {
    padding: 6px;
  }
  .card-head--controls svg {
    height: 25px;
  }
}
</style>
  