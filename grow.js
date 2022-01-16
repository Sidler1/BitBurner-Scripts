/** @param {NS} ns **/
;

export async function main(ns) {
    const HostName = ns.args[0];
    const ServerMaxMoney = ns.getServerMaxMoney(HostName);
    let ServerMoney = ns.getServerMoneyAvailable(HostName) * 1.2;
    while (true) {
        if (ServerMaxMoney > ServerMoney) {
            await ns.grow(HostName, {threads: 1});
            ServerMoney = ns.getServerMoneyAvailable(HostName) * 1.2;
        } else {
            await ns.sleep(30 * 1000)
        }
    }
}