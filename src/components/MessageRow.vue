<template>
  <div>
    {{ message.text }}
    Likes: {{message.count}}
    <span>
            <input type="button" value="Edit" @click="edit" />
            <input type="button" value="X" @click="del" />
            <input type="button" value="Like" @click="like" />
    </span>
    <img v-if="message.fileName" :src=imgLink>
  </div>
</template>

<script>
export default {
  props: ['message', 'editMessage', 'deleteMessage', 'messages', 'likeMessage'],
  data(){
    return{
      imgLink:"http://localhost:8081/api/img/"+this.message.fileName
    }
  },
  methods: {
    edit() {
      this.editMessage(this.message)
    },
    del() {
      this.deleteMessage(this.message)
    },
    like(){
      this.likeMessage(this.message)
    }
  }
}
</script>
