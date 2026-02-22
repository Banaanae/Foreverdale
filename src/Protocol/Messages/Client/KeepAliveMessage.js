const PiranhaMessage = require('../../PiranhaMessage')
const KeepAliveServerMessage = require('../Server/KeepAliveServerMessage')

class KeepAliveMessage extends PiranhaMessage {
    constructor (bytes, session) {
        super(session)
        this.id = 10108
        this.version = 0
        this.stream = this.DataStream.getByteStream(bytes)
    }

    async decode() {}

    async execute() {
        await new KeepAliveServerMessage(this.session).send()
    }
}

module.exports = KeepAliveMessage