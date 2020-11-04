<template>
  <div style="position: relative; width: 300px;">
    <message-form :messageAttr="post"/>
    <message-row v-for="post in allPosts"
                 :key="post.id"
                 :editPost="editPost"
                 :post="post"/>

  </div>
</template>

<script>
import MessageRow from './MessageRow'
import MessageForm from './MessageForm'
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    MessageRow,
    MessageForm
  },
  data() {
    return {
      post: null
    }
  },
  computed:mapGetters(["allPosts"]),
  methods: {
    ...mapActions(["fetchPosts"]),
    editPost(post) {
      this.post = post
    }
  },
  async mounted() {
    this.fetchPosts()
  },


}
</script>
