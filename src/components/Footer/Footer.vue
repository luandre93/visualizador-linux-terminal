<template>
  <v-footer dark absolute color="#37474F">
    <modal v-model="modal" :title="titulo" :content="conteudo" />
    <v-row>
      <v-text-field
        v-model="ipAddress"
        v-bind:disabled="isDisabled"
        label="IP"
        class="mx-2"
      ></v-text-field>
      <v-text-field
        v-model="user"
        v-bind:disabled="isDisabled"
        label="Usuário"
        class="mx-2"
      ></v-text-field>
      <v-text-field
        v-model="password"
        v-bind:disabled="isDisabled"
        label="Senha"
        class="mx-2"
      ></v-text-field>
      <v-btn
        color="#263238"
        dark
        tile
        v-bind:loading="isLoading"
        class="my-auto mx-2 border-0"
        v-on:click="processBackendSend()"
        >Conectar</v-btn
      >
    </v-row>
  </v-footer>
</template>

<script>
import { createHelpers } from "vuex-map-fields";
import Modal from "../Modals/Modal.vue";
const { mapFields } = createHelpers({
  getterType: "getSSHClientField",
  mutationType: "updateSSHClientField",
});

export default {
  name: "Footer",
  components: {
    Modal,
  },

  methods: {
    processBackendSend() {
      this.$store.dispatch("ConnectionSSH");
    },
  },
  computed: {
    ...mapFields([
      "ipAddress",
      "user",
      "password",
      "isLoading",
      "isDisabled",
      "modal",
      "conteudo",
      "titulo",
    ]),
  },
};
</script>