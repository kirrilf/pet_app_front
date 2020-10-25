ra<template>
  <form class="form" @submit.prevent="submitHandler">
    <input type='text' v-model='username'/> <br>
    <input type='text' v-model='firstName'/><br>
    <input type='text' v-model='lastName'/><br>
    <input type='email' v-model='email'/><br>
    <input type='password' v-model='password'/><br>
    <button type="submit">Sign up</button>
  </form>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  }),
  methods: {
    async submitHandler() {
      const registerData = {
        "username": this.username,
        "firstName": this.firstName,
        "lastName": this.lastName,
        "email": this.email,
        "password": this.password
      }
      await this.$store.dispatch('register', registerData)
      await this.$router.push('login')
    }
  }

}
</script>
