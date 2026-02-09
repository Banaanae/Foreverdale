import { ByteStream } from "../../ByteStream";

const crypto = require('crypto');

export class ServerHelloMessage {
    static encode() {
        let stream = new ByteStream([])

        stream.writeBytes(crypto.randomBytes(24), 24)

        return stream.payload
    }
}