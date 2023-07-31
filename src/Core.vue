<template>
  <!-- View Stack -->
  <div ref="viewHome" class="view view--blue"></div>
  <div ref="viewProfile" class="view view--white">
    
    <ProfileContainer
      :loading="emailSending"
      :showCta="showCta"
      :heading="heading"
      :shrink="viewHome"
      @printed="onPrinted"
      @discover="onDiscover"
    />

    <transition name="rise">
      <div v-if="viewHome" class="home-card">
        <!-- Home Page -->
        <div style="
            background-image: var(--gradient-white); 
            width: 90%; 
            height: min-content; 
            margin-top: 2vh; 
            border-radius: var(--radius-md); 
            box-shadow: 1px 1px 4px var(--color-gray-6);
        ">
          <div style="
              position: relative;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: var(--font-size-xl);
              font-family: var(--font-family-big);
              border-bottom: 3px solid var(--color-gray-3);
              border-radius: var(--radius-md) var(--radius-md) 0 0;
              padding: 10px;
              color: var(--color-gray-8);
          ">
            <span style="              
              color: var(--color-gray-8);
              background: var(--gradient-alt);
              -webkit-background-clip: text; /* For Safari */
              background-clip: text;
              color: transparent;
            ">Free Audit</span>
          </div>
          <div style="padding: 20px 0 0 0;">
            <ul class="bullet-list">
              <li>Web Analysis</li>
              <li>Growth Strategies</li>
              <li>Pricing & ROI</li>
            </ul>
          </div>
          <div style="display: flex; justify-content: flex-end; margin: 10px">
            <button class="button--unblended button--blue" style="width: 100px" @click="bookAudit()">
              <span v-if="!auditLoading">Book</span>
              <span v-if="auditLoading">
                <svg class="spin--fast" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
              </span>
            </button>
          </div>
        </div>

        <div class="welcome-icons">
          <a href="https://www.instagram.com/nextofblake" target="_blank" rel="noopener noreferrer">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
              />
            </svg>
          </a>
          <a href="tel:+18168986927">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.7 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z"
              />
            </svg>
          </a>
          <a href="mailto:blake@leadmaxmedia.com">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"
              />
            </svg>
          </a>
        </div>

        <transition name="rise" @after-enter="playVideo()">
          <div v-if="showVideo" class="video-card">
            <!-- Intro Video -->
            <video ref="video" controls @ended="onEndedVideo()">
              <source :src="videoService.intro" type="video/mp4" />
            </video>
          </div>
        </transition>
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
      headingIntro: 'Hello, I am Blake Alan',
      headingHomepage: 'Welcome to LeadMaxMedia',
      headingNextSteps: 'Our next move is...',
      headingFailureMsg: 'Sorry, try again later',
      headingSuccessMsg: 'Thanks, check your inbox',
      headingFinalMsg: 'I will reply in <48hr',
      viewHome: false,
      videoEnded: false,
      showVideo: false,
      auditLoading: false,
      userName: '',
      userEmail: '',
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
        this.heading = this.headingIntro
        if (this.devMode) {
          this.heading = this.headingHomepage
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
        case this.headingIntro:
          this.showCta = true
          break

        case this.headingHomepage:
          this.profileService.flipImage().then(() => {
            // only show video when live
            this.showVideo = this.devMode ? false : true
          })
          break
        case this.headingSuccessMsg:
          this.profileService.flipImage().then(() => {
            this.heading = this.headingFinalMsg
          })
          break
        case this.headingFailureMsg:
          this.profileService.flipImage()
          break
      }
    },
    onDiscover(name, email) {
      this.userName = name
      this.userEmail = email
      this.heading = this.headingHomepage
      this.showCta = false
      this.viewHome = true
    },
    playVideo() {
      this.$refs.video.play()
      this.$refs.video.currentTime = 0
      this.$refs.video.muted = false
    },
    onEndedVideo() {
      this.showVideo = false
      this.heading = this.headingNextSteps
    },
    bookAudit() {
      this.auditLoading = true
      this.emailService.sendSales(this.userName, this.userEmail)
        .then(response => {
          this.heading = this.headingSuccessMsg
          console.log('Core@onDiscover', response)
        })
        .catch(error => {
          this.heading = this.headingFailureMsg
          console.error('Core@onDiscover', error)
        })
        .finally(() => {
          this.auditLoading = false
          this.viewHome = false
        })
    }
  },
}
</script>

<style>
@import './assets/styles/core.css';

/* <transition name="fade"> */
.rise-enter-active,
.rise-leave-active {
  transition: all 0.75s ease-in-out;
}
.rise-enter-from,
.rise-leave-to {
  transform: translateY(100%);
}

/* Card Stack */
.home-card {
  background-image: var(--gradient-primary);
  height: calc(100vh - 4vh - 160px);
  width: 100%;
  max-width: 100vw;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.video-card {
  display: flex; 
  justify-content: center; 
  background: black;
  border-radius: var(--radius-md) var(--radius-md) 0 0;

  overflow: hidden; /* Ensure video element does not produce scroll */
  position: absolute;
  top: calc(2vh + 120px + var(--global-viewPadding)); /* ProfileContainer shrunk top margin */
  height: calc(100vh - 2vh - 120px - var(--global-viewPadding)); /* ProfileContainer shrunk top margin */
  max-width: 100vw;
  width: 100%;
}
.video-card video {
  width: 100%;
  object-fit: cover;
}

/* Social Media */
.welcome-icons {
  display: flex;
  position: absolute;
  bottom: var(--global-viewPadding);
  justify-content: space-between;
  width: 250px;
}
.icon {
  width: 42px;
  height: 42px;
}

/* Bullet list */
.bullet-list {
  list-style-type: disc;
  margin: 0;
  padding: 0;
  padding-left: 40px;
  font-size: var(--font-size-md);
}
.bullet-list li {
  margin-bottom: 10px;
}
</style>
