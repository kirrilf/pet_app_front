<template>
  <div class="container my-5">
    <form @submit.prevent="save">
      <div class="form-group">
        <label for="caption">Caption:</label>
        <input type="text" class="form-control" id="caption" aria-describedby="emailHelp" v-model="text">
        <small id="emailHelp" class="form-text text-muted">Write a caption</small>
      </div>
      <div class="form-group">
        <input type="file" id="files" ref="files" accept="image/*"  multiple @change="handleFileUpload"/>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
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
      files: [],
      showPreview: false,
      imagePreview: []
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
      for (let i = 0; i < this.files.length; i++) {
        formData.append('file', this.files[i])
      }
      if (this.id) {
        formData.append('id', this.id)
        this.updatePost(formData)
        await this.$router.push('/')
      } else {
        this.savePost(formData)
        await this.$router.push('/')
      }
      this.text = ''
      this.id = ''
      this.files = []
    },
    handleFileUpload() {
      this.files = this.$refs.files.files;
    },
  }
}
</script>

<style>
img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
