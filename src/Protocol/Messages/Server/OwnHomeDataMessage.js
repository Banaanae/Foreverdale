const PiranhaMessage = require('../../PiranhaMessage')

class OwnHomeDataMessage extends PiranhaMessage {
    constructor (session) {
        super(session)
        this.id = 24548
        this.version = 0
        this.stream = this.DataStream.getByteStream()
    }

    async encode() {
        this.stream.writeInt(1)
        this.stream.writeLong(0, 1)
        // (a1 + 160) + 24LL)
        this.stream.writeInt(1)
    }
}

module.exports = OwnHomeDataMessage