<template>
  <div>
    <form @submit.prevent="save">
      <input type="text" id="text" placeholder="Write something" v-model="text"/>
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      <input type="submit" value="Save">
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  props: ['messageAttr'],
  data() {
    return {
      text: '',
      id: '',
      file: ''
    }
  },
  watch: {
    messageAttr(newVal) {
      this.text = newVal.text
      this.id = newVal.id
    }
  },
  methods: {
    ...mapActions(['savePost', 'updatePost']),
    async save() {
      let formData = new FormData();
      formData.append('text', this.text)
      if (this.file != null) {
        formData.append('file', this.file)
      }
      if (this.id) {
        formData.append('id', this.id)
        this.updatePost(formData)
      } else {
        this.savePost(formData)
      }
      this.text = ''
      this.id = ''
      this.file = ''
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  },
}
</script>
