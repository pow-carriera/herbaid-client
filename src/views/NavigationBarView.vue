<script setup>
import { RouterLink } from "vue-router";
import Swal from "sweetalert2";
</script>

<script>
export default {
  data() {
    return {
      jwtBearer: localStorage.getItem("bearer"),
      authdetails: false,
      username: localStorage.getItem("username"),
      password: "",
    };
  },
  methods: {
    login() {
      console.log(this.username);
      this.axios
        .post("http://localhost:1337/api/auth/local/", {
          identifier: this.username,
          password: this.password,
        })
        .then((response) => {
          this.jwtBearer = response.data.jwt;
          localStorage.setItem("username", this.username);
          localStorage.setItem("bearer", this.jwtBearer);
          console.log(localStorage.getItem("bearer"));
          this.authdetails = false;
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            title: "Error!",
            text: "Wrong username or password",
            icon: "error",
          });
        });
    },
    signup() {
      this.$router.push("/signup");
    },
    logout() {
      localStorage.setItem("bearer", null);
      this.jwtBearer = null;
      this.authdetails = true;
      window.location.reload();
    },
  },
  created() {
    if (this.jwtBearer == "null") {
      this.authdetails = true;
    } else {
      this.authdetails = false;
    }
  },
};
</script>

<template>
  <div class="bgcolor">
    <div class="signon" v-if="authdetails">
      <div>
        <input v-model="username" @keyup.enter="login()" />
        <input @keyup.enter="login()" type="password" v-model="password" />
      </div>
      <div>
        <button @click="login()" @keyup.enter="login()">Log In</button>
        <button @click="signup()">Sign Up</button>
      </div>
    </div>
    <div class="signon" v-else>
      <div>Welcome {{ username }}</div>
      <div>
        <button @click="logout()">Log Out</button>
      </div>
    </div>
    <nav id="nav">
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/directory">Herbal Directory</RouterLink></li>
        <li><RouterLink to="/doctors">Doc Support</RouterLink></li>
        <li><RouterLink to="/about">About Us</RouterLink></li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.bgcolor {
  background-color: #f1f1f1;
}
.signon {
  color: #315b6b;
  display: flex;
  align-items: center;
  text-align: center;
  width: auto;
  justify-content: center;
  margin: auto;
  background-color: #f1f1f1;
}
input {
  width: 130px;
  margin: 0px 5px 0px 5px;
  border-style: solid;
  border-radius: 15px;
  text-indent: 5px;
  border-color: #8dcac1;
  outline: none;
  transition: border-color 0.25s;
}
input:focus {
  border-color: #315b6b;
  transition: border-color 0.25s;
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
