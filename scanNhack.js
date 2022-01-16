/** @param {NS} ns **/
;

function getRootAccess(host, ns) {
    try {
        ns.brutessh(host)
    } catch {
        ns.print('execution of BruteSSH on ' + host + ' failed');
    }
    try {
        ns.ftpcrack(host)
    } catch {
        ns.print('execution of FTPCrack on ' + host + ' failed');
    }
    try {
        ns.nuke(host);
    } catch {
        ns.print('execution of NUKE on ' + host + ' failed');
    }
}

async function ScanForServers(ns) {
    var serverList = ns.scan();
    for (var x = 0; x < serverList.length; x++) {
        if (serverList.length <= 1) {
            ns.exit();
            ns.killall(serverList[x]);
        }
        if (serverList[x] == "home" || serverList[x] == "Volhaven-node" || serverList[x] == "darkweb" || serverList[x] == "n00dles" || serverList[x] == "CSEC" || serverList[x] == ns.args[0]) {
            continue;
        }
        if (!ns.hasRootAccess(serverList[x])) {
            getRootAccess(serverList[x], ns);
        } else {
            ns.killall(serverList[x]);
            ns.run('CopyScriptsToServers.js', 1, serverList[x]);
            await ns.sleep(1000);
            ns.exec('scanNhack.js', serverList[x], 1, ns.getHostname());
            await ns.sleep(1000);
            ns.exec('weaken.js', serverList[x], 1, serverList[x]);
            ns.exec('hack.js', serverList[x], 1, serverList[x]);
            ns.exec('grow.js', serverList[x], 3, serverList[x]);
        }
        await ns.sleep(100);
        // Pew Pew
    }
}

export async function main(ns) {
    ns.disableLog("exec");
    ns.disableLog("sleep");
    ns.disableLog("run");
    ns.disableLog("brutessh");
    ns.disableLog("nuke");
    ns.disableLog("killall");
    ns.clearLog();
    await ScanForServers(ns);
}