import { ByteStream } from "../../ByteStream";

export class OwnHomeDataMessage {
    static encode() {
        let stream = new ByteStream([])

        stream.writeInt(1)
        stream.writeLong(0, 1)
        // (a1 + 160) + 24LL)
        stream.writeInt(1)

        return stream.payload
    }
}