<template>
  <v-container pt-3 px-3 style="height: 90%">
    <Footer-APP />
  </v-container>
</template>

<script>
import FooterAPP from "./Footer/Footer.vue";

export default {
  name: "Commands",

  components: {
    FooterAPP,
    // Modal,
  },
};
</script>
