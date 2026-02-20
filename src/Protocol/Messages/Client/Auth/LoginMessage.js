const ByteStreamHelper = require('../../../../Titan/DataStream/ByteStream/Helper')
const PiranhaMessage = require('../../../PiranhaMessage')
const LoginOkMessage = require('../../Server/Auth/LoginOkMessage')
const OwnHomeDataMessage = require('../../Server/OwnHomeDataMessage')

class LoginMessage extends PiranhaMessage {
    constructor (bytes, session) {
        super(session)
        this.id = 10101
        this.version = 0
        this.stream = this.DataStream.getByteStream(bytes)
    }

    async decode() {
        //const helper = this.DataStream.getByteStreamHelper(this.stream)

        this.stream.readLong()
        this.stream.readString()
        this.stream.readInt()
        this.stream.readInt()
        this.stream.readInt()
        this.stream.readString()
        this.stream.readString()
        this.stream.readString()
        this.stream.readString()
        this.stream.readString()
        let high = this.stream.readVInt() // TODO: data ref
        if (high)
            this.stream.readVInt()
        this.stream.readString()
        this.stream.readString()
        this.stream.readString()
        this.stream.readBoolean()
        this.stream.readStringReference()
        this.stream.readStringReference()
        this.stream.readStringReference()
        this.stream.readBoolean()
        this.stream.readString()
        this.stream.readInt()
        this.stream.readVInt()
        this.stream.readStringReference()
        this.stream.readStringReference()
        this.stream.readStringReference()
        this.stream.readStringReference()
        this.stream.readStringReference()
        this.stream.readVInt()
        this.stream.readString()
        this.stream.readStringReference()
        this.stream.readStringReference()
        this.stream.readStringReference()

        if (this.stream.readBoolean()) {
            this.stream.readBytes()
        }

        this.stream.readString() // Compressed
        this.stream.readVInt()
        this.stream.readBoolean()

        return
    }

    async execute() {
        await new LoginOkMessage(this.session).send()
        await new OwnHomeDataMessage(this.session).send()
    }
}

module.exports = LoginMessage