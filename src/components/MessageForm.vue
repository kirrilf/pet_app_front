<template>
  <div>
    <input type="text" placeholder="Write something" v-model="text"/>
    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
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
    id: '',
  }),
  watch: {
    messageAttr(newVal) {
      this.text = newVal.text
      this.id = newVal.id
    }
  },
  methods: {
    async save() {
      let formData = new FormData();
      formData.append('text', this.text)
      if (this.id) {
        formData.append('id', this.id)
        if(this.file != null){
          formData.append('file', this.file)
        }
        let data = await this.$store.dispatch('updatePost', formData)
        const index = getIndex(this.messages, data.id)
        this.messages.splice(index, 1, data)
        this.text = ''
        this.id = ''
        this.file = ''
      } else {

        if(this.file != null){
          formData.append('file', this.file)
        }

        let data = await this.$store.dispatch('savePost', formData)
        this.messages.push(data)
        this.text = ''
        this.file = ''
      }
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    }
  },
}
</script>
