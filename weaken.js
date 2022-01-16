/** @param {NS} ns **/
;

export async function main(ns) {
    const HostName = ns.args[0];
    const MinSecLevel = ns.getServerMinSecurityLevel(HostName) * 1.2;
    let SecLevel = ns.getServerSecurityLevel(HostName);
    while (true) {
        if (MinSecLevel < SecLevel) {
            await ns.weaken(HostName);
            SecLevel = ns.getServerSecurityLevel(HostName);
        } else {
            await ns.sleep(30 * 1000)
        }
    }
}