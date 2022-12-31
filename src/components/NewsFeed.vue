<script>
export default {
  name: 'TheWelcome',
  data() {
    return {
      blogs: []
    }
  },
  methods: {
    getBlogs() {
      this.axios.get("http://localhost:1337/api/blogs?populate=*").then((response)=>{
        console.log(response.data)
        this.blogs = response.data.data
        console.log(response.data.data[0])
      })
    }
  },
  created() {
    this.getBlogs()
  }
}
</script>

<template>
  <h1 class="header">Content Page</h1>
  <div v-for="blog, index in blogs" class="contentpage"> 
    <h1>{{ blog.attributes.title }}</h1>
    <div v-html="blog.attributes.content"></div>
    <img :src="'http://localhost:1337'+blog.attributes.displayphoto.data.attributes.url" alt="">
    <div v-html="blog.attributes.sources"></div>
  </div>
</template>

<style>
.contentpage {
  margin: auto;
  width: 70%;
}
.header {
  margin: auto;
  text-align:center;
}
</style>