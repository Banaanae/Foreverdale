const dev = true
const ip = "192.168.1.117"
var cache = {
    modules: {},
    options: {}
};

function exceptionHandler() {
    console.log("Enabling exception handler")
    Process.setExceptionHandler(function (e) {
        console.log("=== CRASH DETECTED ===");

        console.log("Type:", e.type);
        console.log("Address:", e.address);

        if (e.context) {
            console.log("PC:", e.context.pc);
            console.log("LR:", e.context.lr);
            console.log("SP:", e.context.sp);

            console.log("\nBacktrace:");
            console.log(
                Thread.backtrace(e.context, Backtracer.ACCURATE)
                    .map(DebugSymbol.fromAddress)
                    .join("\n")
            );
        }

        return false; // allow crash after logging
    });
    console.log("Done")
}

const module = Process.getModuleByName("libg.so");
const base = module.base;
Memory.protect(base, module.size, "rwx");

const strCtor = new NativeFunction(base.add(0xA130F8), "pointer", ["pointer", "pointer"]); // Done

const Armceptor = {
    nop: function(addr) {
        Memory.patchCode(addr, Process.pageSize, function(code) {
            var writer = new Arm64Writer(code, { pc: addr });
            writer.putNop();
            writer.flush();
        });
    },
    ret: function(addr) {
        Memory.patchCode(addr, Process.pageSize, function(code) {
            var writer = new Arm64Writer(code, { pc: addr });
            writer.putRet();
            writer.flush();
        });
    },
    jumpOffset: function(addr, target) {
        Memory.patchCode(addr, Process.pageSize, function(code) {
            var writer = new Arm64Writer(code, { pc: addr });
            writer.putBImm(target);
            writer.flush();
        });
    },
    jumpout: function(addr, target) {
        Memory.patchCode(addr, Process.pageSize, function(code) {
            var writer = new Arm64Writer(code, { pc: addr });
            writer.putBranchAddress(target);
            writer.flush();
        });
    },
};

function killArxan() {
    console.log("Killing Arxan")
    Interceptor.replace(Module.findExportByName('libc.so', 'openat'), new NativeCallback(function(dirfd, pathname) {
        return -1;
    }, 'int', ['int', 'pointer']));

    console.log("Killed openat")

	Armceptor.jumpout(base.add(0x5A5080), base.add(0x5A5EE8));
	//Armceptor.jumpout(base.add(0x862D70), base.add(0x866784));
    Armceptor.jumpout(base.add(0x9805CC), base.add(0x98153C)); // LoginMessage::encode
	//Armceptor.jumpout(base.add(0x79D1CC), base.add(0x79E13C));
	//Armceptor.jumpout(base.add(0x7C48C4), base.add(0x7C56D0));
	//Armceptor.jumpout(base.add(0x395470), base.add(0x396940));

    console.log("Cleaned jumps")
	
    // exact same byte sequence surely its correct sob 
    /*
	Memory.protect(base.add(0x65E5DC), 4, 'rwx');
	base.add(0x65E5DC).writeByteArray([0x08, 0x00, 0x80, 0xD2]); // MOV X8, #0

	Memory.protect(base.add(0x65E5E4), 4, 'rwx');
	base.add(0x65E5E4).writeByteArray([0x08, 0x00, 0x80, 0xD2]);
    */

    Memory.protect(base.add(0x34A828), 4, 'rwx');
	base.add(0x34A828).writeByteArray([0x08, 0x00, 0x80, 0xD2]); // MOV X8, #0

	Memory.protect(base.add(0x34A830), 4, 'rwx');
	base.add(0x34A830).writeByteArray([0x08, 0x00, 0x80, 0xD2]);

    console.log("Removed crash jumps")

	Armceptor.ret(base.add(0x438A1C)); // 70% OG 0x8760EC
	Armceptor.ret(base.add(0x95594C)); // 90% sure
	Armceptor.ret(base.add(0x686F9C)); // Same deal as #1 og 0x831108
	//Armceptor.ret(base.add(0x71F878));
	Armceptor.ret(base.add(0x341D98)); // 60% og 0x71DE00
	Armceptor.ret(base.add(0x9AA32C)); // 80%

    console.log("Ret anticheat calls")

    Armceptor.ret(base.add(0x2A6738)); // AntiCheat::guard_callback

    console.log("Killed AntiCheat\nKilled Arxan successfully")
}

function setupHost() {
    Interceptor.attach(base.add(0x920CF4), {
        onEnter(args) {
            strCtor(args[1], Memory.allocUtf8String(ip)); // IP Address here
			strCtor(args[2], Memory.allocUtf8String("9339")); // Port here
            
        }
    })
	/*Interceptor.attach(base.add(0x975338), {
		onEnter(args) {
			strCtor(args[1], Memory.allocUtf8String("127.0.0.1")); // IP Address here
			strCtor(args[2], Memory.allocUtf8String("9339")); // Port here
		}
	});
	
	Interceptor.replace(base.add(0x7548d0), new NativeCallback(function(a1) {
		a1.writeByteArray([0xFF, 0x45, 0x12, 0x7A, 0x9C, 0x23, 0x4B, 0x67, 0xA1, 0x2D, 0x3E, 0x56, 0x90, 0xAB, 0xC8, 0xD3, 0xE5, 0xF4, 0x6B, 0x72, 0x85, 0x19, 0x3A, 0x4F, 0x28, 0x63, 0x92, 0xBD, 0xFA, 0x34, 0x76, 0x08]);
	}, 'void', ['pointer']));*/
}

function killCrypto() {
    console.log("Killing crypto")

    Armceptor.ret(base.add(0x34342C)); // Messaging::decryptData
    Interceptor.attach(base.add(0x604A18), {
        onEnter(a) {
            console.log("sec box open")
        }
    })
    Interceptor.attach(base.add(0x3E9D84), { // Messaging::sendPepperAuthentication
        onEnter(args) {
            console.log("PepperState is", args[0].add(16).readU32())
            this.messaging = args[0];
            args[0].add(16).writeU32(5);
            args[1] = args[2];
        },
        onLeave(re) {
            this.messaging.add(16).writeU32(5);
        }
    });
    Interceptor.attach(base.add(0x6975A0).add(0x108), function() { // Messaging::encryptAndWrite
       this.context.w0 = 0x2774;
    });
    console.log("Done")
}

function tempTests() {
    const target = base.add(0x47FBF0);

Interceptor.attach(target, function () {

    const x8 = this.context.x8;
    const relative = ptr(x8).sub(base);

    console.log("X8 =", x8);
    console.log("X8 (module offset) =", relative);

});
    console.log("Temp tests applied")
}

function hookDebugger() {
    console.log("Hooking debugger")
    Interceptor.attach(base.add(0x58E20C), { // Debugger::warning
        onEnter(args) {
            let warning = args[0].readCString();
            console.log("[Warning]", warning);
        }
    });
    Interceptor.attach(base.add(0x555D1C), { // Debugger::error
        onEnter(args) {
            let error = args[0].readCString();
            console.log("[Error]", error);
        }
    });
    console.log("Done")
}

function decodeString(src) {
  let len = src.add(4).readInt();
  if (len >= 8) {
    return src.add(8).readPointer().readUtf8String(len);
  }
  return src.add(8).readUtf8String(len);
}

rpc.exports = {
    init: function(stage, options) {
        console.log("Started")
        cache.options = options || {};
        //exceptionHandler()
        killArxan();
        setupHost();
        killCrypto();
        if (dev) {
            console.log("Dev mode enabled")
            hookDebugger()
            tempTests()
        }
    }
};