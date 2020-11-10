<template>

  <div v-if="loading">
    <div class="d-flex justify-content-center mt-3">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
  <div v-else>
    <div>
      <img :src=getImgURL(user.userpick) class="my-5 rounded-circle z-depth-0 userpick" alt="avatar image"
           height="166" width="166" style="border-radius: 50%">
    </div>
    <div v-if="!canEdit" class="d-flex justify-content-center">
      <div class="mt-5 p-2">
        <div class="row">
          <h2 class="mr-3">{{ user.username }}</h2>
          <button type="button" class="btn btn-light mr-2">Message</button>
          <button type="button" class="btn btn-light mr-2">Subscribe</button>
          <div class="dropdown mr-2">
            <button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
              <i class="material-icons">more_horiz</i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button class="dropdown-item btn">
                <i class="material-icons icon">content_copy</i> &#160
                Copy link
              </button>
              <button class="dropdown-item btn" style="color: red">
                <i class="material-icons icon">block</i> &#160
                Block
              </button>
              <button class="dropdown-item btn" style="color: red">
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
    </div>
    <div v-if="canEdit" class="d-flex justify-content-center">
      <div class="mt-5 p-2">
        <div class="row">
          <h2 class="mr-3">{{ user.username }}</h2>
          <button type="button" class="btn btn-light mr-2">
            <i class="material-icons">settings</i>
          </button>

        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <div class="p-2 row">
        <h4 class="mr-2"> 123 </h4> <h5 class="mr-3"> posts </h5>
        <h4 class="mr-2"> 456 </h4> <h5 class="mr-3">followers </h5>
        <h4 class="mr-2"> 789 </h4> <h5 class="mr-3">following </h5>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <div v-if="user.lastName && user.firstName" class="p-2 row">
        <h4 class="mr-2 name">{{ user.firstName }}</h4>
        <h4 class="mr-2 name">{{ user.lastName }}</h4>
      </div>
    </div>
  </div>
</template>


<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: ['profileId'],
  computed: mapGetters(["allPosts"]),
  data() {
    return {
      loading: true,
      user: '',
      canEdit: localStorage.authId == this.profileId,
    }
  },
  methods: {
    ...mapActions(['getUser', 'getAllUserPosts']),
    getImgURL(itm) {
      return "http://localhost:8081/api/img/" + itm
    }
  },
  async mounted() {
    this.user = await this.getUser(this.profileId)
    await this.getAllUserPosts(this.profileId)
    this.loading = false
  }
}
</script>

<style scoped>
.userpick {
  position: absolute;
  top: 4em;
  left: 13em;
}

.icon {
  position: relative;
  top: 5px;
  left: 5px;
}

.name {
  text-transform: capitalize;
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

</style>