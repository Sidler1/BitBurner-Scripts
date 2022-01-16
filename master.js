/** @param {NS} ns **/
;

export async function main(ns) {
    ns.disableLog("getServerBaseSecurityLevel")
    ns.disableLog("getServerSecurityLevel")
    ns.disableLog("getServerMaxMoney")
    ns.disableLog("getServerMoneyAvailable")
    ns.disableLog("getServerMinSecurityLevel")
    ns.clearLog();
    while (true) {
        if (ns.getServerMinSecurityLevel(ns.args[0]) < ns.getServerSecurityLevel(ns.args[0])) {
            await ns.weaken(ns.args[0])
        } else if (ns.getServerMaxMoney(ns.args[0]) > ns.getServerMoneyAvailable(ns.args[0])) {
            await ns.grow(ns.args[0])
        } else {
            await ns.hack(ns.args[0])
        }
    }
}