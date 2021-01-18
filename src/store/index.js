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
            isDisabled: false,
            isLoading: false,
            modal: false,
            conteudo: "",
            titulo: "",
        },
        pdvClient: {
            msg: "",
            modalShow: false,
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
        ConnectionSSH() {
            this.state.sshClient.isLoading = true
            ipcRenderer.send("ssh-connect-send", this.state.sshClient);
            ipcRenderer.on("ssh-connect-send", (event, Response) => {
                this.state.pdvClient = Response;
                console.log(this.state.pdvClient)
                if (this.state.pdvClient.modalShow == true) {
                    this.state.sshClient.modal = true;
                    this.state.sshClient.conteudo = this.state.pdvClient.msg;
                    this.state.sshClient.titulo = "Informação"
                    this.state.sshClient.isLoading = false;
                    ipcRenderer.removeAllListeners("ssh-connect-send");
                } else {
                    this.state.sshClient.isLoading = false;
                }
            });
        }
    }
})

