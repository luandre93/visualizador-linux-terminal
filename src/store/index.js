import Vue from 'vue';
import Vuex from 'vuex';
import { getField, updateField } from 'vuex-map-fields';
import { ipcRenderer } from "electron";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sshClient: {
            ipAddress: "",
            user: "",
            password: "",
            btnConnect: "Conectar",
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
        }
    },
    getters: {
        getSSHClientField(state) {
            return getField(state.sshClient);
        },
        getPdvClientField(state) {
            return getField(state.pdvClient);
        },
    },

    mutations: {
        updateSSHClientField(state, field) {
            updateField(state.sshClient, field)
        },
        updatePdvClientField(state, field) {
            updateField(state.pdvClient, field)
        }
    },


    actions: {
        async ConnectionSSH() {
            ipcRenderer.send("ssh-connect-login", this.state.sshClient);
            ipcRenderer.on("ssh-connect-login", (event, Response) => {
                this.state.pdvClient = Response;
                console.log(Response);
            });
        },
    },

    modules: {
    }
})
