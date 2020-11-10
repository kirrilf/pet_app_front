<template>
  <NavBar/>
  <CapProfile :profileId="this.$route.params.id"/>
  <DeckCards :profileId="this.$route.params.id"/>
</template>

<script>
import CapProfile from "@/components/CapProfile";
import NavBar from "@/components/NavBar";
import DeckCards from "@/components/DeckCards";

export default {
  components: {
    NavBar, CapProfile, DeckCards
  }

}
</script>