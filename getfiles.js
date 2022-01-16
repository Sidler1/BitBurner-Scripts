/** @param {NS} ns **/
;

export async function main(ns) {
    ns.print(ns.getWeakenTime(ns.getHostname()));
}