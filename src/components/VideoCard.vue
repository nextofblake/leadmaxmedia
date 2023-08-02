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
          @click.prevent="toggleVideo"
          @timeupdate="setControlWidth"
          @ended="onEndedVideo"
          @fullscreenchange="onFullscreenChange"
        >
          <source :src="src" type="video/mp4" />
        </video>
        <div class="card-head--controls" :style="{ width: controlWidth }"></div>
        <div class="card-head--overlay" :class="{ 'card-head--overlay-playing': playing }" @click.prevent="toggleVideo">
          <span class="card-head--overlay-title"><slot name="title"></slot></span>
          <div class="card-head--overlay-icon-wrapper">
            <!-- 
              Property "bounce" was accessed during render but is not defined on instance.
              It's because @enter="bounce" is keyframe not a method/data on component
            -->
            <transition @enter="bounce" appear>
              <svg 
                v-show="showIcon" 
                class="card-head--overlay-icon" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 384 512"
              >
                <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path style="fill: var(--color-gray-3)" d="M64 64V241.6c5.2-1 10.5-1.6 16-1.6H96V208 64c0-8.8-7.2-16-16-16s-16 7.2-16 16zM80 288c-17.7 0-32 14.3-32 32c0 0 0 0 0 0v24c0 66.3 53.7 120 120 120h48c52.5 0 97.1-33.7 113.4-80.7c-3.1 .5-6.2 .7-9.4 .7c-20 0-37.9-9.2-49.7-23.6c-9 4.9-19.4 7.6-30.3 7.6c-15.1 0-29-5.3-40-14c-11 8.8-24.9 14-40 14H120c-13.3 0-24-10.7-24-24s10.7-24 24-24h40c8.8 0 16-7.2 16-16s-7.2-16-16-16H120 80zM0 320s0 0 0 0c0-18 6-34.6 16-48V64C16 28.7 44.7 0 80 0s64 28.7 64 64v82c5.1-1.3 10.5-2 16-2c25.3 0 47.2 14.7 57.6 36c7-2.6 14.5-4 22.4-4c20 0 37.9 9.2 49.7 23.6c9-4.9 19.4-7.6 30.3-7.6c35.3 0 64 28.7 64 64v64 24c0 92.8-75.2 168-168 168H168C75.2 512 0 436.8 0 344V320zm336-64c0-8.8-7.2-16-16-16s-16 7.2-16 16v48 16c0 8.8 7.2 16 16 16s16-7.2 16-16V256zM160 240c5.5 0 10.9 .7 16 2v-2V208c0-8.8-7.2-16-16-16s-16 7.2-16 16v32h16zm64 24v40c0 8.8 7.2 16 16 16s16-7.2 16-16V256 240c0-8.8-7.2-16-16-16s-16 7.2-16 16v24z"/>
              </svg>
            </transition>
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

  export default {
    name: 'VideoCard',
    props: {
      src: {
        type: String,
        required: true,
      },
      bounceIcon: {
        type: Number,
        required: false,
        default: 0
      }
    },
    data() {
      return {
        playing: false,
        controlWidth: '0%',
        showIcon: false,
      }
    },
    mounted() {
      document.addEventListener('click', this.onClickAwayVideo)
    },
    watch: {
      bounceIcon: {
        handler() {
          this.showIcon = true
          setTimeout(() => this.showIcon = false, 500)
        }
      }
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
        this.$refs.video.muted = true // WARNING: temporary muted fix for live production
  
        this.playing = true
        this.$refs.self.classList.add('card--hovering')
      },
      stopVideo() {
        this.$refs.video.muted = true
  
        this.playing = false
        this.$refs.self.classList.remove('card--hovering')
      },
      onEndedVideo() {
        this.$refs.video.currentTime = 0
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
      onFullscreenChange() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
          // Exit fullscreen if the video enters fullscreen mode
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
      },
      setControlWidth() {
        const currentTime = this.$refs.video.currentTime
        console.log(this.$refs.video.currentTime)
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
  animation: bounce 1.5s
}
.card-head--overlay-icon path {
  fill: var(--color-gray-9);
}

/* <transition name="bounce"> */
@keyframes bounce {
  0%, 10%, 50%, 90%, 100% {
    transform: translateY(10px);
  }
  20% {
    transform: translateY(-10px);
  }
  40% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-10px);
  }
  80% {
    transform: translateY(0);
  }
}
</style>
  