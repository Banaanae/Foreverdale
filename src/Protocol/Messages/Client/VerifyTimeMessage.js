const PiranhaMessage = require('../../PiranhaMessage')
const VerifyTimeResponseMessage = require('../Server/VerifyTimeResponseMessage')

class VerifyTimeMessage extends PiranhaMessage {
  constructor(bytes, session) {
    super(session)
    this.id = 16544
    this.version = 0
    this.stream = this.DataStream.getByteStream(bytes)
  }

  async decode() {
    const time = this.stream.readLong() // read first long
    //this.firstTime = (BigInt(time[0] >>> 0) << 32n) | BigInt(time[1] >>> 0)
  }

  async execute() {
    // Send response with only the first long
    await new VerifyTimeResponseMessage(this.session).send()
  }
}

module.exports = VerifyTimeMessage