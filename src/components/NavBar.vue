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
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
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
         <!-- <a class="nav-link" href="/login" @click.prevent="logout">
            <i class="large material-icons">accessibility</i>
          </a>-->
          <div class="dropdown">
            <button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="large material-icons">account_circle</i>
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
export default {
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
i{
  color: black;
}

</style>