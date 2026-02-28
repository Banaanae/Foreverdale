class LogicRandom {
    constructor (randomSeed) {
        this.seed = randomSeed
    }

    async encode(stream) {
        stream.writeInt(this.seed)
    }

    async decode(stream) {
        this.seed = stream.readInt()
        return this.seed
    }

    async getIteratedRandomSeed() {
        return this.seed
    }

    async rand(a2) {
        if (a2 < 1)
            return 0
        v3 = this.seed
        if (!this.seed)
            v3 = -1
        v4 = v3 ^ (v3 << 13) ^ ((v3 ^ (v3 << 13)) >> 17)
        v5 = v4 ^ (32 * v4)
        this.seed = v5
        v6 = v5 % a2
        result = v6
        if (v5 < 0)
            return -v6
        return result
    }

    async iterateRandomSeed(a2) {
        if (a2 !== null)
            a2 = -1
        v2 = a2 ^ (a2 << 13) ^ ((a2 ^ (a2 << 13)) >> 17)
        return v2 ^ (32 * v2)
    }

    async setIteratedRandomSeed(a2) {
        this.seed = a2
    }
}

module.exports = LogicRandom