<script setup>
import Entry from "./DoctorDirEntry.vue";
</script>
<script>
export default {
  data() {
    return {
      crewmembers: [],
    };
  },
  methods: {
    localeChange(locale) {
      this.locale = locale;
      console.log(this.locale);
      this.getArticles();
    },
    getDoctors() {
      this.axios
        .get("http://localhost:1337/api/crewmembers?populate=*", {
          headers: {
            authorization: localStorage.getItem("bearer"),
          },
        })
        .then((response) => {
          this.crewmembers = response.data.data;
          console.log(response);
        });
    },
  },
  created() {
    this.getDoctors();
  },
};
</script>

<template>
  <div class="articleheader">
    <h1>Meet our Staff!</h1>
  </div>
  <div class="container">
    <Entry
      v-for="(crew, index) in crewmembers"
      :key="index"
      :name="crew.attributes.name"
      :field="crew.attributes.field"
      :display-photo="crew.attributes.displayphoto.data.attributes.url"
      :description="crew.attributes.description"
    />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
.container {
  justify-content: center;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  width: 75%;
}
.articleheader {
  text-align: center;
  color: #2a5b6b;
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
</style>
