/** @param {NS} ns **/
;

function CalcThreads(ns, Host) {
    let ScriptRam = ns.getScriptRam("master-local.js")
    let ServerRam = ns.getServerMaxRam(Host) - ns.getServerRam("home")[1]
    ns.print((ServerRam / ScriptRam).toFixed(0) - 2)
    return (ServerRam / ScriptRam).toFixed(0) - 2
}

export async function main(ns) {
    ns.disableLog("run");
    ns.disableLog("getScriptRam");
    ns.disableLog("getServerMaxRam");
    ns.clearLog();
    ns.exec('master-local.js', "home", CalcThreads(ns, "home"), ns.args[0]);
}

