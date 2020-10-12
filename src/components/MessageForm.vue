<template>
  <div>
    <input type="text" placeholder="Write something" v-model="text"/>
    <input type="button" value="Save" @click="save"/>
  </div>
</template>

<script>

function getIndex(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return i
    }
  }
  return -1
}

export default {
  props: ['messages', 'messageAttr'],
  data: () => ({
    text: '',
    id: ''
  }),
  watch: {
    messageAttr(newVal) {
      this.text = newVal.text
      this.id = newVal.id
    }
  },
  methods: {
    async save() {
      const post = {text: this.text}
      if (this.id) {
        post.id = this.id
        let data = await this.$store.dispatch('updatePost', post)
        const index = getIndex(this.messages, data.id)
        this.messages.splice(index, 1, data)
        this.text = ''
        this.id = ''
      } else {
        let data = await this.$store.dispatch('savePost', post)
        this.messages.push(data)
        this.text = ''

      }
    }
  },
}
</script>
