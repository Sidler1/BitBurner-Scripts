/** @param {NS} ns **/
;

function CalcThreads(ns, Host) {
    let ScriptRam = ns.getScriptRam("master.js")
    let ServerRam = ns.getServerRam(Host)
    return (ServerRam / ScriptRam).toFixed(0) - 1
}

export async function main(ns) {
    let t
    t = CalcThreads(ns, ns.args[0])
}
