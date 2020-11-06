<template>
  <div class="container-fluid d-flex h-100 justify-content-center align-items-center p-0 my-3">
    <div class="row bg-white shadow-sm">
      <div class="col border rounded p-4">
        <h3 class="text-center mb-4">Hooligram</h3>
        <form @submit.prevent="submitHandler">
          <div class="form-group">
            <label for="inputUserName">Username</label>
            <input type="text" class="form-control" id="inputUserName" v-model='username'>
          </div>
          <div class="form-group">
            <label for="inputPassword">Password</label>
            <input type="password" class="form-control" id="inputPassword" v-model='password'>
          </div>
          <button type="submit" class="btn btn-primary w-100">Log in</button>
        </form>
        <div class="text m-2">
          Don't have an account? <a href="/register">Sign up</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: ''
  }),
  methods: {
    async submitHandler() {
      const formData = {
        username: this.username,
        password: this.password
      }
      await this.$store.dispatch('login', formData)
      await this.$router.push('/')
    }
  }

}
</script>
