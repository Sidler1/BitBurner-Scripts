/** @param {NS} ns **/
;

export async function main(ns) {
    ns.disableLog("hacknet.getLevelUpgradeCost");
    ns.disableLog("getServerMoneyAvailable");
    ns.disableLog("sleep");
    var HacknetServers = ns.hacknet.numNodes();
    while (true) {
        for (var x = 0; x < HacknetServers; x++) {
            UpgradeHacknetServer(x, ns);
            await ns.sleep(1);
        }
        HacknetServers = ns.hacknet.numNodes();
    }
}

async function UpgradeHacknetServer(idx, ns) {
    if (ns.hacknet.getLevelUpgradeCost(idx, 1) < ns.getServerMoneyAvailable('home') && ns.hacknet.getLevelUpgradeCost(idx, 1) < ns.hacknet.getRamUpgradeCost(idx, 1)) {
        ns.print('Upgrading Node ' + idx + ' Level for ' + ns.hacknet.getLevelUpgradeCost(idx, 1));
        ns.hacknet.upgradeLevel(idx, 1);
    } else if (ns.hacknet.getRamUpgradeCost(idx, 1) < ns.getServerMoneyAvailable('home') && ns.hacknet.getRamUpgradeCost(idx, 1) < ns.hacknet.getCoreUpgradeCost(idx, 1)) {
        ns.print('Upgrading Node ' + idx + ' RAM for ' + ns.hacknet.getRamUpgradeCost(idx, 1));
        ns.hacknet.upgradeRam(idx, 1);
    } else if (ns.hacknet.getCoreUpgradeCost(idx, 1) < ns.getServerMoneyAvailable('home')) {
        ns.print('Upgrading Node ' + idx + ' Cores for ' + ns.hacknet.getCoreUpgradeCost(idx, 1));
        ns.hacknet.upgradeCore(idx, 1);
    } else if (ns.hacknet.maxNumNodes() > ns.hacknet.numNodes() && ns.getServerMoneyAvailable('home') > ns.hacknet.getPurchaseNodeCost()) {
        ns.hacknet.purchaseNode();
        ns.print('Buying a new Node!');
    }
} 