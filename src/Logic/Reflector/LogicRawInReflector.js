const LogicReflector = require("./LogicReflector.js");
const LogicReflectableFactory = require("../Reflectable/LogicReflectableFactory.js");

class LogicRawInReflector extends LogicReflector {
    constructor(byteStream) {
        super();
        this.byteStream = byteStream;
    }

    destruct() {
        this.byteStream = null;
    }

    reflectObject(objectName) {
        // Squad returns 1 (true)
        return true;
    }

    reflectObjectOptional(objectName, a3) {
        if (this.byteStream.readBoolean()) {
            this.reflectObject(objectName);
        }
    }

    reflectInt(value, objectName, a4) {
        if (this.byteStream.readBoolean()) {
            return this.byteStream.readVInt();
        } else {
            return a4;
        }
    }

    reflectBool(value, objectName) {
        return this.byteStream.readBoolean();
    }

    reflectLong(a2, highInt, lowInt, objectName, a6) {
        if (this.byteStream.readBoolean()) {
            return this.byteStream.readLongLong();
        } else {
            return a6;
        }
    }

    reflectString(value, objectName, a5) {
        if (this.byteStream.readBoolean()) {
            return this.byteStream.readString();
        } else {
            return a5;
        }
    }

    reflectRandom(rnd, objectName) {
        rnd.setIteratedRandomSeed(this.byteStream.readInt());
    }

    reflectIntArray(values, objectName) {
        const intArray = [];
        const count = this.byteStream.readVInt();

        if (count >= 0xFFFFFF)
            console.error("LogicRawInReflector::reflectIntArray invalid count");

        if (count >= 1) {
            for (let i = 0; i < count; i++) {
                intArray.push(this.byteStream.readVInt());
            }
        }

        return intArray;
    }

    reflectArray(length, objectName) {
        return 1;
    }

    reflectExitArray() {
        // Everdale & Squad don't read exitArray in raw
        // return this.byteStream.readInt8() === 105;
    }

    reflectNextObject() {
        return this.byteStream.readInt8() === 102;
    }

    reflectNextInt(value) {
        return this.byteStream.readVInt();
    }

    reflectNextBool(value) {
        return this.byteStream.readBoolean();
    }

    reflectNextReflectable(reflectableType) {
        const hasReflectable = this.byteStream.readBoolean();

        if (hasReflectable) {
            const reflectableId = this.byteStream.readVInt();

            if (reflectableId !== reflectableType) {
                console.error(
                    "LogicRawInReflector::reflectNextReflectablePointer(): required type mismatch"
                );
            } else {
                const ref = LogicReflectableFactory.createReflectable(reflectableType);
                return ref;
            }
        }

        return null;
    }

    reflectReflectablePointerBase(objectName, value) {
        // LogicRawInReflector + 8 init value = LogicReflector::sm_pDefaultReflectableIdMap
        return this.byteStream.readVInt();
    }
}

module.exports = LogicRawInReflector