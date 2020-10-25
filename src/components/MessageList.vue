<template>
  <div style="position: relative; width: 300px;">
    <message-form :messages="messages" :messageAttr="message"/>
    <message-row v-for="message in messages"
                 :key="message.id"
                 :message="message"
                 :editMessage="editMessage"
                 :deleteMessage="deleteMessage"
                 :messages="messages"/>
  </div>
</template>

<script>
import MessageRow from './MessageRow'
import MessageForm from './MessageForm'

export default {
  components: {
    MessageRow,
    MessageForm
  },
  data() {
    return {
      message: null,
      messages: null
    }
  },
  async mounted() {
    this.messages = await this.$store.dispatch('fetchPosts')
  },
  methods: {
    editMessage(message) {
      this.message = message
    },
    async deleteMessage(message) {
      let result = await this.$store.dispatch('deletePost', message.id)
      if(result === 200){
        this.messages.splice(this.messages.indexOf(message), 1)
      }
    }
  }
}
</script>
