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
      tags: [],
      isempty: Boolean,
      sort: String,
    };
  },
  methods: {
    getEntries() {
      this.axios.get("http://localhost:1337/api/remedies").then((response) => {
        this.entries = response.data.data;
      });
    },
    getEntriesFil() {
      this.axios
        .get("http://localhost:1337/api/remedies/?locale=fil")
        .then((response) => {
          this.entries = response.data.data;
        });
    },
    getTags() {
      this.axios.get("http://localhost:1337/api/tags").then((response) => {
        this.tags = response.data.data;
        console.log(response.data.data);
      });
    },
    getTaggedEntries(value) {
      console.log(value);
      this.axios
        .get(
          "http://localhost:1337/api/remedies?filters[tags][name][$eq]=" +
            value +
            "&populate=*"
        )
        .then((response) => {
          this.entries = response.data.data;
        });
    },
    getTaggedEntries() {},
  },
  created() {
    this.getTags(this.sort);
    this.getEntries();
  },
};
</script>

<template>
  <div class="locales">
    <h4>Language</h4>
    <button class="localebutton" @click="getEntries">English</button>
    <button class="localebutton" @click="getEntriesFil">Filipino</button>
  </div>
  <h1 class="articleheader">Remedies Directory</h1>
  <div class="tagbuttons">
    <h2>Search by Category</h2>
    <DirectoryFeedTags 
      class="tagbutton specialtag"
      :tagname="'all remedies'"
      @return-name="getEntries"  
    />
    <DirectoryFeedTags
      class="tagbutton"
      v-for="(tag, index) in tags"
      :tagname="tag.attributes.name"
      @return-name="getTaggedEntries"
    />
  </div>
  <div class="feed" v-if="!entries.length">
    <p>Sorry, we can't find anything here.</p>
  </div>
  <div class="feed" v-else>
    <DirectoryFeedEntry
      v-for="(entry, index) in entries"
      :key="index"
      :name="entry.attributes.name"
      :content="entry.attributes.content"
      />
  </div>
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
h2,
h4 {
  color: #315b6b;
  line-height: 0;
}
.tagbuttons {
  margin: auto;
  width: 60%;
}
.tagbutton {
  padding: 5px;
  margin: 5px;
  background-color: #f1f1f1;
  border-color: #91cac2;
  border-style: solid;
  border-radius: 5px;
  color: #315b6b;
  transition: background-color 0.25s, color 0.25s;
}
.specialtag {
  font-weight:bold;
}
.tagbutton:hover {
  color: #f1f1f1;
  background-color: #315b6b;
  border-color: #91cac2;
  transition: background-color 0.25s, color 0.25s;
}
.locales,
.tagbuttons {
  text-align: center;
  margin-top: 16px;
}
h1 {
  margin-top: 50px;
  margin-bottom: 50px;
  line-height: 0;
}
.articleheader {
  text-align: center;
  font-size: 3em;
  color: #2a5b6b;
}
</style>
