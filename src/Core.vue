<template>
  <transition name="fade" @enter="onAppInit">
    <!-- Overlay view masking app when assets are loading -->
    <div v-if="!profileService.loaded" class="view view--white"></div>

    <!-- Core view -->
    <div v-else class="view view--white">
      
      <!-- Profile Header -->
      <ProfileContainer
        :showCta="showProfileCta"
        :heading="heading"
        :shrink="shrinkProfile"
        @printed="onPrinted"
        @discover="onDiscover"
      />

      <!-- Home Page -->
      <transition name="rise" @before-enter="onHomeInit">
        <div v-if="showHome" class="home-page">
          <Break height="2vh"/>
          <VideoCard  :src="videoService.checkup" :poster="videoService.checkupPoster" :showPreview="showVideoPreview" style="max-width: 500px;">
            <template #title>Are You Mobile First?</template>
            <template #footer>
              <span style="font-size: var(--font-size-lg);">Brand Checkup</span>
              <Break height="10px"/>
              <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                <ul>
                  <li>❤️‍🩹 Mobile health</li>
                  <li>🕸️ Web reputation</li>
                </ul>
                <button class="button--unblended button--blue" style="width: 140px" @click="bookAudit()">
                  <span v-if="!loadingSalesEmail">Free</span>
                  <span v-if="loadingSalesEmail">
                    <svg class="spin--fast" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 512 512"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
                  </span>
                </button>
              </div>
            </template>
          </VideoCard>
          <Break height="2vh"/>
          <VideoCard  :src="videoService.meeting" :poster="videoService.meetingPoster" style="max-width: 500px;">
            <template #title>Book Zoom Meeting</template>
            <template #footer>
              <span style="font-size: var(--font-size-lg);">15 Minute Chat</span>
              <Break height="10px"/>
              <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                <ul>
                  <li>🕒️ 1-1 meeting</li>
                  <li>💸 Pricing models</li>
                </ul>
                <button class="button--unblended" style="width: 140px" @click="bookMeeting()">
                  <span v-if="!loadingMeetingEmail">Book</span>
                  <span v-if="loadingMeetingEmail">
                    <svg class="spin--fast" xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 512 512"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
                  </span>
                </button>
              </div>
            </template>
          </VideoCard>
          <Break height="2vh"/>
          <div style="width: 100%; max-width: 500px;">
            <h1 style="color: var(--color-gray-0)">Services</h1>
            <Break/>
            <ServiceCard
              name="Web Development"
              description="Create optimized custom site"
              :image="imageService.startup"
              :items="[
                'Mobile first design to attract 15% more traffic',
                'Modernize existing website to engage users ',
                'SEO to boost organic search engine traffic'
              ]"
              :premiumItems="[
                'Backend development with cloud app & databases'
              ]"
            />
            <ServiceCard
              name="Lead Generation"
              description="Convert prospects to customers"
              :image="imageService.magnet"
              :items="[
                'Create ad creatives and target your audience',
                'Grow your social following and generate likes',
              ]"
            />
          </div>
          <Break height="2vh"/>
          <div style="width: 100%; max-width: 500px;">
            <h1 style="color: var(--color-gray-0)">Portfolio</h1>
            <Break/>
            <PortfolioCard 
              name="TLG"
              description="A lead generation company in fintech"
              link="https://financebuddy.com"
              iconName="paperclip"
              :image="imageService.financeBuddy"
              :startExpanded="true"
            >
              <ul>
                <li>&bull; Detailed reporting for affiliate advertisers</li>
                <li>&bull; Worked in large team, hitting deliverables</li>
                <li>&bull; Analyzed A/B tests for thousands of users</li>
              </ul>
            </PortfolioCard>
            <PortfolioCard
              name="Nukshuk"
              description="A habit tracking app"
              link="https://nukshuk.com"
              iconName="paperclip"
              :image="imageService.nukshuk"
            >
              <ul>
                <li>&bull; Total redesign w/ pro UX designer</li>
                <li>&bull; Deployed 24/7 cloud Docker Swarm</li>
                <li>&bull; Project management of coaching platform</li>
              </ul>
            </PortfolioCard>
            <PortfolioCard 
              name="Snapfi"
              description="Mortgage lead application"
              link="https://snapfi.com"
              iconName="paperclip"
              :image="imageService.snapfi"
            >
              <ul>
                <li>&bull; SEO for mortgage leads</li>
                <li>&bull; Created api itegration for housing pricing</li>
                <li>&bull; Visulized data graphs for web users</li>
              </ul>
            </PortfolioCard>
            <PortfolioCard 
              name="Hunting Locator"
              description="Hunting utility app"
              link="https://huntinglocator.com"
              iconName="paperclip"
              :image="imageService.huntingLocator"
            >
              <ul>
                <li>&bull; Tools for hunters to track animal sightings</li>
                <li>&bull; Integrated Mapbox capabilities</li>
                <li>&bull; Refactored codebase for futureproofing</li>
              </ul>
            </PortfolioCard>
          </div>
          <Break height="2vh"/>
          <ContactsFooter id="footer"/>
        </div>
      </transition>

      <!-- Video Reels -->
      <transition name="rise">
        <VideoReel v-if="showIntroReel" @ended="onIntroReelEnd"/>
      </transition>
    </div>
  </transition>
</template>

<script>
import { inject } from 'vue'
import Break from './components/Break.vue'
import ContactsFooter from './components/ContactsFooter.vue'
import PortfolioCard from './components/PortfolioCard.vue'
import ProfileContainer from './components/ProfileContainer.vue'
import ServiceCard from './components/ServiceCard.vue'
import VideoCard from './components/VideoCard.vue'
import VideoReel from './components/VideoReel.vue'

export default {
  name: 'Core',
  components: {
    Break,
    ContactsFooter,
    PortfolioCard,
    ProfileContainer,
    ServiceCard,
    VideoCard,
    VideoReel,
  },
  setup() {
    return {
      devService: inject('devService'),
      emailService: inject('emailService'),
      eventService: inject('eventService'),
      imageService: inject('imageService'),
      networkService: inject('networkService'),
      profileService: inject('profileService'),
      scrollService: inject('scrollService'),
      videoService: inject('videoService'),
    }
  },
  data() {
    return {
      heading: '',
      headingIntro: 'Hello, I am Blake Alan',
      headingHomepage: 'Welcome to LeadMaxMedia',
      headingSuccessBooking: 'Okay, let\'s schedule',
      headingSuccessAudit: 'Tailored analysis in <48hr',
      headingSuccessAuditEnd: 'Fill out Google Form',
      headingFailureMsg: 'Sorry, try again later',
      headingFinalMsg: 'All replies in <48hr',
      loadingMeetingEmail: false,
      loadingSalesEmail: false,
      showProfileCta: false,
      showHome: false,
      showIntroReel: false,
      showVideoPreview: false,
      shrinkProfile: false,
      userEmail: '',
      userName: '',
    }
  },
  created() {
    // Client checks
    this.networkService.boot()
    this.devService.boot()

    // Load blocking assets
    this.profileService.boot()
  },
  computed: {
    headingIntroReel() {
      return 'Greetings, ' + this.userName
    },
  },
  methods: {
    onAppInit() {
      // Hello, my name is Blake
      console.log('Core@onAppInit')
      this.heading = this.headingIntro

      // DEV MODE: ?dev=1
      if (this.devService.enabled) {
        this.userName = 'LxM Mailinator'
        this.userEmail = 'lxm@mailinator.com'
        this.heading = this.headingHomepage
        this.showHome = true
        this.showProfileCta = false
        this.shrinkProfile = true
      }
    },
    onHomeInit() {
      // Load lazy assets
      this.videoService.boot()
      this.imageService.boot()

      // Reveal welcome heading
      this.heading = this.headingHomepage
      this.scrollService.scrollToTop(500)
    },
    onPrinted(heading) {
      switch (heading) {
        case this.headingIntro:
          this.showProfileCta = true
          break

        case this.headingHomepage:
          this.profileService.flipImage().then(() => {
            this.showVideoPreview = true
          })
          break
        case this.headingIntroReel:
          this.scrollService.scrollToBottom(500)
          break
        case this.headingSuccessBooking:
          this.profileService.flipImage().then(() => {
            window.location.href = this.emailService.getMeetingUrl(this.userName, this.userEmail)
          })
          break
        case this.headingSuccessAudit:
          setTimeout(() => this.heading = this.headingSuccessAuditEnd, 500)
          break
        case this.headingSuccessAuditEnd:
          this.profileService.flipImage().then(() => {
            window.location.href = this.emailService.googleFormUrl
          })
          break
        case this.headingFailureMsg:
          this.profileService.flipImage()
          this.showProfileCta = false
          this.showHome = false
          break
      }
    },
    onDiscover(name, email) {
      this.userName = name
      this.userEmail = email
      this.showProfileCta = false
      this.shrinkProfile = true

      if (this.$route.path === '/intro') {
        this.showHome = false
        this.showIntroReel = true
        this.heading = this.headingIntroReel
      } else {
        this.showHome = true
      }
    },
    onIntroReelEnd() {
      this.showIntroReel = false
      this.showHome = true
    },
    bookMeeting() {
      this.loadingMeetingEmail = true
      this.emailService.sendFaker(500)
        .then(response => {
          this.heading = this.headingSuccessBooking
          console.log('Core@onDiscover', response)
        })
        .catch(error => {
          this.heading = this.headingFailureMsg
          console.error('Core@onDiscover', error)
        })
        .finally(() => {
          this.scrollService.scrollToTop(300)
          this.loadingMeetingEmail = false
          this.showHome = false
          this.shrinkProfile = false
        })
    },
    bookAudit() {
      this.loadingSalesEmail = true
      this.emailService.sendFaker(500)
        .then(response => {
          this.heading = this.headingSuccessAudit
          console.log('Core@onDiscover', response)
        })
        .catch(error => {
          this.heading = this.headingFailureMsg
          console.error('Core@onDiscover', error)
        })
        .finally(() => {
          this.scrollService.scrollToTop(300)
          this.loadingSalesEmail = false
          this.showHome = false
          this.shrinkProfile = false
        })
    },
  },
}
</script>

<style>
@import './assets/styles/core.css';

/* Home blue page */
.home-page {
  width: 100%;
  max-width: 100vw;
  min-height: calc(100vh - 4vh - 160px); /* Ensure page + profile container > 100vh */

  background-image: var(--gradient-primary);
  border-radius: var(--radius-md) var(--radius-md) 0 0;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
}
.home-page > * {
  margin: 0 20px 0 20px; /* Force page horizontal padding */
}

/* <transition name="rise"> */
.rise-enter-active,
.rise-leave-active {
  transition: transform 0.75s ease-in-out;
}
.rise-enter-from,
.rise-leave-to {
  transform: translateY(100%);
}

/* <transition name="fade"> */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
