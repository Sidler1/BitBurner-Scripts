// /** @param {NS} ns **/
export async function main(ns) {
	let files = ns.ls("home", "js");
	ns.scp(files, ns.getHostname(), ns.args[0])
}