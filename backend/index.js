const SSH = require('simple-ssh');
const { ipcMain } = require('electron')

let outClient =
{
    hostName: "",
    cpuMaquina: "",
    memoriaMaquina: "",
    armazenamentoMaquina: "",
    versaoCodfon: "",
    versaoModuloPHP: "",
    versaoClisitef: "",
    modeloImpressora: "",
    numeroImpressora: "",
    tipoImpressora: "",
    pinpad: "",
    scanner: "",
    scanner_mao: "",
    balanca: "",
    _pinpad: "",
    _scanner: "",
    _scanner_mao: "",
    _balanca: "",
}


ipcMain.on('ssh-connect-login', (event, args) => {

    var ssh = new SSH({
        host: args.ipAddress,
        user: args.user,
        pass: args.password
    })

    ssh.exec("cat /etc/hostname", {
        out: (stdout) => {
            outClient.hostName = stdout
        }
    }).exec("cat /proc/cpuinfo | grep 'model name' | uniq", {
        out: (stdout) => {
            outClient.cpuMaquina = stdout.slice(13);
        },
    }).exec(`awk '$3=="kB"{if ($2>1024^2){$2=$2/1024^2;$3="GB";} else if ($2>1024){$2=$2/1024;$3="MB";}} 1' /proc/meminfo | column -t | grep MemTotal`, {
        out: (stdout) => {
            outClient.memoriaMaquina = stdout.slice(13).trim();
        }
    }).exec("df -HT . | awk '{print $3}' | grep G", {
        out: (stdout) => {
            outClient.armazenamentoMaquina = stdout;
            event.reply("ssh-connect-login", outClient)
        },

    }).exec("cat /Zanthus/Zeus/pdvJava/INFOPDV.XML", {
        out: (stdout) => {
            var parseString = require('xml2js').parseString;
            parseString(stdout, function (err, result) {
                outClient.versaoCodfon = result.ZEUS_INFOPDV.VERSAO[0];
                outClient.versaoModuloPHP = result.ZEUS_INFOPDV.MODULOPHP[0];
                outClient.versaoClisitef = result.ZEUS_INFOPDV.VERSAO_CLISITEF[0];
                outClient.modeloImpressora = result.ZEUS_INFOPDV.MARCAECF[0] + " - " + result.ZEUS_INFOPDV.MODELOECF[0];
                outClient.serieImpressora = result.ZEUS_INFOPDV.FABRICACAOECF[0];
                outClient.numeroImpressora = "ECF " + result.ZEUS_INFOPDV.NUMEROPDV[0];
                outClient.scanner = "Porta: " + result.ZEUS_INFOPDV.DISPOSITIVOS[0].DISPOSITIVO[0].POR[0];
                outClient.scanner_mao = "Porta: " + result.ZEUS_INFOPDV.DISPOSITIVOS[0].DISPOSITIVO[1].POR[0];
                outClient.pinpad = "Porta: " + result.ZEUS_INFOPDV.DISPOSITIVOS[0].DISPOSITIVO[2].POR[0];
                outClient.balanca = "Porta: " + result.ZEUS_INFOPDV.DISPOSITIVOS[0].DISPOSITIVO[4].POR[0];
                outClient._scanner = result.ZEUS_INFOPDV.DISPOSITIVOS[0].DISPOSITIVO[0];;
                outClient._scanner_mao = result.ZEUS_INFOPDV.DISPOSITIVOS[0].DISPOSITIVO[1]
                outClient._pinpad = result.ZEUS_INFOPDV.DISPOSITIVOS[0].DISPOSITIVO[2];
                outClient._balanca = result.ZEUS_INFOPDV.DISPOSITIVOS[0].DISPOSITIVO[4];
            })

            event.reply("ssh-connect-login", outClient)
        }
    }).start()

});


