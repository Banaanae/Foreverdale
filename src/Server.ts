import { handleMessage } from "./Messaging";
import { ByteStream } from "./ByteStream";

const net = require("net");

export const server = net.createServer((socket: any) => {
    console.log("Client connected:", socket.remoteAddress, socket.remotePort);

    socket.on("data", (data: Buffer) => {
        const messageId = data.slice(0, 2).readUInt16BE(0)
        const messageLen = data.slice(2, 5).readUIntBE(0, 3)
        let stream = new ByteStream(Array.from(new Uint8Array(data.slice(5))));

        console.log("Received message ID:", messageId, `(Length: ${messageLen})`)

        let log = ""
        for (let i = 0; i < stream.payload.length; i++)
            log += stream.payload[i].toString(16).padStart(2, "0") + " "

        console.log(log)


        const responses = handleMessage(messageId, stream);

        if (responses) {
            for (const packet of responses) {
                console.log(packet)
                socket.write(packet);
            }
        }

    });

    socket.on("close", () => {
        console.log("Client disconnected");
    });
});