import ByteStream from './ByteStream'
import BitStream from './BitStream'
import ByteStreamHelper from './ByteStream/Helper'

class DataStream {
    static getByteStream (bytes) {
        return new ByteStream(bytes)
    }

    static getByteStreamHelper (bytestream) {
        return new ByteStreamHelper(bytestream)
    }

    static getBitStream (bytes) {
        return new BitStream(bytes)
    }
}

export default DataStream