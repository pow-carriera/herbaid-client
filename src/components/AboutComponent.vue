<script setup>
import AboutFeed from "./AboutFeed.vue";
</script>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<template>
  <div class="background">
    <div class="foreground">
      <AboutFeed />
    </div>
  </div>
</template>

<style scoped>
.background {
  position: absolute;
  width: 100vw;
  height: 100vh;
}
</style>
