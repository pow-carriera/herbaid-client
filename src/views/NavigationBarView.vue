<script setup>
import { routerKey, RouterLink } from "vue-router";
</script>

<script>
export default {
  data() {
    return {
      jwtBearer: "",
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log(this.username);
    },
    signup() {
      this.$router.push("/signup")
    }
  },
};
</script>

<template>
  <nav id="nav">
    <ul>
      <li>
        <div class="signon">
          <div>
            <input v-model="username" @keyup.enter="login()" />
            <input
            @keyup.enter="login()"
              type="password"
              v-model="password"
            />
          </div>
          <div>
            <button @click="login()" @keyup.enter="login()">Log In</button>
            <button @click="signup()">Sign Up</button>
          </div>
        </div>
      </li>
      <br />
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/directory">Herbal Directory</RouterLink></li>
      <li><RouterLink to="/doctors">Doc Support</RouterLink></li>
      <li><RouterLink to="/about">About Us</RouterLink></li>
    </ul>
  </nav>
</template>

<style scoped>

.signon {
  display: flex;
  align-items: center;
}
input {
  width: 130px;
  margin: 0px 5px 0px 5px;
  border-style: solid;
  border-radius: 15px;
  text-indent: 5px;
  border-color: #8dcac1;
}
button {
  padding: 5px;
  margin: 5px;
  background-color: #f1f1f1;
  border-color: #91cac2;
  border-style: solid;
  border-radius: 5px;
  color: #315b6b;
  transition: background-color 0.25s, color 0.25s;
}
button:hover {
  color: #f1f1f1;
  background-color: #315b6b;
  border-color: #91cac2;
  transition: background-color 0.25s, color 0.25s;
}
</style>
