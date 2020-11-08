<template>
  <NavBar/>
  <message-form :messageAttr="getOnePost"/>
</template>
<script>
import MessageForm from "@/components/MessageForm";
import NavBar from "@/components/NavBar";
import {mapActions, mapGetters} from "vuex";
export default {
  components: {MessageForm, NavBar},
  data() {
    return {
      post: '',
    }
  },
  computed: mapGetters(["getOnePost"]),
  methods: {
    ...mapActions(["getPost"]),
  },
  mounted() {
    this.getPost(this.$route.params.id)
  }
}
</script>