<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div class="card  my-3 center-block">
      <div class="card-header container">
        <div class="row">
          <h5 class="card-title col align-content-center">Author ID: {{ post.authorId }}</h5>
          <div class="dropdown">
            <button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="material-icons">more_horiz</i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" @click="edit">Edit</a>
              <a class="dropdown-item" @click="del">Delete</a>
              <a class="dropdown-item" href="#">Copy link</a>
              <a class="dropdown-item" href="#">Report</a>
              <a class="dropdown-item" href="#">Cancel</a>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">

        <img v-if="post.fileName" :src=imgLink class="rounded mx-auto d-block  w-100" alt="Post image">
        <div class="m-2">
          <p class="card-text">{{ post.text }}</p>
        </div>


        <!--<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src="https://cdn.fishki.net/upload/post/201404/14/1260695/1_lfsxuww.jpg" alt="Первый слайд">
            </div>
            <div class="carousel-item">
              <img class="d-block w-100"  src="https://cdn.fishki.net/upload/post/201404/14/1260695/1_lfsxuww.jpg" alt="Второй слайд">
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="https://cdn.fishki.net/upload/post/201404/14/1260695/1_lfsxuww.jpg" alt="Третий слайд">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>-->




      </div>
      <div class="card-footer">
        <div class="row">
          <button class="btn" @click="like">
            <i v-if="post.meLiked" class="material-icons">favorite</i>
            <i v-else class="material-icons">favorite_border</i>
          </button>
          <button class="btn">
            <i class="material-icons">chat_bubble</i>
          </button>
          <button class="btn">
            <i class="material-icons">send</i>
          </button>
        </div>
        <div>
          {{ post.count }} likes {{ post.id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: ['post', 'editPost'],
  data() {
    return {
      imgLink: "http://localhost:8081/api/img/" + this.post.fileName
    }
  },
  watch: {
    post() {
      this.imgLink = "http://localhost:8081/api/img/" + this.post.fileName
    }
  },
  methods: {
    ...mapActions(['deletePost', 'likePost']),
    edit() {
      this.$router.push('/post_update/'+this.post.id)
    },
    del() {
      this.deletePost(this.post.id)
    },
    like() {
      this.likePost(this.post.id)
    }
  }
}
</script>

<style>
.btn:focus, .btn:active {
  outline: none !important;
  box-shadow: none !important;
}

</style>