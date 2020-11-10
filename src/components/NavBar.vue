<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="/">Hooligram</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>


      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <ul class="navbar-nav mr-auto abs">
          <li class="nav-item">
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
              <a class="dropdown-item" :href=profileLink>
                <i class="material-icons icon">account_circle</i> &#160
                Profile
              </a>
              <a class="dropdown-item" href="/post_create">
                <i class="material-icons icon">create</i> &#160
                Create post
              </a>
              <a class="dropdown-item" href="#">
                <i class="material-icons icon">turned_in</i> &#160
                Saved
              </a>
              <a class="dropdown-item" href="#">
                <i class="material-icons icon">settings</i> &#160
                Settings
              </a>
              <a class="dropdown-item" href="#">
                <i class="material-icons icon">cached</i> &#160
                Switch Accounts
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="/login" @click.prevent="logout">
                Log out
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>


<script>
import {mapActions} from 'vuex'

export default {
  data(){
    return{
      user:'',
      profileLink: "/profile/"+localStorage.authId
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

.icon {
  position: relative;
  top: 5px;
  left: 5px;
}

</style>