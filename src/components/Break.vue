<template>
  <div style="width: 100%" :style="{ height }"></div>
</template>
  
<script>
export default {
  name: 'ProfileContainer',
  props: {
    height: {
      type: String,
      default: '10px',
    },
  }
}
</script>
  
<style scoped>
@import '../assets/styles/core.css';
</style>
  