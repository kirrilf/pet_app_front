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
              <button class="dropdown-item btn" @click="edit">Edit</button>
              <button class="dropdown-item btn" @click="del">Delete</button>
              <button class="dropdown-item btn">Copy link</button>
              <button class="dropdown-item btn">Report</button>
              <button class="dropdown-item btn">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <img v-if="imgLinks.length === 1" :src=imgLinks[0] class="rounded mx-auto d-block" alt="Post image">
        <splide :options="options" v-else>
          <splide-slide v-for="imgLink in imgLinks" :key="imgLink">
            <img class="rounded mx-auto d-block" :src=imgLink alt="slide">
          </splide-slide>
        </splide>
        <div class="m-2">
          <p class="card-text">{{ post.text }}</p>
        </div>
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
import { Splide, SplideSlide } from '@splidejs/vue-splide';
export default {
  props: ['post', 'editPost'],
  data() {
    return {
      imgLinks: this.post.fileNames.map(itm=>"http://localhost:8081/api/img/"+itm)
    }
  },
  components: {
    Splide,
    SplideSlide,
  },
  watch: {
    post() {
      this.imgLinks = this.post.fileNames.map(itm=>"http://localhost:8081/api/img/"+itm)
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
img{
  width: auto;
  max-width: 1000px;
  max-height: 540px;
  display: block;
}

</style>