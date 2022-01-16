/** @param {NS} ns **/
export async function main(ns) {
	var HostName = ns.args[0];
	while (true) {
		await ns.hack(HostName, { threads: 1 });
	}
}