<template>
  <div>
    <input type="text" placeholder="Write something" v-model="text"/>
    <input type="button" value="Save" @click="save"/>
  </div>
</template>

<script>
export default {
  props: ['messages', 'messageAttr'],
  data:()=>({
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
    save() {
      const message = {text: this.text}
      if (this.id) {
       //update
      } else {
        //save
      }
    }
  },
}
</script>
