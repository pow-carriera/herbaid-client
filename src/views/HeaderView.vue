<script setup>
import HeaderHero from "../components/HeaderHero.vue";
</script>
<script>
export default {
  name: "HeaderMain",
  methods: {
    gohome() {
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <header>
    <div class="wrapper" @click="gohome">
      <div class="header">
        <span
          ><img
            alt="Vue logo"
            class="logo"
            src="http://localhost:1337/uploads/logo2_6c0df1b11b.png?updated_at=2022-12-31T13:01:51.747Z"
            width="125"
            height="125"
        /></span>
        <span><HeaderHero msg="Herbal Aid" /></span>
      </div>
    </div>
  </header>
</template>

<style>
.header:hover {
  cursor: pointer;
}
.wrapper {
  background-color: #f1f1f1;
  padding-top: 25px;
}
.header {
  display: flex;
  margin: auto;
  width: 50%;
  color: #315b6b;
  justify-content: center;
}
.header h1 {
  font-size: 3.5em;
  line-height: 0em;
}
</style>
