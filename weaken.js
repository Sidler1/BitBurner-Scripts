/** @param {NS} ns **/
;

export async function main(ns) {
    var HostName = ns.args[0];
    var MinSecLevel = ns.getServerMinSecurityLevel(HostName) * 1.2;
    var SecLevel = ns.getServerSecurityLevel(HostName);
    while (true) {
        if (MinSecLevel < SecLevel) {
            await ns.weaken(HostName, {threads: 1});
            SecLevel = ns.getServerSecurityLevel(HostName);
        } else {
            await ns.sleep(30 * 1000)
        }
    }
}