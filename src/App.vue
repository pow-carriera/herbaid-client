<script setup>
import Header from './components/Header.vue';
import NavigationBar from './components/NavigationBar.vue'
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <Header />
  <NavigationBar />
  <RouterView />
</template>

<style scoped>
</style>
