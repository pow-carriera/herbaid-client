<script>
export default {
  props: ["name", "content", "displayPhoto", "tags"],
};
</script>

<template>
  <div class="content">
    <div class="titlecontainer">
      <div class="displayphoto">
        <!-- <img
          class="article-image"
          :src="'http://localhost:1337' + displayPhoto"
          alt="article_image"
        /> -->
      </div>
      <div class="titletext">
        <h1>{{ name }}</h1>
      </div>
    </div>
    <div v-html="content"></div>
  </div>
</template>

<style scoped>
h3 {
  display: inline;
}
.titlebar {
  display: inline;
}
.article-image {
  width: 75px;
  height: 75px;
}
.content {
  width: 50%;
  margin: auto;
  border-color: #8dcac1;
  border-radius: 25px;
  border-style: solid;
  padding: 20px 50px 20px 50px;
  background-color: #f1f1f1;
  color: #2a5b6b;
  margin-bottom: 25px;
  margin-top: 50px;
}
img {
  width: 100%;
  border-radius: 50%;
  border-style: solid;
  border-color: #2a5b6b;
}
.titlecontainer {
  display: flex;
  align-items: center;
}
.titletext {
  margin-left: 20px;
}
</style>
