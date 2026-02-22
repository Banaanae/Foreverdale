const PiranhaMessage = require("../../PiranhaMessage")

class KeepAliveServerMessage extends PiranhaMessage {
    constructor (session) {
        super(session)
        this.id = 20108
        this.version = 0
        this.stream = this.DataStream.getByteStream()
    }

    async encode () {}
}

module.exports = KeepAliveServerMessage