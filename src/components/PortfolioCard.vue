<template>
  <div ref="self" class="portfolio-card" @click="expanded = !expanded">
    <div class="portfolio-head">
      <div><span class="name">{{ name }}</span> - <span class="description">{{ description }}</span></div>
      <div class="icon-link" :class="{'icon-link--revealed': expanded}" @click="navigate">
        <svg v-if="iconName === 'paperclip'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path style="fill: var(--color-darkblue)" d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z"/>
        </svg>
        <svg v-if="iconName === 'download'" style="position: relative; left: 1px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path style="fill: var(--color-darkblue)" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z"/>
        </svg>
      </div>
      <div class="icon-expander">
        <svg
          :class="{'icon-expander--rotated': expanded}"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
            <path style="fill: var(--color-darkblue)" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
        </svg>
      </div>
    </div>
    <div class="portfolio-content" :style="contentStyles">
      <slot></slot>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'PortfolioCard',
  props: {
    name: {
      type: String
    },
    description: {
      type: String
    },
    link: {
      type: String
    },
    iconName: {
      type: String,
      validator: (value) => {
        const icons = ['paperclip', 'download']

        return icons.includes(value)
      }
    },
  },
  watch: {
    expanded: {
      handler(expanded) {
        if (expanded) {
          this.$refs.self.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }

        setTimeout(() => this.afterExpanded = expanded, 300)
      }
    }
  },
  computed: {
    contentStyles() {
      return {
        maxHeight: this.expanded ? '200px' : '0',
        padding: this.expanded ? '0 0 0 10px' : '0',
        opacity: this.expanded ? '1' : '0',
        transition: 'max-height 0.5s ease, opacity 0.2s linear, padding 0.2s linear',
      }
    }
  },
  data() {
    return {
      expanded: false,
      afterExpanded: false,
    }
  },
  methods: {
    navigate() {
      if (this.afterExpanded) {
        window.location.href = this.link
      }
    }
  }
}
</script>

<style scoped>
@import '../assets/styles/core.css';
.portfolio-card {
  background-image: var(--gradient-white);
  border-radius: var(--radius-md);
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.25);
}
.portfolio-head {
  justify-content: space-between;
  display: flex;
}
.name {
  font-size: 16px;
  font-weight: bold;
}
.description {
  font-size: 14px;
  color: #555;
}
.portfolio-content {
  padding: 0;
}
.icon-expander {
  font-size: 14px;
  text-decoration: none;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-gray-2);
  background-color: var(--color-gray-1);
  border-radius: 25%;
  cursor: pointer;

  position: absolute;
  right: 10px;
  bottom: 10px;
}
.icon-expander > svg {
  height: 15px;
  transition: transform 0.4s linear;
}
.icon-expander--rotated {
  transform: rotate(180deg) translateY(-2px);
}
.icon-link {
  font-size: 14px;
  text-decoration: none;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-gray-2);
  background-color: var(--color-gray-1);
  border-radius: 25%;
  cursor: pointer;
  
  opacity: 0;
  transition: opacity 0.2s linear;
}
.icon-link--revealed {
  opacity: 1;
}
.icon-link > svg {
  height: 15px;
}
</style>
    