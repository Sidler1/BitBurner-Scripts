/** @param {NS} ns **/
// import ;

export async function main(ns) {
    let ServerList = ns.scan();
    ns.disableLog("getServerBaseSecurityLevel")
    ns.disableLog("getServerSecurityLevel")
    ns.disableLog("getServerMaxMoney")
    ns.disableLog("getServerMoneyAvailable")
    ns.disableLog("getServerMinSecurityLevel")
    ns.disableLog("sleep")
    ns.clearLog();
    while (true) {
        ServerList.forEach(function (Host) {
            if (!Host.startsWith("node-")) {
                ns.print("Server:\t" + Host)
                ns.print("Sec:\tMax: " + ns.getServerBaseSecurityLevel(Host).toFixed(0) + "|Curr: " + ns.getServerSecurityLevel(Host).toFixed(0) + "|Min: " + ns.getServerMinSecurityLevel(Host).toFixed(0) + " - Weaken: " + (ns.getWeakenTime(Host) / 1000 / 60).toFixed(2) + " Min")
                ns.print("Money:\tMax: " + (ns.getServerMaxMoney(Host) / 1000000).toFixed(2) + "M|Curr: " + (ns.getServerMoneyAvailable(Host) / 1000000).toFixed(2) + "M|Full: " + (ns.getServerMoneyAvailable(Host) / ns.getServerMaxMoney(Host) * 100).toFixed(2) + "% - Grow: " + (ns.getGrowTime(Host) / 1000 / 60).toFixed(2) + " Min")
                ns.print("------------------------------------------------------------------------")
            }
        })
        ns.print(ns.getScriptIncome("master.js", "iron-gym", "iron-gym"))
        await ns.sleep(1000);
        ns.clearLog();
    }
}