import { PiranhaMessage } from "../../PiranhaMessage";

export class LoginOkMessage extends PiranhaMessage {
    stream: any;

    constructor (session: any) {
        super(session)
        this.id = 29125
        this.version = 1
        this.stream = this.DataStream.getByteStream()
    }

    async encode() {
        this.stream.writeLong(0, 1);
        this.stream.writeLong(0, 1);
        this.stream.writeString("abc");
        this.stream.writeString("");
        this.stream.writeString("");
        this.stream.writeInt(1);
        this.stream.writeInt(2);
        this.stream.writeInt(3);
        this.stream.writeInt(4);
        this.stream.writeString("prod");
        this.stream.writeInt(0);
        this.stream.writeInt(0);
        this.stream.writeInt(0);
        this.stream.writeString("");
        this.stream.writeString(Date.now().toString());
        this.stream.writeString("1714237625000");
        this.stream.writeInt(0);
        this.stream.writeString("");
        this.stream.writeString("AU");
        this.stream.writeString("");
        this.stream.writeInt(3);
        this.stream.writeString("");
        this.stream.writeString("");
        this.stream.writeString("");
        this.stream.writeString("");
        this.stream.writeBoolean(true);
        this.stream.writeBoolean(false);
        this.stream.writeBoolean(false);
        this.stream.writeVInt(0);
        this.stream.writeString("");
    }
}