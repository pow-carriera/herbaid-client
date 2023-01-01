<script setup>
import DirectoryFeedEntry from "./DirectoryFeedEntry.vue";
import DirectoryFeedTags from "./DirectoryFeedTags.vue";
</script>
<script>
export default {
  name: "NewsFeed",
  data() {
    return {
      entries: [],
      tags: []
    };
  },
  methods: {
    getEntries() {
      this.axios
        .get("http://localhost:1337/api/remedies")
        .then((response) => {
          this.entries = response.data.data;
        });
    },
    getTags() {
      this.axios
        .get("http://localhost:1337/api/tags")
        .then((response) => {
          this.tags = response.data.data
          console.log(response.data.data)
        })
    },
    getName(value) {
      console.log(value)
      this.axios
        .get("http://localhost:1337/api/remedies?filters[tags][name][$eq]="+value+"&populate=*")
        .then((response) => {
          this.entries = response.data.data;
        });
    },
    getTaggedEntries() {

    }
  },
  created() {
    this.getEntries();
    this.getTags();
  },
};
</script>

<template>
  <h1 class="articleheader">Remedies Directory</h1>
  <DirectoryFeedTags 
    v-for="(tag, index) in tags"
    :tagname="tag.attributes.name"
    @return-name="getName"
  />
  <DirectoryFeedEntry
    v-for="(entry, index) in entries"
    :key="index"
    :name="entry.attributes.name"
    :content="entry.attributes.content"
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
