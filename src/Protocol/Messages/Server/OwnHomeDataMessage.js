const PiranhaMessage = require('../../PiranhaMessage')

class OwnHomeDataMessage extends PiranhaMessage {
    constructor (session) {
        super(session)
        this.id = 24548
        this.version = 0
        this.stream = this.DataStream.getByteStream()
    }

    async encode() {
        this.stream.writeInt(Date.now())
        this.stream.writeLongLong(0, 1)

        // LogicClientAvatar::encode
        // 7AB9E8

        this.stream.writeLongLong(0, 1)
        this.stream.writeStringReference("Banaanae")
        this.stream.writeInt(-1) // reg state
        this.stream.writeVInt(0)
        this.stream.writeVInt(0)
        this.stream.writeVInt(0)
        this.stream.writeVInt(0)

        // 683D00

        //this.stream.writeHex(decoder.decode(new Uint8Array([0x02, 0xE7])))

        if (false) {
            this.stream.writeBoolean(true)
            this.stream.writeLongLong(0, 1)
        } else {
            this.stream.writeBoolean(false)
        }

        this.stream.writeBoolean(true)
        this.stream.writeString("Banaanae")
        this.stream.writeInt(0)
        this.stream.writeInt(0)
        this.stream.writeInt(0)
        this.stream.writeInt(0)
        this.stream.writeInt(0)

        // v5 = (a1 + 80)
        // v5 > 0
        this.stream.writeBoolean(false)
        if (false) {
            this.stream.writeString("") // a1 + 64
        } else {
            this.stream.writeBytes(Buffer.from([0x00])) // a1 + 80
        }

        this.stream.writeLongLong(0, 1)
        this.stream.writeLongLong(0, 1)
        this.stream.writeBoolean(false)
        this.stream.writeInt(0)
        this.stream.writeInt(0)
        this.stream.writeBoolean(false)
        this.stream.writeInt(0)
        this.stream.writeLongLong(0, 1)
        this.stream.writeVInt(0)
        this.stream.writeLongLong(0, 1)
        this.stream.writeVInt(0)

        this.stream.writeInt(0)
    }
}

module.exports = OwnHomeDataMessage