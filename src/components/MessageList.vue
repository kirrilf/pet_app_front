<template>
  <div class="container mt-5">
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
  computed: mapGetters(["allPosts"]),
  methods: {
    ...mapActions(["fetchPosts"]),
  },
  async mounted() {
    await this.fetchPosts()
  },
}
</script>
