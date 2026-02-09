import { ByteStream } from "../../ByteStream"
import { SendMessage } from "../../Messaging"
import { ServerHelloMessage } from "../Server/ServerHelloMessage"

export class ClientHelloMessage {
    static decode(stream: ByteStream) {
        let values = []
        values[1] = stream.readInt()
        values[2] = stream.readInt()
        values[3] = stream.readInt()
        values[4] = stream.readInt()
        values[5] = stream.readInt()
        values[6] = stream.readStringReference()
        values[7] = stream.readInt()
        values[8] = stream.readInt()

        console.log(values.join())

        return
    }

    static execute(data: any) {
        return SendMessage(20100, ServerHelloMessage.encode())
    }
}