<script>
export default {
  props: ['title', 'content', 'displayphoto', 'author'],
}
</script>
<template>
  <div class="content">
      <h1>{{ title }}</h1>
      <h3>{{ author }}</h3>
      <div v-html="content"></div>
      <img
        :src="
          'http://localhost:1337' + displayphoto
        "
        alt=""
      />
  </div>
</template>
<style scoped>
.content {
  width: 50%;
  margin: auto;
  border-color: #8dcac1;
  border-radius: 25px;
  border-style:solid;
  padding:10px 50px 10px 50px;
  background-color: #f1f1f1;
  color:#2a5b6b;
}
img {
  width:100%;
}
</style>