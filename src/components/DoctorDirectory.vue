<script setup>
import Entry from "../components/DoctorDirEntry.vue";
</script>
<script>
export default {
  data() {
    return {
      doctors: [],
    };
  },
  methods: {
    getDoctors() {
      this.axios
        .get("http://localhost:1337/api/doctors?populate=*")
        .then((response) => {
          this.doctors = response.data.data;
          console.log(response.data.data);
        });
    },
  },
  created() {
    this.getDoctors();
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
  <div class="articleheader">
    <h1>Doctors' Directory</h1>
  </div>
  <div class="container">
    <Entry
      v-for="(doctor, index) in doctors"
      :key="index"
      :name="doctor.attributes.name"
      :field="doctor.attributes.field"
      :display-photo="doctor.attributes.displayPhoto.data.attributes.url"
      :description="doctor.attributes.description"
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
