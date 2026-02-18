import { PiranhaMessage } from "../../PiranhaMessage";
import { LoginOkMessage } from "../Server/LoginOkMessage";
import { OwnHomeDataMessage } from "../Server/OwnHomeDataMessage";

export class LoginMessage extends PiranhaMessage {
    stream: any;

    constructor (session: any) {
        super(session)
        this.id = 10101
        this.version = 0
        this.stream = this.DataStream.getByteStream()
    }

    async decode() {
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
        this.stream.readDataReference()
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
            let len = this.stream.readBytesLength()
            for (let i = 0; i < len; i++)
                this.stream.readByte()
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