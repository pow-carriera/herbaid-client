<script setup>
import HeaderMain from "./views/HeaderView.vue";
import NavigationBar from "./views/NavigationBarView.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <HeaderMain />
  <NavigationBar />
  <RouterView />
</template>

<style scoped></style>
