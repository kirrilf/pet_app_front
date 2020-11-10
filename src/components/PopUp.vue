<template>
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header justify-content-start">
        <div class="row">
          <img :src=getImgURL(user.userpick) class="ml-3 rounded-circle z-depth-0" alt="avatar image" height="35"
               width="35" style="border-radius: 50%">
          <h3 class="card-title col align-content-center">{{ user.username }}</h3>
        </div>
        <div class="ml-auto">
          <div class="dropdown">
            <button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
              <i class="material-icons">more_horiz</i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div v-if="canEdit">
                <button class="dropdown-item btn" @click="edit">
                  <i class="material-icons icon">edit</i> &#160
                  Edit
                </button>
                <button class="dropdown-item btn" data-dismiss="modal" aria-label="Close"  @click="del">
                  <i class="material-icons icon">delete</i> &#160
                  Delete
                </button>
              </div>
              <button class="dropdown-item btn">
                <i class="material-icons icon">content_copy</i> &#160
                Copy link
              </button>
              <button class="dropdown-item btn">
                <i class="material-icons icon">report</i> &#160
                Report
              </button>
              <button class="dropdown-item btn">
                <i class="material-icons icon">cancel</i> &#160
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <img v-if="post.fileNames.length === 1" :src=getImgURL(post.fileNames[0]) class="rounded mx-auto d-block"
             alt="Post image">
        <splide :options="options" v-else>
          <splide-slide v-for="imgLink in post.fileNames" :key="imgLink">
            <img class="rounded mx-auto d-block" :src=getImgURL(imgLink) alt="slide">
          </splide-slide>
        </splide>
        <div class="m-2">
          <p class="card-text">{{ post.text }}</p>
        </div>
      </div>
      <div class="modal-footer justify-content-start">
        <div class="row">
          <button class="btn" @click="like">
            <i v-if="post.meLiked" class="material-icons icon">favorite</i>
            <i v-else class="material-icons icon">favorite_border</i>
              {{ post.count }}
          </button>
          <button class="btn">
            <i class="material-icons icon">chat_bubble</i>
          </button>
          <button class="btn">
            <i class="material-icons icon">send</i>
          </button>
        </div>

        <div class="ml-auto">
          <button class="btn">
            <i class="material-icons icon">turned_in_not</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import {Splide, SplideSlide} from "@splidejs/vue-splide";
import {mapActions} from "vuex";

export default {
  props: ['post', 'user'],
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      canEdit: false,
      profileLink: ''
    }
  },
  methods: {
    ...mapActions(['deletePost', 'likePost']),
    edit() {
      this.$router.push('/post_update/' + this.post.id)
    },
    del() {
      this.deletePost(this.post.id)
    },
    like() {
      this.likePost(this.post.id)
      if (this.post.meLiked) {
        this.post.count--
        this.post.meLiked = false
      } else {
        this.post.count++
        this.post.meLiked = true
      }

    },
    getImgURL(itm) {
      return "http://localhost:8081/api/img/" + itm
    }
  },
  mounted() {
    this.canEdit = localStorage.authId == this.post.authorId
    this.profileLink = "/profile/" + this.post.authorId
  },
  destroyed() {
    this.$emit('destroyPopUp')
  }


}
</script>

<style scoped>
.btn:focus, .btn:active {
  outline: none !important;
  box-shadow: none !important;
}

img {
  width: auto;
  max-width: 767px;
  max-height: 540px;
  display: block;
}
</style>