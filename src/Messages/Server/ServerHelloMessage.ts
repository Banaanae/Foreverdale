import { PiranhaMessage } from "../../PiranhaMessage";
import crypto from 'crypto';

export class ServerHelloMessage extends PiranhaMessage {
    stream: any;

    constructor (session: any) {
        super(session)
        this.id = 20100
        this.version = 0
        this.stream = this.DataStream.getByteStream()
    }

    async encode() {
        this.stream.writeBytes(crypto.randomBytes(24))
    }
}