import { ByteStream } from "./ByteStream"
import { ClientHelloMessage } from "./Messages/Client/ClientHelloMessage"
import { TitanLoginMessage } from "./Messages/Client/TitanLoginMessage";

export class Messaging {
    static Send() {
        
    }
}

export function handleMessage(id: number, stream: ByteStream) {
    let response: any;

    switch (id) {
        case 10100: {
            response = ClientHelloMessage.execute(ClientHelloMessage.decode(stream))
            break
        }
        case 10101: {
            response = TitanLoginMessage.execute(TitanLoginMessage.decode(stream))
            break
        }
    }

    if (!response) return [];
    return Array.isArray(response) ? response : [response];
}

export function SendMessage(id: number, payloadArr: number[], version = 0) {
    const payload = Buffer.from(payloadArr);

    const header = Buffer.alloc(7);

    header.writeUInt16BE(id, 0);
    header.writeUIntBE(payload.length, 2, 3);
    header.writeUInt16BE(version, 5);

    return Buffer.concat([header, payload]);
}
