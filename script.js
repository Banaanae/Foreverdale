const Host = '192.168.1.196';
const Port = '9339';

const libc = Process.getModuleByName("libc.so");
const getaddrinfo = libc.findExportByName('getaddrinfo');

console.log("[*] Script executed!");

Interceptor.attach(getaddrinfo, {
    onEnter(args) {
        if (args[0].isNull()) return;
        if (args[1].isNull()) return;

        const arg0 = args[0];
        const arg1 = args[1];
        const AskForHost = arg0.readUtf8String();
        const AskForPort = arg1.readUtf8String();

        console.log(`Redirected ${AskForHost}:${AskForPort} to ${Host}:${Port}!`);      

        arg0.writeUtf8String(Host);
        arg1.writeUtf8String(Port);
    }
});
// Replace 'libnative-lib.so' with the actual name of your library
const moduleName = "libg.so"; 
const offset = 0x6975A0 + 0x10C;

rpc.exports = {
    patchInstruction: function() {
        const baseAddr = Module.findBaseAddress(moduleName);
        
        if (baseAddr === null) {
            console.error(`[-] Could not find module: ${moduleName}`);
            return;
        }

        const targetAddr = baseAddr.add(offset);
        console.log(`[+] Base Address: ${baseAddr}`);
        console.log(`[+] Target Address: ${targetAddr}`);

        // Ensure the memory is writable
        Memory.protect(targetAddr, 4, 'rwx');

        /**
         * ARM64 Unconditional Branch (B)
         * The opcode for 'B' depends on the distance to the target.
         * If you want to change 'B.EQ <label>' to 'B <label>', 
         * we keep the immediate offset but change the instruction type.
         * * For '00 01 00 54' (B.EQ #0x20), the unconditional 'B #0x20' 
         * would be '08 00 00 14'.
         */
        
        // Patching with '08 00 00 14' (Standard unconditional branch for that offset)
        // Alternatively, use '1F 20 03 D5' for a NOP if you want to prevent the jump entirely.
        targetAddr.writeByteArray([0x08, 0x00, 0x00, 0x14]);

        console.log("[+] Patch applied successfully!");
    }
};

// Execute the patch
setImmediate(rpc.exports.patchInstruction);