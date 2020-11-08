<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="/">Hooligram</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>


      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <!--<a class="nav-link" href="/post_create">Create post</a>-->
            <form class="form-inline ml-4">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            </form>
          </li>
        </ul>

        <div class="nav-items">
          <a class="nav-link" href="/">
            <i class="large material-icons">home</i>
          </a>
        </div>
        <div class="nav-items">
          <a class="nav-link" href="#">
            <i class="large material-icons">send</i>
          </a>
        </div>
        <div class="nav-items">
          <a class="nav-link" href="#">
            <i class="large material-icons">explore</i>
          </a>
        </div>
        <div class="nav-items">
          <a class="nav-link" href="#">
            <i class="large material-icons">favorite_border</i>
          </a>
        </div>

        <div class="nav-items">
          <div class="dropdown">
            <button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
              <img :src=getImgURL(user.userpick) class="ml-3 rounded-circle z-depth-0" alt="avatar image" height="35" width="35" style="border-radius: 50%">
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Profile</a>
              <a class="dropdown-item" href="/post_create">Create post</a>
              <a class="dropdown-item" href="#">Saved</a>
              <a class="dropdown-item" href="#">Settings</a>
              <a class="dropdown-item" href="#">Switch Accounts</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="/login" @click.prevent="logout">
                Log out
                <!--<i class="large material-icons">input</i> -->
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>


<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  computed: mapGetters(["getAuthUser"]),
  data(){
    return{
      user:''
    }
  },
  methods: {
    ...mapActions(['getUser']),
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    },
    getImgURL(itm) {
      return "http://localhost:8081/api/img/" + itm
    }
  },
  async mounted() {
    this.user = await this.getUser(localStorage.authId)
  }

}
</script>

<style scoped>
a {
  color: black; /* Цвет ссылок */
}

a:visited {
  color: black; /* Цвет посещенных ссылок */
}

a:active {
  color: black; /* Цвет активных ссылок */
}
</style>