<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div class="card  my-5 center-block">
      <div class="card-header container">
        <div class="row">
          <img :src=getImgURL(user.userpick) class="ml-3 rounded-circle z-depth-0" alt="avatar image" height="35"
               width="35" style="border-radius: 50%">
          <h3 class="card-title col align-content-center"><a :href=profileLink>{{ user.username }}</a></h3>
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
                <button class="dropdown-item btn" @click="del">
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
      <div class="card-body">
        <img v-if="post.fileNames.length === 1" :src=getImgURL(post.fileNames[0]) class="rounded mx-auto d-block"
             alt="Post image">
        <splide :options="options" v-else>
          <splide-slide v-for="imgLink in post.fileNames" :key="imgLink">
            <img class="rounded mx-auto d-block" :src=getImgURL(imgLink) alt="slide">
          </splide-slide>
        </splide>

      </div>
      <div class="card-footer">

        <div class="d-flex justify-content-between">
          <div class="p-2">
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
          <div class="p-2"></div>
          <div class="p-2">
            <button class="btn">
              <i class="material-icons icon">turned_in_not</i>
            </button>
          </div>
        </div>

        <div class="m-2 container">
          <p class="card-text"><b>{{ user.username }}</b> {{ post.text }}</p>
        </div>

        <div class="container">
          <div v-if="this.commentUsers.length > 0" class="my-2">
            <i>View all comments</i>
          </div>
          <div v-for="(userI, index) in this.commentUsers">
            <div class="row my-1">
              <img :src=getImgURL(userI.userpick) class="ml-3 rounded-circle z-depth-0" alt="avatar image" height="35"
                   width="35" style="border-radius: 50%">
              <div class="my-1 mx-2">
                <b>{{ userI.username }}</b> {{ this.post.firstComments[index].text }}
              </div>
            </div>
          </div>
        </div>
        <hr>


        <form @submit.prevent="save">
          <div class="row-fluid">
            <div class="form-group">
              <div class="input-group">
                <input id="comment" type="text" class="form-control" placeholder="Add a comment" v-model="commentText">
                <button type="submit" class="btn btn-primary">Post</button>
              </div>
            </div>
          </div>
        </form>


      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {Splide, SplideSlide} from '@splidejs/vue-splide';


export default {
  props: ['post'],
  computed: mapGetters(["getOneUser"]),
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      options: {
        rewind: true,
      },
      commentUsers: [],
      user: '',
      commentText:'',
      canEdit: localStorage.authId == this.post.authorId,
      profileLink: "/profile/" + this.post.authorId
    }
  },
  methods: {
    ...mapActions(['deletePost', 'likePost', 'getUser', 'saveComment']),
    edit() {
      this.$router.push('/post_update/' + this.post.id)
    },
    del() {
      this.deletePost(this.post.id)
    },
    like() {
      this.likePost(this.post.id)
    },
    getImgURL(itm) {
      return "http://localhost:8081/api/img/" + itm
    },
    save(){
      let comment = {
        authorId: this.user.id,
        text: this.commentText,
        updateDate: new Date().getTime() / 1000
      }
      if(this.commentUsers.length > 2) {
        this.commentUsers.shift()
        this.commentUsers.push(this.user)
        this.post.firstComments.shift()
        this.post.firstComments.push(comment)
      }else {
        this.commentUsers.push(this.user)
        this.post.firstComments.push(comment)
      }
      const data = {
        comment, id:this.post.id
      }
      this.saveComment(data)
      this.commentText = ''

    }
  },
  async mounted() {
    this.user = await this.$store.dispatch('getUser', this.post.authorId)
    for (let i = 0; i < this.post.firstComments.length; i++) {
      this.commentUsers.push(await this.getUser(this.post.firstComments[i].authorId))
    }
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
  max-width: 1000px;
  max-height: 540px;
  display: block;
}

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