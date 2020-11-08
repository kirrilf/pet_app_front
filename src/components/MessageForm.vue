<template>
  <div class="container my-5">
    <form @submit.prevent="save">
      <div class="form-group">
        <label for="caption">Caption:</label>
        <input type="text" class="form-control" id="caption" aria-describedby="emailHelp" v-model="text">
        <small id="emailHelp" class="form-text text-muted">Write a caption</small>
      </div>
      <div v-if="!messageAttr" class="form-group">
        <input type="file" id="files" ref="files" accept="image/*" multiple @change="handleFileUpload"/>
      </div>
      <div>
        {{imagePreview}}
    <!--  <img v-if="imagePreview.length === 1" :src=imagePreview[0] class="rounded mx-auto d-block" alt="Post image">
      <splide :options="options" v-else-if="imagePreview.length>1">
        <splide-slide v-for="imgLink in imagePreview" :key="imgLink">
          <img class="rounded mx-auto d-block" :src=imgLink alt="slide">
        </splide-slide>
      </splide>-->
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {Splide, SplideSlide} from '@splidejs/vue-splide';

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
  components: {
    Splide,
    SplideSlide,
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
  }
}
</script>

<style>
.btn:focus, .btn:active {
  outline: none !important;
  box-shadow: none !important;
}
img{
  width: auto;
  max-width: 1000px;
  max-height: 540px;
  display: block;
}
</style>
