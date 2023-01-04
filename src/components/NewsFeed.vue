<script setup>
import NewsFeedArticle from "./NewsFeedArticle.vue";
</script>
<script>
export default {
  name: "NewsFeed",
  data() {
    return {
      blogs: [],
      translation: {},
      locale: "en",
    };
  },
  methods: {
    localeChange(locale) {
      this.locale = locale;
      console.log(this.locale);
    },
    getArticles() {
      this.axios
        .get("http://localhost:1337/api/news-feed?locale=" + this.locale + "")
        .then((response) => {
          this.translation = response.data.data.attributes;
        });
      this.axios
        .get(
          "http://localhost:1337/api/blogs?sort=createdAt%3Adesc&locale=" +
            this.locale +
            "&populate=displayphoto"
        )
        .then((response) => {
          this.blogs = response.data.data;
        });
    },
  },
  created() {
    this.getArticles();
  },
};
</script>

<template>
  <div class="locales">
    <h4>Language</h4>
    <button class="localebutton" @click="localeChange('en'), getArticles()">
      English
    </button>
    <button class="localebutton" @click="localeChange('fil'), getArticles()">
      Filipino
    </button>
  </div>
  <h1 class="articleheader">{{ translation.hero }}</h1>
  <NewsFeedArticle
    v-for="(blog, index) in blogs"
    class="contentpage"
    :key="index"
    :title="blog.attributes.title"
    :author="blog.attributes.author"
    :content="blog.attributes.content"
    :display-photo="blog.attributes.displayphoto.data.attributes.url"
    :last-update="blog.attributes.createdAt"
  />
</template>

<style scoped>
.localebutton {
  padding: 5px;
  margin: 5px;
  background-color: #f1f1f1;
  border-color: #91cac2;
  border-style: solid;
  border-radius: 5px;
  color: #315b6b;
  transition: background-color 0.25s, color 0.25s;
}
h4 {
  color: #315b6b;
  line-height: 0;
}
.localebutton:hover {
  color: #f1f1f1;
  background-color: #315b6b;
  border-color: #91cac2;
  transition: background-color 0.25s, color 0.25s;
}
.locales {
  text-align: center;
}
h1 {
  margin-top: 50px;
  line-height: 0px;
}
.articleheader {
  text-align: center;
  font-size: 3em;
  color: #2a5b6b;
}
</style>
