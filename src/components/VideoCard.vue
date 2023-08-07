<!-- 
    WARNING: 
    I set the video height directly via --video-card-height in variables.css, 
    this is to make it work for all mobile devices, it is a HACK!
-->
<template>
  <div ref="self" class="card">
    <div class="card-head">
      <video 
        ref="video"
        :controls="false"
        :disablepictureinpicture="true"
        :playsinline="true"
        :poster="poster"
        @click.prevent="toggleVideo"
        @timeupdate="setControlWidth"
        @progress="onProgress"
        @canplaythrough="isPlayable = true"
        @ended="onEndedVideo"
      >
        <source :src="src" type="video/mp4" />
      </video>
      <div class="card-head--controls" :style="{ width: controlWidth }"></div>
      <div class="card-head--overlay" :class="{ 'card-head--overlay-playing': playing }" @click.prevent="toggleVideo">
        <span class="card-head--overlay-title"><slot name="title"></slot></span>
        <div class="card-head--overlay-icon-wrapper">
          <svg
            v-if="isPlayable"
            class="card-head--overlay-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path style="fill: var(--color-gray-3)" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
          </svg>
        </div>
        <div></div>
      </div>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
  
<script>

import { interval } from 'rxjs'

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
  data() {
    return {
      playing: false,
      isPlayable: false,
      showIcon: false,
      controlWidth: '0%',
      loopSubscription: null,
    }
  },
  mounted() {
    this.$refs.video.load() // Force video load
    document.addEventListener('click', this.onClickAwayVideo)
  },
  watch: {
    showPreview: {
      handler() {
        this.onProgress()
      }
    }
  },
  methods: {
    onProgress() {
      if (this.$refs.video.buffered.length === 0) return

      // At least 1 second is loaded
      if (this.$refs.video.buffered.end(0) > 0) {
        this.startLoopPreview()
      }
    },
    onEndedVideo() {
      this.stopVideo()
    },
    onClickAwayVideo(event) {
      window.lastVid = this.$refs.self
      window.lastClick = event
      // stop video if playing and clicked off
      if (this.playing && this.$refs.self && !this.$refs.self.contains(event.target)) {
        this.stopVideo()
      }
    },
    startLoopPreview() {
      if (
        this.playing ||                 // No preview when playing 
        !this.showPreview ||            // No preview when unspecified
        this.loopSubscription !== null  // No preview when previewing
      ) return

      this.$refs.video.muted = true
      this.$refs.video.currentTime = 0.5
      this.$refs.video.play()

      this.loopSubscription ??= interval(2000)
        .subscribe(() => {
          this.$refs.video.currentTime = 0.5
          this.$refs.video.play()
        })
    },
    cancelLoopPreview() {
      if (this.loopSubscription) {
        this.loopSubscription.unsubscribe()
        this.loopSubscription = null
      }
    },
    toggleVideo() {
      if (!this.isPlayable) return

      if (this.playing) {
        this.stopVideo()
      } else {
        this.startVideo()
      }
    },
    startVideo() {
      this.cancelLoopPreview()

      this.playing = true
      this.$refs.self.classList.add('card--hovering')
      this.$refs.video.play()
      this.$refs.video.muted = false
      this.$refs.video.currentTime = 0
    },
    stopVideo() {
      this.playing = false
      this.$refs.self.classList.remove('card--hovering')
      this.$refs.video.pause()
      this.$refs.video.muted = true
      this.$refs.video.currentTime = 0

      this.startLoopPreview()
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
  transition: transform 1s ease; /* Hover effect */
}
.card--hovering {
  /* transform: scale(1.05); */
}
.card-shadow {
  box-shadow: 3px 3px 5px var(--color-gray-6);
}
.card.transparent {
  background: transparent;
  border: 1px solid var(--color-gray-2);
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
  padding: 6px 10px;
}

/* 
  * Video Cards 
  * - needed to apply styling directly to the video slot
  */
.card--hovering .card-head--overlay {
  background: none;
}
.card-body--title {
  font-size: 2.5rem;
  font-family: var(--font-family-big);
  color: var(--color-gray-7);
}
.card-head > * {
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}
.card-head video {
  height: var(--video-card-height); /* WARNING: randomly set to work for iPhone SE */
  object-fit: cover;
  width: 100%;
}
.card-head--controls {
  position: absolute;
  bottom: -3px;
  height: 3px;
  background-image: var(--gradient-alt);
  border-radius: 3px;

  /* video play percent*/
  width: 0%;
  transition: width 0.25s linear;
}
.card--hovering .card-head--controls {
  background: var(--gradient-alt);
}
.card-head--overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: var(--color-gray-2);

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}
.card-head--overlay-playing {
  display: none;
}
.card-head--overlay-title {
  margin-top: 10px;
}
.card-head--overlay-icon-wrapper {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-head--overlay-icon {
  height: 40px;
}
</style>
  