<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <nav id="nav">
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/directory">Herbal Directory</RouterLink></li>
      <li><RouterLink to="/doctors">Doc Support</RouterLink></li>
      <li><RouterLink to="/about">About Us</RouterLink></li>
    </ul>
  </nav>
</template>
<style></style>
