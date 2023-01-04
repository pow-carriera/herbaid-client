<script>
export default {
  props: ["name", "field", "description", "displayPhoto"],
};
</script>

<template>
  <div class="card">
    <div class="doctorprofile">
      <img
        :src="'http://localhost:1337' + displayPhoto"
        alt=""
        class="displayphoto"
      />
      <div class="titular">
        <h2 class="doctorname">{{ name }}</h2>
        <span>{{ field }}</span>
      </div>
    </div>
    <div class="desc">Description:</div>
    <div class="data">
      {{ description }}
    </div>
  </div>
</template>

<style scoped>
.card {
  border-style: solid;
  width: 400px;
  height: 250px;
  margin: 20px;
  border-color: #8dcac1;
  border-radius: 25px;
  background-color: #f1f1f1;
  color: #2a5b6b;
}
.doctorprofile {
  display: flex;
  align-items: center;
  margin: 15px;
  text-align: center;
  left: 0;
  right: 0;
}
.displayphoto {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  border-style: solid;
}
.titular {
  width: calc(100% - 30px);
}
.doctorname {
  padding: 0px;
  width: 100%;
}
.desc,
.data {
  margin: 0px 15px 0px 15px;
}
.desc {
  font-weight: bold;
  margin-bottom: 10px;
}
.data {
  height: 70px;
  width: calc(100% - 30px - 15px);
  margin-bottom: 15px;
  overflow: auto;
  border-style: solid;
  border-width: 2px;
  border-color: #8dcac1;
  padding: 5px;
}
h2 {
  line-height: 0px;
}
/* Non-standard */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #8dcac1;
}
::-webkit-scrollbar-thumb:hover {
  background: #315b6b;
}
</style>
