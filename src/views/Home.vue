<template>
  <MessageList/>
</template>

<script>
import MessageList from "@/components/MessageList";
import NavBar from "@/components/NavBar";
export default {
  name: 'Home',
  components:{
    NavBar,
    MessageList
  }
}
</script>
