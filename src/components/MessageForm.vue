<template>
  <div class="container my-5">
    <form @submit.prevent="save">

      <div  v-if="!messageAttr"  class="input-group mb-3 form-group">
        <div class="custom-file">
          <input type="file" id="files"  class="custom-file-input" ref="files" accept="image/*" multiple @change="handleFileUpload"/>
          <label class="custom-file-label" for="files">Choose file</label>
        </div>
      </div>

        <div>
        <div class="card-columns">
          <div v-for="(file, key) in files" class="card my-5" style="width: 18rem;">
            <img class="card-img-top" :src=getURL(file) alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">{{ file.name }}</h5>
              <a href="#" @click="removeFile(key)" class="btn btn-primary">Remove</a>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="caption">Caption:</label>
        <input type="text" class="form-control" id="caption" aria-describedby="emailHelp" v-model="text">
        <small id="emailHelp" class="form-text text-muted">Write a caption</small>
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
      if (this.id) {
        formData.append('id', this.id)
        this.updatePost(formData)
        await this.$router.push('/')
      } else {
        for (let i = 0; i < this.files.length; i++) {
          formData.append('file', this.files[i])
        }
        this.savePost(formData)
        await this.$router.push('/')
      }
      this.text = ''
      this.id = ''
      this.files = []
    },
    handleFileUpload() {
      let upFiles = this.$refs.files.files;
      upFiles.forEach(itm => this.files.unshift(itm))
      upFiles.forEach(itm => this.imagePreview.unshift(window.URL.createObjectURL(itm)))
    },
    removeFile(key) {
      this.imagePreview.splice(key, 1)
      this.files.splice(key, 1)
    },
    getURL(itm) {
      return window.URL.createObjectURL(itm)
    }
  }
}
</script>

<style>
.btn:focus, .btn:active {
  outline: none !important;
  box-shadow: none !important;
}

img {
  width: auto;
  max-width: 1000px;
  max-height: 540px;
  display: block;
}
</style>
