<template>
  <message-form :messageAttr="getOnePost"/>
</template>
<script>
import MessageForm from "@/components/MessageForm";
import {mapActions, mapGetters} from "vuex";
export default {
  components: {MessageForm},
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