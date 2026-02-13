import { ByteStream } from "../../ByteStream";
import { SendMessage } from "../../Messaging";
import { LoginOkMessage } from "../Server/LoginOkMessage";

export class LoginMessage {
    static decode(stream: ByteStream) {
        /*stream.readLong()
        stream.readString()
        stream.readInt()
        stream.readInt()
        stream.readInt()
        stream.readString()
        stream.readString()
        stream.readString()
        stream.readString()
        stream.readString()
        stream.readDataReference()
        stream.readString()
        stream.readString()
        stream.readString()
        stream.readBoolean()
        stream.readStringReference()
        stream.readStringReference()
        stream.readStringReference()
        stream.readBoolean()
        stream.readString()
        stream.readInt()
        stream.readVInt()
        stream.readStringReference()
        stream.readStringReference()
        stream.readStringReference()
        stream.readStringReference()
        stream.readStringReference()
        stream.readVInt()
        stream.readString()
        stream.readStringReference()
        stream.readStringReference()
        stream.readStringReference()

        if (stream.readBoolean()) {
            let len = stream.readBytesLength()
            for (let i = 0; i < len; i++)
                stream.readByte()
        }

        stream.readString() // Compressed
        stream.readVInt()
        stream.readBoolean()*/

        return
    }

    static execute(arg: any) {
        return SendMessage(29125, LoginOkMessage.encode(), 1)
    }
}