const PiranhaMessage = require("../../PiranhaMessage")

class VerifyTimeResponseMessage extends PiranhaMessage {
  constructor(session) {
    super(session)
    this.id = 27969
    this.version = 0
    this.stream = this.DataStream.getByteStream() // empty stream for writing
  }

  async encode() {
    for (let i = 0; i < 5; i++)
        this.stream.writeLongLong(0n)

    const serverTime = process.hrtime.bigint()
    this.stream.writeLongLong(serverTime)
  }
}

module.exports = VerifyTimeResponseMessage