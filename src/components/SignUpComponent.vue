<script setup>
import Swal from "sweetalert2";
</script>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      gender: "",
    };
  },
  methods: {
    clearForm() {
      this.username = "";
      this.password = "";
      this.email = "";
      this.firstname = "";
      this.lastname = "";
      this.gender = "";
    },
    submitInfo() {
      this.axios
        .post("http://localhost:1337/api/auth/local/register", {
          username: this.username,
          password: this.password,
          email: this.email,
          firstName: this.firstname,
          lastName: this.lastname,
          gender: this.gender,
        })
        .then((response) => {
          console.log(response.data);
        });
    },
    validateData() {
      if (!this.username.length) {
        Swal.fire({
          title: "Username",
          text: "Please type in your username!",
          icon: "warning",
        });
      } else if (this.username.length < 4) {
        Swal.fire({
          title: "Username",
          text: "Your username is too short!",
          icon: "warning",
        });
      } else if (this.username.length > 32) {
        Swal.fire({
          title: "Username",
          text: "Your username is too long!",
          icon: "warning",
        });
      } else if (!this.password.length) {
        Swal.fire({
          title: "Password",
          text: "Please enter your password.",
          icon: "warning",
        });
      } else if (this.password.length < 4) {
        Swal.fire({
          title: "Password",
          text: "Your password is too short!",
          icon: "warning",
        });
      } else if (this.password.length > 64) {
        Swal.fire({
          title: "Password",
          text: "Your password is too long!",
          icon: "warning",
        });
      } else if (!this.firstname.length || !this.lastname.length) {
        Swal.fire({
          title: "Introduce Yourself",
          text: "Please complete your name",
          icon: "warning",
        });
      } else {
        this.submitInfo();
      }
    },
    queueSubmit() {
      this.validateData();
    },
  },
};
</script>

<template>
  <h1 class="articleheader">Sign Up</h1>
  <div class="signupcard">
    <p class="detail"><b>Credentials</b></p>
    <p>User Name:</p>
    <input v-model="username" type="text" placeholder="User Name" />
    <p>Password:</p>
    <input v-model="password" type="password" placeholder="Password" />
    <p class="detail"><b>User Details</b></p>
    <p>E-mail:</p>
    <input v-model="email" type="text" placeholder="juandelacruz@mail.ph" />
    <p>First Name:</p>
    <input v-model="firstname" type="text" placeholder="First Name" />
    <p>Last Name:</p>
    <input v-model="lastname" type="text" placeholder="Last Name" />
    <p>Gender:</p>
    <input v-model="gender" type="text" placeholder="Male/Female (Optional)" />
    <div class="wrapper">
      <button class="btn-signup" @click="queueSubmit()">Submit</button>
      <button class="btn-signup" @click="clearForm()">Clear</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
}
p {
  line-height: 0.5px;
}
.btn-signup {
  padding: 5px;
  margin: 5px;
  background-color: #f1f1f1;
  border-color: #91cac2;
  border-style: solid;
  border-radius: 5px;
  color: #315b6b;
  transition: background-color 0.25s, color 0.25s, width 0.4s;
  width: 40%;
  margin: auto;
  justify-content: center;
  align-items: center;
}
button:hover {
  color: #f1f1f1;
  background-color: #315b6b;
  border-color: #91cac2;
  transition: background-color 0.25s, color 0.25s, width 0.4s;
  width: 50%;
}
.detail {
  text-align: center;
  line-height: 0;
}
.articleheader {
  text-align: center;
  color: #2a5b6b;
}
input {
  height: 25px;
  border-style: solid;
  border-radius: 10px;
  text-indent: 5px;
  border-color: #8dcac1;
  transition: border-color 0.25s;
}
input:focus {
  border-color: #2a5b6b;
  outline: none;
  transition: border-color 0.25s;
}
.signupcard {
  margin: auto;
  width: 600px;
  height: auto;
  border-style: solid;
  border-radius: 25px;
  padding: 10px;
  display: grid;
  line-height: 10px;
  padding-bottom: 50px;
  background-color: #f1f1f1;
  color: #2a5b6b;
  border-color: #8dcac1;
}
</style>
