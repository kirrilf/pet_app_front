<template>

  <div v-if="!loading">
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <button class="btn" @click="changeView">
          <i v-if="cardsOrPanel" class="material-icons icon">apps</i>
          <i v-else class="material-icons icon">view_day</i>
        </button>
      </li>
    </ul>


    <div v-if="!cardsOrPanel">
      <div class="container my-5">
        <div v-for="threePost in allUserPosts" class="card-deck mb-5">
          <div v-for="post in threePost" class="card card-img">
            <a @click="popUp(post)" data-toggle="modal" data-target="#staticBackdrop">
              <img class="card-img-top" :src=getImgURL(post.fileNames[0]) alt="Card image cap">
            </a>
          </div>
        </div>
      </div>

      <div class="modal fade" id="staticBackdrop" tabindex="-1" role="dialog" aria-labelledby="editFormLabel">
        <PopUp v-if="showPopUp" :post="post" :user="user" @destroyPopUp="destroyPopUp"/>
      </div>
    </div>
    <div v-else>
      <div class="container mt-5">
        <message-row v-for="post in allPosts"
                     :key="post.id"
                     :post="post"/>
      </div>
    </div>
  </div>

</template>


<script>
import {mapActions, mapGetters} from "vuex";
import PopUp from "./PopUp";
import MessageRow from "@/components/MessageRow";

export default {
  components: {
    PopUp, MessageRow
  },
  props: ['profileId'],
  data() {
    return {
      loading: true,
      cardsOrPanel: true,
      showPopUp: false,
      posts: [],
      post: '',
      user: '',
    }
  },
  computed: mapGetters(["allUserPosts", "allPosts"]),
  methods: {
    ...mapActions(['getAllUserPosts', 'getUser']),
    getImgURL(itm) {
      return "http://localhost:8081/api/img/" + itm
    },
    popUp(post) {
      this.post = post
      this.showPopUp = true
    },
    destroyPopUp() {
      this.showPopUp = false
    },
    changeView() {
      this.cardsOrPanel = !this.cardsOrPanel
    }
  },
  async mounted() {
    await this.getAllUserPosts(this.profileId)
    this.user = await this.getUser(this.profileId)
    this.loading = false
  }

}
</script>

<style scoped>

.card-img {
  max-height: 11.385em;
  max-width: 21.750em;
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

.btn:focus, .btn:active {
  outline: none !important;
  box-shadow: none !important;
}

</style>