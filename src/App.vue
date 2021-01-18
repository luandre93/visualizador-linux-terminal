<template>
  <div id="app">
    <v-app style="background-color: #37474f">
      <v-card
        class="mx-auto"
        width="100%"
        height="100%"
        rounded="0"
        style="background-color: #263238"
      >
        <v-app-bar color="#37474f" dark height="50px">
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

          <v-toolbar-title>Visualizador PDV </v-toolbar-title>

          <v-app-bar
            color="#37474f"
            dark
            elevation="0"
            style="-webkit-app-region: drag; width: 50%"
            height="50px"
          >
          </v-app-bar>

          <v-btn
            color="#37474f"
            tile
            elevation="0"
            style="font-family: arial"
            @click.stop="close()"
            ><v-icon>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
          dark
          color="#37474f"
        >
          <v-list nav dense>
            <v-list-item-group active-class="primary--text text--accent-4">
              <v-list-item to="/Main">
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Informações</v-list-item-title>
              </v-list-item>
              <v-list-item to="/Commands">
                <v-list-item-icon>
                  <v-icon>mdi-console</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Comandos</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <div class="overflow-auto">
          <router-view />
        </div>
      </v-card>
    </v-app>
  </div>
</template>

<script>
const { ipcRenderer } = require("electron");

export default {
  name: "App",

  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    close() {
      ipcRenderer.send("close");
    },
  },
};
</script>

<style>
html {
  overflow-y: hidden !important;
}

/* Sets the dimensions of the entire scrollbar */
html::-webkit-scrollbar {
  width: 30px;
  height: 30px;
}

/* The grabbable scrollbar button  */
html::-webkit-scrollbar-thumb {
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#ff8a00),
    to(#e52e71)
  );
  background: linear-gradient(180deg, #ff8a00, #e52e71);
  border-radius: 30px;
  box-shadow: inset 2px 2px 2px hsla(0, 0%, 100%, 0.25),
    inset -2px -2px 2px rgba(0, 0, 0, 0.25);
}

/* The vertical scrollbar background */
html::-webkit-scrollbar-track {
  background: linear-gradient(90deg, #201c29, #201c29 1px, #100e17 0, #100e17);
}
</style>
