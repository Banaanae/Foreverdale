const PiranhaMessage = require("../../PiranhaMessage")

class VerifyTimeResponseMessage extends PiranhaMessage {
  constructor(session) {
    super(session)
    this.id = 27969
    this.version = 0
    this.stream = this.DataStream.getByteStream() // empty stream for writing
  }

  async encode() {
    // 1️⃣ First long = echoed from client
    this.stream.writeLongLong(0n)

    // 2️⃣ Next 4 longs = placeholders (zeros)
    for (let i = 0; i < 4; i++) this.stream.writeLongLong(0n)

    // 3️⃣ Sixth long = monotonic server timestamp
    const serverTime = process.hrtime.bigint()
    this.stream.writeLongLong(serverTime)
  }
}

module.exports = VerifyTimeResponseMessage