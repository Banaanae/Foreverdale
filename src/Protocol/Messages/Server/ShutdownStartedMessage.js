const { default: LogicConfig } = require("../../../Logic/Server/LogicConfig");
const PiranhaMessage = require("../../PiranhaMessage");

class ShutdownStartedMessage extends PiranhaMessage {
    constructor (session) {
        super(session)
        this.id = 24548
        this.version = 0
        this.stream = this.DataStream.getByteStream()
    }

    async encode () {
        this.stream.writeInt(LogicConfig)
    }
}

module.exports = ShutdownStartedMessage