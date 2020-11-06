<template>
  <div class="container my-5">
    <form @submit.prevent="save">
      <div class="form-group">
        <label for="caption">Caption:</label>
        <input type="text" class="form-control" id="caption" aria-describedby="emailHelp" v-model="text">
        <small id="emailHelp" class="form-text text-muted">Write a caption</small>
      </div>
      <div class="form-group">
        <input type="file" class="form-control-file" id="fileAdd" ref="file"  v-on:change="handleFileUpload()">
      </div>
      <img v-bind:src="imagePreview" v-show="showPreview"/>
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
      file: '',
      showPreview: false,
      imagePreview: ''
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
      let reader  = new FileReader();
      reader.addEventListener("load", function () {
        this.showPreview = true;
        this.imagePreview = reader.result;
      }.bind(this), false);
      if( this.file ){
        if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
          reader.readAsDataURL( this.file );
        }
      }
    }
  },
}
</script>

<style>
img {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
