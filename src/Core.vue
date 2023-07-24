<template>
  <!-- View Stack -->
  <div ref="viewProfile" class="view view--profile">
    <div style="height: 10vh;"></div>
    <ProfileContainer 
      height="40vh"
      :loading="emailSending"
      :showCta="showCta"
      :heading="heading"
      @printed="onPrinted"
      @discover="onDiscover"
    />
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
      emailSending: false,
      showCta: false,
      heading: '',
      headingInitial: 'Hello, I am Blake Alan',
      headingIntroduced: 'Welcome to LeadMaxMedia',
      headingFailureMsg: 'Sorry, try again later',
      headingSuccessMsg: 'Thank you, check your inbox',
    }
  },
  mounted() {
    this.fadeService.apply(this.$refs.viewInitial, 'slow')
    this.heading = this.headingInitial
  },
  methods: {
    onPrinted(heading) {
      switch (heading) {
        case this.headingInitial:
          setTimeout(() => {
            this.showCta = true
            this.heading = this.headingIntroduced
          }, 1000)
          break

        case this.headingSuccessMsg:
        case this.headingFailureMsg:
          this.showCta = false
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
        })
    },
  },
}
</script>

<style>
@import './assets/styles/core.css';
</style>
