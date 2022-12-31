<script setup>
import NewsFeedArticle from './NewsFeedArticle.vue'
</script>
<script>
export default {
  name: "NewsFeed",
  data() {
    return {
      blogs: [],
    };
  },
  props: ['title', 'content', 'displayphoto'],
  methods: {
    getBlogs() {
      this.axios
        .get("http://localhost:1337/api/blogs?populate=*")
        .then((response) => {
          console.log(response.data);
          this.blogs = response.data.data;
          console.log(response.data.data[0]);
        });
    },
  },
  created() {
    this.getBlogs();
  },
};
</script>

<template>
  <h1 class="articleheader">Articles</h1>
  <NewsFeedArticle v-for="(blog, index) in blogs" 
            class="contentpage" 
            :key="index"
            :title="blog.attributes.title"
            :author="blog.attributes.author"
            :content="blog.attributes.content"
            :displayphoto="blog.attributes.displayphoto.data.attributes.url"
  />
</template>

<style>
.articleheader {
  text-align: center;
  font-size: 3em;
  color: #2a5b6b;
}
</style>
