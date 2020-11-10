<template>
  <div v-if="loading">
    <div class="d-flex justify-content-center mt-3">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
  <div v-else class="container mt-5">
    <message-row v-for="post in allPosts"
                 :key="post.id"
                 :post="post"/>
  </div>
</template>

<script>
import MessageRow from './MessageRow'
import {mapGetters, mapActions} from 'vuex'

export default {
  components: {
    MessageRow,
  },
  data(){
    return{
      loading:true
    }
  },
  computed: mapGetters(["allPosts"]),
  methods: {
    ...mapActions(["fetchPosts"]),
  },
  async mounted() {
    await this.fetchPosts()
    this.loading = false
  },
}
</script>
