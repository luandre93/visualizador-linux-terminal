<template>
  <v-footer dark absolute color="#37474F">
    <v-row>
      <v-text-field v-model="ipAddress" label="IP" class="mx-2"></v-text-field>
      <v-text-field v-model="user" label="Usuário" class="mx-2"></v-text-field>
      <v-text-field
        v-model="password"
        label="Senha"
        class="mx-2"
      ></v-text-field>
      <v-btn
        color="#263238"
        dark
        tile
        class="my-auto mx-2 border-0"
        v-on:click="processBackendSend()"
        >{{ btnConnect }}</v-btn
      >
    </v-row>
  </v-footer>
</template>

<script>
import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "getSSHClientField",
  mutationType: "updateSSHClientField",
});

export default {
  name: "Footer",

  methods: {
    processBackendSend() {
      this.$store.dispatch("ConnectionSSH");
    },
  },

  computed: {
    ...mapFields(["ipAddress", "user", "password", "btnConnect"]),
  },
};
</script>