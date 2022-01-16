/** @param {NS} ns **/
export async function main(ns) {
	var HostName = ns.args[0];
	var ServerMaxMoney = ns.getServerMaxMoney(HostName);
	var ServerMoney = ns.getServerMoneyAvailable(HostName) * 1.2;
	while (true) {
		if (ServerMaxMoney > ServerMoney) {
			await ns.grow(HostName, { threads: 1 });
			ServerMoney = ns.getServerMoneyAvailable(HostName) * 1.2;
		} else {
			await ns.sleep(30 * 1000)
		}
	}
}