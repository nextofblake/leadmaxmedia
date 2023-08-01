<!-- 
    WARNING: 
    I set the video height directly via --video-card-height in variables.css, 
    this is to make it work for all mobile devices, it is a HACK!
-->
<template>
    <div ref="self" class="card">
      <div class="card-head">
        <video ref="video" controls @ended="onEndedVideo">
          <source :src="src" type="video/mp4" />
        </video>
        <div class="card-head--controls" :style="{ width: controlWidth }"></div>
        <div class="card-head--overlay" @click.prevent="toggleVideo">
          <slot name="title"></slot>
          <svg
            v-show="false"
            class="card-head--overlay-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zM40 256c0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216zm331.7-18l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM192 335.8V176.9c0-4.7 5.1-7.6 9.1-5.1l134.5 81.7c3.9 2.4 3.8 8.1-.1 10.3L201 341c-4 2.3-9-.6-9-5.2z"
            ></path>
          </svg>
        </div>
      </div>
      <div class="card-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VideoCard',
    props: {
      src: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        playing: false,
        controlWidth: '0%',
        controlTransitionDuration: '0.5s',
      }
    },
    mounted() {
      document.addEventListener('click', this.onClickAwayVideo)
      setInterval(this.setControlWidth, 500)
    },
    methods: {
      toggleVideo() {
        if (this.playing) {
          this.stopVideo()
        } else {
          this.startVideo()
        }
      },
      startVideo() {
        this.$refs.video.play()
        this.$refs.video.currentTime = 0
        this.$refs.video.muted = true // WARNING: temporary fix for live production
  
        this.playing = true
        this.controlTransitionDuration = '0'
        this.$refs.self.classList.add('card--hovering')
      },
      stopVideo() {
        this.$refs.video.muted = true
  
        this.playing = false
        this.$refs.self.classList.remove('card--hovering')
      },
      onEndedVideo() {
        this.stopVideo()
        this.$refs.video.currentTime = 0
        this.$refs.video.play()
      },
      onClickAwayVideo(event) {
        window.lastVid = this.$refs.self
        window.lastClick = event
        // stop video if playing and clicked off
        if (this.playing && this.$refs.self && !this.$refs.self.contains(event.target)) {
          this.stopVideo()
        }
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
    /* box-shadow: 1px 2px 6px rgba(164, 175, 189, 0.32); @todo - not included for this background*/
    transition: transform 1s ease; /* Hover effect */
  }
  .card--hovering {
    transform: scale(1.05);
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
    background-image: none;
  
    /* video play percent*/
    width: 0%;
    transition: width 0.5s linear;
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
    color: var(--color-gray-3);
  
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
  }
  .card-head--overlay-icon {
    height: 10vh;
  }
  .card-head--overlay-icon path {
    fill: var(--color-gray-9);
  }
  </style>
  