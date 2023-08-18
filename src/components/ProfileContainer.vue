<template>  
  <div class="profile-grid" :class="{'shrink': shrink}">
    <!-- Row 1 -->
    <div class="image-container" @click="profileService.spinImage()">
      <transition name="flip">
        <div v-if="profileService.showFront" class="image-wrapper front">
          <img :src="profileService.frontImage" alt="Front Image">
        </div>
        <div v-else class="image-wrapper back">
          <img :src="profileService.logoActive" alt="LxM Logo Active">
        </div>
      </transition>
    </div>
    <!-- Row 2 -->
    <div v-if="!inked" class="typewriter">
      <h2>{{ liveHeading }}</h2>
    </div>
    <div v-if="inked" class="typewriter--inked">
      <h2>{{ heading }}</h2>
    </div>
    <!-- Row 3 -->
    <transition name="fade" v-if="ctaVisible">
      <form v-if="showContactForm" class="contact-form" ref="contactForm" @submit.prevent="submit">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" placeholder="Your Name (e.g. John Doe)" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Your Email (e.g. john.doe@email.com)"
            required
          />
        </div>
        <button
          ref="welcomeButton"
          class="button--unblended button--large button--profile"
          type="submit"
        >
          <span v-if="!loading">Discover</span>
          <span v-if="loading">
            <svg class="spin--fast" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
          </span>
        </button>
      </form>
    </transition>
  </div>
</template>

<script>
import { inject } from 'vue'
import { interval, takeWhile } from 'rxjs'

export default {
  name: 'ProfileContainer',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    heading: {
      type: String,
      default: '',
    },
    showCta: {
      type: Boolean,
      default: false,
    },
    inked: {
      type: Boolean,
      default: false,
    },
    shrink: {
      type: Boolean,
      default: false,
    }
  },
  setup() {
    return {
      profileService: inject('profileService'),
      scrollService: inject('scrollService'),
    }
  },
  data() {
    return {
      showWelcomeButton: false,
      showContactForm: false,
      ctaVisible: true,
      liveHeading: '',
      name: '',
      email: '',
    }
  },
  watch: {
    heading: {
      handler(next) {
        this.clearTypewriter()
        this.runTypewriter(next)
      }
    },
    showCta: {
      handler(show) {
        if (show) {
          this.showContactForm = true
          setTimeout(() => {
            this.showWelcomeButton = true
          }, 250)
        } else {
          this.ctaVisible = false
        }
      },
    }
  },
  methods: {
    submit() {
      this.$emit('discover', this.name, this.email)

      this.scrollService.scrollToTop(500)
    },
    runTypewriter(heading = '') {
      interval(50)
        .pipe(
          takeWhile((i) => {
            return i <= heading.length
          })
        )
        .subscribe((i) => {
          this.liveHeading += heading.charAt(i)

          if (i === heading.length) {
            this.$emit('printed', this.heading)
          }
        })
    },
    clearTypewriter() {
      this.liveHeading = ''
    }
  },
  computed: {
    imageClass() {
      return this.profileService.showFront ? '' : 'flip-image'
    }
  }
}
</script>

<style scoped>
@import '../assets/styles/core.css';
.profile-container {
  padding: var(--global-viewPadding);
}
.profile-grid {
  display: grid;
  justify-items: center;
  grid-gap: var(--global-viewPadding);
  padding: 8vh 5vw;
  transition-property: margin; /* Make shrink class avaliable */
  transition-duration: 0.75s;
}
.profile-grid.shrink {
  padding: 2vh 0; 
}
.profile-img {
  height: calc(100% - 20px);
  display: inline-block;
  object-fit: cover;
}
/* Profile Image */
.image-container {
  position: relative;
  border: 10px double var(--color-gray-1);
  border-radius: var(--radius-50);
  overflow: hidden;
  width: 300px; /* Set the desired width of the image container */
  height: 300px; /* Set the desired height of the image container */
  perspective: 800px; /* Set the perspective for the 3D effect */
  transition-property: width, height; /* Make shrink class avaliable */
  transition-duration: 0.75s;
}
.profile-grid.shrink .image-container {
  width: 100px;
  height: 100px;
}
.image-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform-style: preserve-3d; /* Ensure 3D transformations preserve child elements */
}
.image-wrapper img {
  width: 100%;
  height: 100%;
  border-radius: 50%; /* Force images to be round for the flip animation*/
  object-fit: cover; /* Ensure the image covers the entire container */
}

/* <transition name="flip"> */
.flip-enter-active,
.flip-leave-active {
  transition: all 0.75s linear;
}
.flip-enter-from {
  transform: rotateY(-180deg) scale(1.5);
}
.flip-leave-to {
  transform: rotateY(180deg);
}

/* Contact Form */
.contact-form {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.contact-form h1 {
  padding: var(--global-viewPadding) 0;
  margin-right: auto;
}
.form-group {
  margin-bottom: var(--global-viewPadding);
  width: 100%;
}
label {
  display: none;
}
input,
textarea {
  font-family: var(--font-family-default);
  font-size: var(--font-size-lg);
  border-radius: var(--radius-md);

  /* width calc */
  padding: 8px;
  border: 2px solid var(--color-gray-3);
  width: calc(100% - 16px - 4px);
}
input:focus-visible,
textarea:focus-visible {
  border: 2px solid var(--color-lightcyan);
  outline: none;
}
.button--profile {
  width: 175px;
}
</style>
