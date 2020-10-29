import Vue from 'vue'
import Vuex from 'vuex'
import { ipcRenderer } from "electron";
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sshClient: {
            ipAddress: "",
            user: "",
            password: "",
        },
    },
    mutations: {

    },
    actions: {
        ConnectionSSH() {
            ipcRenderer.send("ssh-connect-login", this.sshClient);
            ipcRenderer.on("ssh-connect-login", (event, Response) => {
                this.pdvClient = Response;
                console.log(this.pdvClient);
            });
        },
    },
    modules: {
    }
})
