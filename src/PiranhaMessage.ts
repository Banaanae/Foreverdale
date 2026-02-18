import DataStream from "./Titan/DataStream";
import ByteStream from "./Titan/DataStream/ByteStream";
import Messaging from './Networking/Messaging'


export class PiranhaMessage extends Messaging {
    id: number;
    session: any; // todo
    version: number;
    DataStream: any;

    constructor (session: any) {
        super(session)
        /**
         * Packet ID.
         */
        this.id = 0
        /**
         * Client variable.
         */
        this.session = session
        /**
         * Packet version.
         */
        this.version = 0
        this.DataStream = DataStream
    }

    static encode(stream: ByteStream) {}
    static decode(stream: ByteStream) {}
    static execute(stream: ByteStream) {}
}