/** @param {NS} ns **/
;

export async function main(ns) {
    let ram = ns.args[0]
    let ServerNameStart = "node-"
    let ServerNumber = ns.args[1]
    ns.disableLog("sleep")
    ns.disableLog("getServerMoneyAvailable")
    ns.disableLog("getPurchasedServerCost")
    while (true) {
        ns.clearLog()
        ns.print("Need " + ((ns.getPurchasedServerCost(ram) - ns.getServerMoneyAvailable("home").toFixed(0)) / 1000000).toFixed(2) + " M$ more!")
        if (ns.getPurchasedServerCost(ram) < ns.getServerMoneyAvailable("home").toFixed(0)) {
            let NewServerName = ServerNameStart + ServerNumber.toString().padStart(3, "0")
            ns.print(NewServerName);
            ns.purchaseServer(NewServerName, ram)
            ServerNumber = ServerNumber + 1
            await ns.run("LeetchOneServer.js", 1, "iron-gym")
        }
        await ns.sleep(1000)
    }
}