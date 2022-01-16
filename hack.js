/** @param {NS} ns **/
;

export async function main(ns) {
    const HostName = ns.args[0];
    while (true) {
        await ns.hack(HostName);
    }
}