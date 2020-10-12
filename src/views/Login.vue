<template>
  <form class="form" @submit.prevent="submitHandler">
    <input type='text' v-model='username'/> <br>
    <input type='password' v-model='password'/><br>
    <button type="submit">Log in</button>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data:()=>({
    username:'',
    password:''
  }),
  methods:{
    async submitHandler(){
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
