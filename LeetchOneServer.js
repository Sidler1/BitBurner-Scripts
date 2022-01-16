/** @param {NS} ns **/
;

async function LeetchServer(ns) {
    const serverList = ns.scan();
    for (let x = 0; x < serverList.length; x++) {
        ns.print("Copy Scripts to " + serverList[x])
        await ns.run('CopyScriptsToServer.js', 1, serverList[x]);
        await ns.sleep(250);
        ns.exec('master.js', serverList[x], CalcThreads(ns, serverList[x]), ns.args[0]);
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