/** @param {NS} ns **/
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

async function LeetchServer(ns) {
    const serverList = ns.scan();
    for (let x = 0; x < serverList.length; x++) {
        if (serverList.length <= 1) {
            ns.exit();
            ns.killall(serverList[x]);
        }
        if (!ns.hasRootAccess(serverList[x])) {
            getRootAccess(serverList[x], ns);
        } else {
            ns.killall(serverList[x]);
            ns.print("Copy Scripts to " + serverList[x])
            ns.run('CopyScriptsToServer.js', 1, serverList[x]);
            await ns.sleep(250);
            ns.exec('master.js', serverList[x], CalcThreads(ns, serverList[x]), ns.args[0]);
        }
    }
}

export async function main(ns) {
    ns.disableLog("exec");
    ns.disableLog("sleep");
    ns.disableLog("run");
    ns.disableLog("brutessh");
    ns.disableLog("nuke");
    ns.disableLog("killall");
    ns.disableLog("getServerMaxRam");
    ns.clearLog();
    await LeetchServer(ns);
}
function CalcThreads(ns, Host) {
    let ScriptRam = ns.getScriptRam("master.js")
    let ServerRam = ns.getServerMaxRam(Host)
    return (ServerRam / ScriptRam).toFixed(0) - 1
}