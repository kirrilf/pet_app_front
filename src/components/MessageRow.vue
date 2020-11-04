<template>
  <div>
    {{ post.text }} Likes: {{post.count}}
      <span>
              <input type="button" value="Edit" @click="edit" />
              <input type="button" value="X" @click="del" />
              <input type="button" value="Like" @click="like" />
      </span>
      <img v-if="post.fileName" :src=imgLink>


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
  watch:{
    post(){
      this.imgLink = "http://localhost:8081/api/img/" + this.post.fileName
    }
  },
  methods: {
    ...mapActions(['deletePost', 'likePost']),
    edit() {
      this.editPost(this.post)
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
