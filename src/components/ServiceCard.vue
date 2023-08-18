<template>
  <div ref="self" class="service-card" @click="expanded = !expanded">
    <div class="service-logo">
      <div class="image-container">
        <img class="service-image" :src="image" alt="Porfolio Image" />
      </div>
      <slot></slot>
    </div>
    <div class="service-title">
      <div><span class="name">{{ name }}</span></div>
      <div><span class="description">{{ description }}</span></div>
    </div>
    <div class="service-items">
      <div v-for="(item, index) in items" :key="index" class="service-item">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path style="fill: var(--color-green)" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
        </svg>
        <span>{{ item }}</span>
      </div>
      <div v-for="(item, index) in premiumItems" :key="index" class="service-item">
        <div class="service-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style="position: relative; left: -2px; top: -1px; padding-right: 6px;">
            <path style="fill: var(--color-gold)" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
          </svg>
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
    <div v-if="premiumItems.length" class="service-footer">
      <svg xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 0 576 512">
        <path style="fill: var(--color-gold)" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
      </svg>
      <span>premium</span>
    </div>
  </div>
</template>
    
<script>
import { inject } from 'vue'

export default {
  name: 'ServiceCard',
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
    image: {
      type: String
    },
    items: {
      type: Array,
      default: () => [],
    },
    premiumItems: {
      type: Array,
      default: () => [],
    }
  },
  setup() {
    return {
      imageService: inject('imageService'),
      scrollService: inject('scrollService'),
    }
  },
  data() {
    return {
      expanded: true,
    }
  },
}
</script>

<style scoped>
@import '../assets/styles/core.css';
.service-card {
  background-image: var(--gradient-white);
  border-radius: var(--radius-md);
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.25);
}
.description {
  font-size: 14px;
  color: #555;
}
.service-logo {
  color: var(--color-black);
  display: flex;
  justify-content: center;
}
.image-container {
  width: 130px;
  height: 130px;
  margin: 20px; /* Increase size to include image overflow */
  border-radius: 100%;
  background-color: var(--color-darkblue);
  position: relative;
}
.service-image {
  width: 140px;
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
  top: 50%;
}
.service-title {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 15px;
}
.name {
  font-size: var(--font-size-lg);
  font-weight: bold;
}
.service-items {
  display: grid;
  grid-gap: 10px;
  padding: 10px 0 0 0;
  margin: 0 30px;
  border-top: 3px solid var(--color-gray-2);
}
.service-item {
  display: flex;
  align-items: center;
}
.service-item > svg {
  padding-right: 10px;
  height: var(--font-size-sm);
}
.service-item > span {
  font-size: var(--font-size-sm);
}
.service-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: var(--font-size-xs);
  padding-top: 10px;
}
.service-footer > svg {
  padding-right: 2px;
}
/* Mobile */
@media screen and (max-width: 768px) {
  .service-items {
    margin: 0;
  }
}
</style>
    