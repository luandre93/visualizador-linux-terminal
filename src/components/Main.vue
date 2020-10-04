<template>
  <v-container px-3 style="background-color: #263238; padding-top: 30px">
    <div style="overflow-y: auto; min-height: 100%; height: 500px">
      <modal v-model="modal" :title="titulo" :content="conteudo" />
      <div>
        <v-card
          class="mt-3 rounded-lg"
          dark
          color="#37474F"
          elevation="1"
          height="140"
        >
          <div style="background-color: #37474f; height: 50px">
            <v-card-title class="headline" style="color: #fff">
              <v-icon>assessment</v-icon>
              <span class="mx-2 text-subtitle-1">Maquina</span>
            </v-card-title>
          </div>
          <v-divider></v-divider>
          <v-col>
            <v-row>
              <v-text-field
                name="name"
                style="font-size: 12px"
                v-model="pdvClient.cpuMaquina"
                outlined
                label="Processador"
                id="id"
                readonly
                class="mx-2"
              ></v-text-field>
              <v-text-field
                name="name"
                style="font-size: 12px"
                v-model="pdvClient.memoriaMaquina"
                outlined
                label="Memória"
                id="id"
                readonly
                class="mx-2"
              ></v-text-field>
              <v-text-field
                name="name"
                style="font-size: 12px"
                v-model="pdvClient.armazenamentoMaquina"
                outlined
                label="Armazenamento"
                id="id"
                readonly
                class="mx-2"
              ></v-text-field>
            </v-row>
          </v-col>
        </v-card>

        <v-card
          class="mt-3 rounded-lg"
          dark
          color="#37474F"
          elevation="1"
          height="140"
        >
          <div style="background-color: #37474f; height: 50px">
            <v-card-title class="headline" style="color: #fff">
              <v-icon>print</v-icon>
              <span class="mx-2 text-subtitle-1">Impressora</span>
            </v-card-title>
          </div>
          <v-divider></v-divider>
          <v-col>
            <v-row>
              <v-text-field
                v-model="pdvClient.modeloImpressora"
                name="name"
                style="font-size: 12px"
                outlined
                label="Modelo"
                id="id"
                readonly
                class="mx-2"
              ></v-text-field>
              <v-text-field
                name="name"
                style="font-size: 12px"
                v-model="pdvClient.serieImpressora"
                outlined
                label="Número de Série"
                id="id"
                readonly
                class="mx-2"
              ></v-text-field>
              <v-text-field
                name="name"
                style="font-size: 12px"
                v-model="pdvClient.numeroImpressora"
                outlined
                label="Número"
                id="id"
                readonly
                class="mx-2"
              ></v-text-field>
            </v-row>
          </v-col>
        </v-card>
        <v-card
          class="mt-3 rounded-lg"
          dark
          color="#37474F"
          elevation="1"
          height="140"
        >
          <div style="background-color: #37474f; height: 50px">
            <v-card-title class="headline" style="color: #fff">
              <v-icon>mdi-usb-port</v-icon>
              <span class="mx-2 text-subtitle-1">Periféricos</span>
            </v-card-title>
          </div>
          <v-divider></v-divider>
          <v-col>
            <v-row>
              <v-text-field
                v-model="pdvClient.pinpad"
                @click.stop="tipo('pinpad')"
                name="name"
                style="font-size: 12px"
                outlined
                label="Pinpad"
                id="id"
                readonly
                class="mx-2"
              ></v-text-field>
              <v-text-field
                name="name"
                style="font-size: 12px"
                @click.stop="tipo('balanca')"
                v-model="pdvClient.balanca"
                outlined
                label="Balança"
                id="id"
                readonly
                class="mx-2"
              ></v-text-field>
              <v-text-field
                name="name"
                @click.stop="tipo('scanner')"
                style="font-size: 12px"
                v-model="pdvClient.scanner"
                outlined
                label="Leitor de Mesa"
                id="id"
                readonly
                class="mx-2"
              ></v-text-field>
              <v-text-field
                name="name"
                style="font-size: 12px"
                @click.stop="tipo('scanner_mao')"
                v-model="pdvClient.scanner_mao"
                outlined
                label="Leitor de Mão"
                id="id"
                readonly
                class="mx-2"
              ></v-text-field>
            </v-row>
          </v-col>
        </v-card>
      </div>
    </div>
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
import Modal from "./Modals/Modal.vue";
import { ipcRenderer } from "electron";
export default {
  name: "Main",

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
    Modal,
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
