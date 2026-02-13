import { ByteStream } from "../../ByteStream";

export class LoginOkMessage {
    static encode() {
        let stream = new ByteStream([])

        stream.writeLong(0, 1);
        stream.writeLong(0, 1);
        stream.writeString("abc");
        stream.writeString("");
        stream.writeString("");
        stream.writeInt(1);
        stream.writeInt(2);
        stream.writeInt(3);
        stream.writeInt(4);
        stream.writeString("prod");
        stream.writeInt(0);
        stream.writeInt(0);
        stream.writeInt(0);
        stream.writeString("");
        stream.writeString(Date.now().toString());
        stream.writeString("1714237625000");
        stream.writeInt(0);
        stream.writeString("");
        stream.writeString("AU");
        stream.writeString("");
        stream.writeInt(3);
        stream.writeString("");
        stream.writeString("");
        stream.writeString("");
        stream.writeString("");
        stream.writeBoolean(true);
        stream.writeBoolean(false);
        stream.writeBoolean(false);
        stream.writeVInt(0);
        stream.writeString("");

        return stream.payload
    }
}