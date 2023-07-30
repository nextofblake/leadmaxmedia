<template>
  <!-- View Stack -->
  <div ref="viewHome" class="view view--blue"></div>
  <div ref="viewProfile" class="view view--white" :class="{ 'view--clear' : viewHome }">
    
    <ProfileContainer
      :loading="emailSending"
      :showCta="showCta"
      :heading="heading"
      :shrink="viewHome"
      @printed="onPrinted"
      @discover="onDiscover"
    />

    <transition name="fade">
      <div v-if="!viewHome"></div>
      <div v-else-if="viewHome && !videoEnded">
        <div class="video-container">
          <video ref="video" @ended="onEndedVideo()">
            <source :src="videoService.intro" type="video/mp4" />
          </video>
        </div>
      </div>
      <div v-else>
      </div>
    </transition>

  </div>
  <div ref="viewInitial" class="view view--white"></div>
</template>

<script>
import { inject } from 'vue'
import ProfileContainer from './components/ProfileContainer.vue'

export default {
  name: 'Core',
  components: {
    ProfileContainer,
  },
  setup() {
    return {
      eventService: inject('eventService'),
      fadeService: inject('fadeService'),
      profileService: inject('profileService'),
      emailService: inject('emailService'),
      videoService: inject('videoService'),
    }
  },
  data() {
    return {
      devMode: false,
      emailSending: false,
      showCta: false,
      heading: '',
      headingInitial: 'Hello, I am Blake Alan',
      headingIntroduction: 'Welcome to LeadMaxMedia',
      headingFailureMsg: 'Sorry, try again later',
      headingSuccessMsg: 'Thank you, check your inbox',
      viewHome: false,
      videoEnded: false,
    }
  },
  mounted() {
    this.profileService.load()
    this.videoService.load()
  },
  watch: {
    'profileService.loaded'(isLoaded) {
      if (isLoaded) {
        this.fadeService.apply(this.$refs.viewInitial, 'slow')
        this.heading = this.headingInitial
        if (this.devMode) {
          this.heading = this.headingIntroduction
          this.emailSending = false
          this.showCta = false
          this.viewHome = true
        }
      }
    }
  },
  methods: {
    onPrinted(heading) {
      switch (heading) {
        case this.headingInitial:
          this.showCta = true
          break

        case this.headingIntroduction:
        case this.headingSuccessMsg:
        case this.headingFailureMsg:
          this.profileService.flipImage().then(() => {
            this.playVideo()
          })
          break         
      }
    },
    onDiscover(name, email) {
      this.emailSending = true
      this.emailService.sendFaker(name, email)
        .then(response => {
          this.heading = this.headingIntroduction
          console.log('Core@onDiscover', response)
        })
        .catch(error => {
          this.heading = this.headingFailureMsg
          console.error('Core@onDiscover', error)
        })
        .finally(() => {
          this.emailSending = false
          this.showCta = false
          this.viewHome = true
        })
    },
    playVideo() {
      this.$refs.video.play()
      this.$refs.video.currentTime = 0
      this.$refs.video.muted = false
    },
    onEndedVideo() {
      this.videoEnded = true
    }
  },
}
</script>

<style>
@import './assets/styles/core.css';

/* <transition name="fade"> */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.75s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Video Container */
.video-container {
  display: flex; 
  justify-content: center; 
  background: black;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  width: 100%;
  height: calc(100vh - 8vh - 158px); /* Calculated to be exactly 100vh with the shrunk profile container*/
}
</style>
