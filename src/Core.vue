<template>
  <!-- View Stack -->
  <div ref="viewHome" class="view view--blue"></div>
  <div ref="viewProfile" class="view view--white" :class="{ 'view--clear' : viewHome }">
    <div style="height: 8vh;"></div>
    
    <ProfileContainer
      :loading="emailSending"
      :showCta="showCta"
      :heading="heading"
      :shrink="viewHome"
      @printed="onPrinted"
      @discover="onDiscover"
    />

    <div style="height: 4vh;"></div>
    
    <!-- <transition name="fade">
      <div v-if="!viewHome"></div>
      <div v-else style="width: 100%; height: calc(100vh - 12vh - 260px); background-image: var(--gradient-dark)">

      </div>
    </transition> -->
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
    }
  },
  data() {
    return {
      devMode: true,
      emailSending: false,
      showCta: false,
      heading: '',
      headingInitial: 'Hello, I am Blake Alan',
      headingIntroduction: 'Welcome to LeadMaxMedia',
      headingFailureMsg: 'Sorry, try again later',
      headingSuccessMsg: 'Thank you, check your inbox',
      viewHome: false,
    }
  },
  mounted() {
    this.profileService.load()
  },
  watch: {
    'profileService.loaded'(isLoaded) {
      if (isLoaded) {
        this.fadeService.apply(this.$refs.viewInitial, 'slow')
        this.heading = this.headingInitial
        if (this.devMode) {
          this.heading = this.headingSuccessMsg
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
          setTimeout(() => {
            this.heading = this.headingIntroduction
            this.showCta = true
          }, 750)
          break

        case this.headingSuccessMsg:
        case this.headingFailureMsg:
          this.profileService.flipImage()
          break         
      }
    },
    onDiscover(name, email) {
      this.emailSending = true
      this.emailService.sendSales(name, email)
        .then(response => {
          this.heading = this.headingSuccessMsg
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
  },
}
</script>

<style>
@import './assets/styles/core.css';

/* <transition name="fade"> */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
