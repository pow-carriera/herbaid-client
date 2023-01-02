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
      sort: '',
      selectedTag: 'name'
    };
  },
  methods: {
    getEntries() {
      this.axios.get("http://localhost:1337/api/remedies?sort=name").then((response) => {
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
    getTags(sort) {
      this.axios
        .get("http://localhost:1337/api/tags?sort=" + sort + "")
        .then((response) => {
          this.tags = response.data.data;
        });
    },
    getTaggedEntries(value) {
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
  },
  created() {
    this.getTags("name");
    this.getEntries();
  }
};
</script>

<template>
  <div class="locales">
    <h4>Language</h4>
    <button class="localebutton" @click="getEntries">English</button>
    <button class="localebutton" @click="getEntriesFil">Filipino</button>
  </div>
  <h1 class="articleheader">Remedies Directory</h1>
  <h2>Search by Category</h2>
  <div class="tagbuttons">
    <div>
      <p>
        Category Sort:
        <select name="tags" id="tags" v-model="selectedTag">
          <option value="name">alphabetical (ascending)</option>
          <option value="name:desc">alphabetical (descending)</option>
          <option value="frequency:desc">more frequent</option>
          <option value="frequency:asc">more rare</option>
          <option value="name">harsher</option>
          <option value="name">milder</option>
        </select>
        <button class="sortbutton" @click="getTags(selectedTag)">Sort</button>
      </p>
    </div>
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
h2 {
  text-align: center;
}
select {
  background-color: #f1f1f1;
  border-radius:5px;
  border-color: #91cac2;
  color: #315b6b;
  width: 250px;

}
option {
  background-color: #f1f1f1;
  border-radius:5px;
  border-color: #91cac2;
  color: #315b6b;
}
.sortbutton {
  border-color: #91cac2;
  border-style:solid;
  background-color: #f1f1f1;
  color: #315b6b;
  margin-left: 10px;
  border-radius:5px;
  transition: background-color 0.25s, color 0.25s;
}
.sortbutton:hover {
  border-color: #91cac2;
  border-style:solid;
  color: #f1f1f1;
  background-color: #315b6b;
  margin-left: 10px;
  transition: background-color 0.25s, color 0.25s;
  cursor:pointer;
  border-radius:5px;
}
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
p {
  color: #315b6b;
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
.specialtag {
  font-weight: bold;
}
.tagbutton {
  padding: 5px;
  margin: 5px;
  background-color: #f1f1f1;
  border-color: #91cac2;
  border-style: solid;
  border-radius: 5px;
  color: #315b6b;
  transition: background-color 0.25s, color 0.25s, margin-left 0.25s, margin-right 0.25s;
}
.tagbutton:hover {
  color: #f1f1f1;
  background-color: #315b6b;
  border-color: #91cac2;
  transition: background-color 0.25s, color 0.25s, margin-left 0.25s, margin-right 0.25s;
  margin-left: 15px;
  margin-right: 15px;
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
