import { PiranhaMessage } from "../../PiranhaMessage"
import { ServerHelloMessage } from "../Server/ServerHelloMessage"

export class ClientHelloMessage extends PiranhaMessage {
    stream: any;

    constructor (session: any) {
        super(session)
        this.id = 10100
        this.version = 0
        this.stream = this.DataStream.getByteStream()
    }

    async decode() {
        let values = []
        values[0] = this.stream.readInt()
        values[1] = this.stream.readInt()
        values[2] = this.stream.readInt()
        values[3] = this.stream.readInt()
        values[4] = this.stream.readInt()
        values[5] = this.stream.readStringReference()
        values[6] = this.stream.readInt()
        values[7] = this.stream.readInt()

        console.log(values.join())

        return
    }

    async execute(data: any) {
        await new ServerHelloMessage(this.session).send()
    }
}