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
      this.axios.get("http://localhost:1337/api/doctors?populate=*").then((response) => {
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
  <h1>Doctors' Directory</h1>
  <div class="container">
    <Entry v-for="(doctor, index) in doctors" :name="doctor.attributes.name"
    :field="doctor.attributes.field"
    :display-photo="doctor.attributes.displayPhoto.data.attributes.url"
    :description="doctor.attributes.description"/>
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
</style>
