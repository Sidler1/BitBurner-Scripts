/** @param host
 @param {NS} ns **/

function getRootAccess(host, ns) {
    try {
        ns.brutessh(host)
    } catch {
        ns.print('execution of BruteSSH on ' + host + ' failed');
    }
    try {
        ns.ftpcrack(host)
    } catch {
        ns.print('execution of FTPCrack on ' + host + ' failed');
    }
    try {
        ns.nuke(host);
    } catch {
        ns.print('execution of NUKE on ' + host + ' failed');
    }
}

/** @param {NS} ns **/
// import 'bitburner';

export async function main(ns) {
    let serverList = ns.scan();
    for (const element of serverList) {
        if (element === ns.args[0] || element === "home") {
            ns.print('Not Hacking Back!');
        } else {
            getRootAccess(element, ns);
            ns.run("CopyScriptsToServer.js", 1, element)
            await ns.sleep(1000);
            ns.exec("CrackAllServer.js", element, 1, ns.getHostname());
        }
    }
}
