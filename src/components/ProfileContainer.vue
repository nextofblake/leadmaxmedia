<template>
  <div class="profile-grid" :style="{ height: height }">
    <!-- Row 1 -->
    <div style="position: relative; overflow: hidden">
      <img
        v-if="profileService.loaded"
        :src="profileService.src"
        class="profile-img"
        alt="Blake Alan"
      />
    </div>
    <!-- Row 2 -->
    <div v-if="!inked" class="typewriter">
      <h2>{{ liveHeading }}</h2>
    </div>
    <div v-if="inked" class="typewriter--inked">
      <h2>{{ heading }}</h2>
    </div>
    <!-- Row 3 -->
    <form class="contact-form fade--in" ref="contactForm" v-if="ctaVisible" @submit.prevent="submit">
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
        class="button--unblended button--profile fade--in"
        type="submit"
      >
        <span v-if="!loading">Discover</span>
        <span v-if="loading">
          <svg class="spin--fast" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>
        </span>
      </button>
    </form>
  </div>
</template>

<script>
import { inject } from 'vue'
import { interval, takeWhile } from 'rxjs'

export default {
  name: 'ProfileContainer',
  props: {
    height: {
      type: String,
      default: '100%',
      required: true,
    },
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
  },
  setup() {
    return {
      profileService: inject('profileService'),
      fadeService: inject('fadeService'),
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
          this.ctaVisible = true
          this.$nextTick(() => {
            this.$refs.welcomeButton.classList.add('fade--in')
          })
        } else {
          this.$nextTick(() => {
            this.fadeService.apply(this.$refs.contactForm, 'slow')
            this.fadeService.apply(this.$refs.welcomeButton, 'fast')
          })
        }
      },
    }
  },
  data() {
    return {
      ctaVisible: false,
      liveHeading: '',
      name: '',
      email: '',
    }
  },
  mounted() {
    this.profileService.load()
  },
  methods: {
    submit() {
      this.$emit('discover', this.name, this.email)
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
}
</script>

<style scoped>
@import '../assets/styles/core.css';
.profile-container {
  padding: var(--global-viewPadding);
}
.profile-grid {
  display: grid;
  grid-template-rows:
    calc(100% - var(--global-viewPadding) - var(--font-size-lg))
    var(--font-size-lg)
    min-content;
  justify-items: center;
  grid-gap: var(--global-viewPadding);
  padding: 0 5vw;
}
.profile-img {
  height: calc(100% - 20px);
  display: inline-block;
  border-radius: var(--radius-50);
  object-fit: cover;
  border: 10px double var(--color-gray-1);
}
.button--profile {
  width: 175px;
}
/* Mobile */
/* @media screen and (max-width: 1000px) {
  .card-layout {
    grid-template-columns: auto;
  }
} */

/* 
 * TODO move somewhere else 
 */
.bullet-list {
  list-style-type: disc;
  margin: 0;
  padding: 0;
  padding-left: 40px;
  font-size: 24px;
}
.bullet-list li {
  margin-bottom: 10px;
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
  border: 2px solid var(--color-blue);
  outline: none;
}
</style>
