<script setup>
import HeaderMain from "./components/HeaderMain.vue";
import NavigationBar from "./components/NavigationBar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <HeaderMain />
  <NavigationBar />
  <RouterView />
</template>

<style scoped></style>
