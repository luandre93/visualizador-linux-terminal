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
                v-model="cpuMaquina"
                outlined
                label="Processador"
                id="id"
                readonly
                class="mx-2"
              ></v-text-field>
              <v-text-field
                name="name"
                style="font-size: 12px"
                v-model="memoriaMaquina"
                outlined
                label="Memória"
                id="id"
                readonly
                class="mx-2"
              ></v-text-field>
              <v-text-field
                name="name"
                style="font-size: 12px"
                v-model="armazenamentoMaquina"
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
                v-model="modeloImpressora"
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
                v-model="serieImpressora"
                outlined
                label="Número de Série"
                id="id"
                readonly
                class="mx-2"
              ></v-text-field>
              <v-text-field
                name="name"
                style="font-size: 12px"
                v-model="numeroImpressora"
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
                v-model="pinpad"
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
                v-model="balanca"
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
                v-model="scanner"
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
                v-model="scanner_mao"
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
    <FooterAPP />
  </v-container>
</template>

<script>
import Modal from "./Modals/Modal.vue";
import FooterAPP from "./Footer/Footer.vue";

import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "getPdvClientField",
  mutationType: "updatePdvClientField",
});

export default {
  name: "Main",

  data: () => {
    return {
      titulo: "",
      conteudo: "",
      modal: false,
    };
  },
  components: {
    Modal,
    FooterAPP,
  },
  mounted() {},

  methods: {
    tipo(out) {
      if (out == "pinpad") {
        this.modal = true;
        this.titulo = "Pinpad";
        this.conteudo =
          this.$store._pinpad.DESCRICAO[0] +
          "<br/>" +
          "Função: " +
          this.$store._pinpad.$.TIPO +
          "<br/>" +
          "Ativo: " +
          this.this.$store._pinpad.ATIVO[0] +
          "<br/>" +
          "Tipo: " +
          this.this.$store._pinpad.TIPODISPOSITIVO[0] +
          "<br/>" +
          "Porta: " +
          this.this.$store._pinpad.POR[0];
      }

      if (out == "balanca") {
        this.modal = true;
        this.titulo = "Balança";
        this.conteudo =
          this._balanca.DESCRICAO[0] +
          "<br/>" +
          "Função: " +
          this._balanca.$.TIPO +
          "<br/>" +
          "Ativo: " +
          this._balanca.ATIVO[0] +
          "<br/>" +
          "Tipo: " +
          this._balanca.TIPODISPOSITIVO[0] +
          "<br/>" +
          "Porta: " +
          this._balanca.POR[0];
      }

      if (out == "scanner") {
        this.modal = true;
        this.titulo = "Leitor de Mesa";
        this.conteudo =
          this._scanner.DESCRICAO[0] +
          "<br/>" +
          "Função: " +
          this._scanner.$.TIPO +
          "<br/>" +
          "Ativo: " +
          this._scanner.ATIVO[0] +
          "<br/>" +
          "Tipo: " +
          this._scanner.TIPODISPOSITIVO[0] +
          "<br/>" +
          "Porta: " +
          this._scanner.POR[0];
      }

      if (out == "scanner_mao") {
        this.modal = true;
        this.titulo = "Leitor de Mesa";
        this.conteudo =
          this._scanner_mao.DESCRICAO[0] +
          "<br/>" +
          "Função: " +
          this._scanner_mao.$.TIPO +
          "<br/>" +
          "Ativo: " +
          this._scanner_mao.ATIVO[0] +
          "<br/>" +
          "Tipo: " +
          this._scanner_mao.TIPODISPOSITIVO[0] +
          "<br/>" +
          "Porta: " +
          this._scanner_mao.POR[0];
      }
    },
  },
  computed: {
    ...mapFields([
      "cpuMaquina",
      "hostName",
      "memoriaMaquina",
      "armazenamentoMaquina",
      "modeloImpressora",
      "serieImpressora",
      "numeroImpressora",
      "pinpad",
      "balanca",
      "scanner",
      "scanner_mao",
      "_pinpad",
      "_balanca",
      "_scanner",
      "_scanner_mao",
    ]),
  },
};
</script>
