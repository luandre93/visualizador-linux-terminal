<template>
  <v-container pt-3 px-3 style="height: 90%">
    <v-footer dark absolute color="#37474F">
      <v-row>
        <v-text-field
          v-model="sshClient.ipAddress"
          label="IP"
          class="mx-2"
        ></v-text-field>
        <v-text-field
          v-model="sshClient.user"
          label="Usuário"
          class="mx-2"
        ></v-text-field>
        <v-text-field
          v-model="sshClient.password"
          label="Senha"
          class="mx-2"
        ></v-text-field>
        <v-btn
          color="#263238"
          dark
          tile
          class="my-auto mx-2 border-0"
          v-on:click="processBackendSend()"
          >Conectar</v-btn
        >
      </v-row>
    </v-footer>
  </v-container>
</template>

<script>
//import Modal from "./Modals/Modal.vue";
import { ipcRenderer } from "electron";
export default {
  name: "Commands",

  data: () => {
    return {
      titulo: "",
      conteudo: "",
      modal: false,
      sshClient: {
        ipAddress: "",
        user: "",
        password: "",
      },
      pdvClient: {
        hostName: "",
        cpuMaquina: "",
        memoriaMaquina: "",
        armazenamentoMaquina: "",
        modeloImpressora: "",
        serieImpressora: "",
        numeroImpressora: "",
        pinpad: "",
        balanca: "",
        scanner: "",
        scanner_mao: "",
        _pinpad: "",
        _balanca: "",
        _scanner: "",
        _scanner_mao: "",
      },
    };
  },
  components: {
    // Modal,
  },

  methods: {
    tipo(out) {
      if (out == "pinpad") {
        this.modal = true;
        this.titulo = "Pinpad";
        this.conteudo =
          this.pdvClient._pinpad.DESCRICAO[0] +
          "<br/>" +
          "Função: " +
          this.pdvClient._pinpad.$.TIPO +
          "<br/>" +
          "Ativo: " +
          this.pdvClient._pinpad.ATIVO[0] +
          "<br/>" +
          "Tipo: " +
          this.pdvClient._pinpad.TIPODISPOSITIVO[0] +
          "<br/>" +
          "Porta: " +
          this.pdvClient._pinpad.POR[0];
      }
      if (out == "balanca") {
        this.modal = true;
        this.titulo = "Balança";
        this.conteudo =
          this.pdvClient._balanca.DESCRICAO[0] +
          "<br/>" +
          "Função: " +
          this.pdvClient._balanca.$.TIPO +
          "<br/>" +
          "Ativo: " +
          this.pdvClient._balanca.ATIVO[0] +
          "<br/>" +
          "Tipo: " +
          this.pdvClient._balanca.TIPODISPOSITIVO[0] +
          "<br/>" +
          "Porta: " +
          this.pdvClient._balanca.POR[0];
      }
      if (out == "scanner") {
        this.modal = true;
        this.titulo = "Leitor de Mesa";
        this.conteudo =
          this.pdvClient._scanner.DESCRICAO[0] +
          "<br/>" +
          "Função: " +
          this.pdvClient._scanner.$.TIPO +
          "<br/>" +
          "Ativo: " +
          this.pdvClient._scanner.ATIVO[0] +
          "<br/>" +
          "Tipo: " +
          this.pdvClient._scanner.TIPODISPOSITIVO[0] +
          "<br/>" +
          "Porta: " +
          this.pdvClient._scanner.POR[0];
      }
      if (out == "scanner_mao") {
        this.modal = true;
        this.titulo = "Leitor de Mesa";
        this.conteudo =
          this.pdvClient._scanner_mao.DESCRICAO[0] +
          "<br/>" +
          "Função: " +
          this.pdvClient._scanner_mao.$.TIPO +
          "<br/>" +
          "Ativo: " +
          this.pdvClient._scanner_mao.ATIVO[0] +
          "<br/>" +
          "Tipo: " +
          this.pdvClient._scanner_mao.TIPODISPOSITIVO[0] +
          "<br/>" +
          "Porta: " +
          this.pdvClient._scanner_mao.POR[0];
      }
    },

    processBackendSend() {
      ipcRenderer.send("ssh-connect-login", this.sshClient);
      ipcRenderer.on("ssh-connect-login", (event, Response) => {
        this.pdvClient = Response;
        console.log(this.pdvClient);
      });
    },
  },
};
</script>
