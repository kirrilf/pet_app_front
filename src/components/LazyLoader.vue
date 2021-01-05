<template>
  <span></span>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LazyLoader',
  methods: mapActions(['fetchPosts']),
  mounted() {
    window.onscroll = () => {
      const el = document.documentElement
      const isBottomOfScreen = el.scrollTop + window.innerHeight === el.offsetHeight
      if (isBottomOfScreen) {
        this.fetchPosts()
      }
    }
  },
  beforeDestroy() {
    window.onscroll = null
  }
}
</script>

<style scoped>
</style>