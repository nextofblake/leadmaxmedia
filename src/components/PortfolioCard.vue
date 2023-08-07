<template>
  <div class="portfolio-card">
    <div><span class="name">{{ name }}</span> - <span class="description">{{ description }}</span></div>
    <a class="icon-link" :href="link">
      <svg v-if="iconName === 'paperclip'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path style="fill: var(--color-darkblue)" d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z"/>
      </svg>
      <svg v-if="iconName === 'download'" style="position: relative; left: 1px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path style="fill: var(--color-darkblue)" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 232V334.1l31-31c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-72 72c-9.4 9.4-24.6 9.4-33.9 0l-72-72c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l31 31V232c0-13.3 10.7-24 24-24s24 10.7 24 24z"/>
      </svg>
    </a>
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
  justify-content: space-between;
  display: flex;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.25);
}
.name {
  font-size: 16px;
  font-weight: bold;
}
.description {
  font-size: 14px;
  color: #555;
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
}
.icon-link > svg {
  height: 15px;
}
</style>
    