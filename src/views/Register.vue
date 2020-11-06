<template>
  <div class="container-fluid d-flex h-100 justify-content-center align-items-center p-0 my-3">
    <div class="row bg-white shadow-sm">
      <div class="col border rounded p-4">
        <h2 class="text-center mb-4">Hooligram</h2>
        <h5 class="text-center mb-4"><i>Sign up to see photos and <br> videos from your friends.</i></h5>
        <form @submit.prevent="submitHandler">
          <div class="form-group">
            <label for="inputUserName">Username</label>
            <input type="text" class="form-control" id="inputUserName" v-model='username'>
          </div>
          <div class="form-group">
            <label for="inputEmail">Email address</label>
            <input type="email" class="form-control" id="inputEmail" v-model='email'>
          </div>
          <div class="form-group">
            <label for="inputFirstName">FirstName</label>
            <input type="text" class="form-control" id="inputFirstName" v-model='firstName'>
          </div>
          <div class="form-group">
            <label for="inputLastName">LastName</label>
            <input type="text" class="form-control" id="inputLastName" v-model='lastName'>
          </div>
          <div class="form-group">
            <label for="inputPassword">Password</label>
            <input type="password" class="form-control" id="inputPassword" v-model='password'>
          </div>
          <div class="text my-3">
            By signing up, you agree to our <a href="#">Terms</a>,<a href="#">Data Policy</a> and <a href="#">Cookies Policy</a>.
          </div>
          <button type="submit" class="btn btn-primary w-100">Sign up</button>
        </form>
        <div class="text m-2">
          Have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  </div>


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
