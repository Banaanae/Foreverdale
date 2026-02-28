const LogicReflector = require("./LogicReflector.js");
const LogicReflectable = require("../Reflectable/LogicReflectable.js");
const LogicLong = require("../../Titan/LogicLong.js")

class LogicRawOutReflector extends LogicReflector {
    constructor(byteStream) {
        super();
        this.byteStream = byteStream;
    }

    destruct() {
        this.byteStream = null;
    }

    reflectObject(objectName) {
        // Everdale & Squad do NOT write enterObject in raw
        // this.byteStream.writeInt8(102);
    }

    reflectObjectOptional(objectName, a3) {
        this.byteStream.writeBoolean(a3);
        if (a3) this.reflectObject(objectName);
    }

    reflectExitObject() {
        // Everdale & Squad do NOT write exitObject in raw
        // this.byteStream.writeInt8(103);
    }

    reflectInt(value, objectName, a4) {
        if (value === a4) {
            this.byteStream.writeBoolean(false);
        } else {
            this.byteStream.writeBoolean(true);
            this.byteStream.writeVInt(value);
        }
    }

    reflectBool(value, objectName) {
        this.byteStream.writeBoolean(value);
    }

    reflectLong(a2, highInt, lowInt, objectName, a6) {
        const longValue = LogicLong.toLong(highInt, lowInt);

        if (longValue === a6) {
            this.byteStream.writeBoolean(false);
        } else {
            this.byteStream.writeBoolean(true);
            this.byteStream.writeLongLong(highInt, longValue);
        }
    }

    reflectString(value, objectName, a5) {
        if (value === a5) {
            this.byteStream.writeBoolean(false);
        } else {
            this.byteStream.writeBoolean(true);
            this.byteStream.writeString(value);
        }
    }

    reflectStringPtr(value, objectName) {
        this.byteStream.writeString(value);
    }

    reflectRandom(rnd, objectName) {
        this.byteStream.writeInt(rnd.seed);
    }

    reflectIntArray(values, objectName) {
        const count = values.length;
        this.byteStream.writeVInt(count);

        if (count >= 1) {
            for (let i = 0; i < count; i++) {
                this.byteStream.writeVInt(values[i]);
            }
        }
    }

    reflectArray(length, objectName) {
        // Everdale & Squad do NOT write enterArray in raw
        // this.byteStream.writeInt8(104);
        //this.byteStream.writeVInt(length);
    }

    reflectExitArray() {
        // Everdale & Squad do NOT write exitArray in raw
        // this.byteStream.writeInt8(105);
    }

    reflectNextObject() {
        // this.byteStream.writeInt8(102);
    }

    reflectNextInt(value) {
        this.byteStream.writeVInt(value);
    }

    reflectNextBool(value) {
        this.byteStream.writeBoolean(value);
    }

    reflectReflectablePointerBase(objectName, value = 0) {
        this.byteStream.writeVInt(value); // :gene:
    }

    reflectNextReflectable(reflectable, reflectableType, reflectableData) {
        if (reflectable != null) {
            // Only call new if it's a class/constructor
            if (typeof reflectable === "function") {
                reflectable = new reflectable();
            } else if (!(reflectable instanceof LogicReflectable)) {
                console.error("reflectNextReflectable - invalid reflectable passed");
                return null;
            }

            this.byteStream.writeBoolean(true); // Has Reflectable

            if (reflectableType === -1) {
                this.byteStream.writeVInt(reflectable.getReflectableId());
            } else if (reflectable.getReflectableId() !== reflectableType) {
                console.error(
                    "reflectNextReflectable - value type doesn't match required type"
                );
            }

            reflectable.reflect(this, reflectableData);
            return reflectable;
        } else {
            this.byteStream.writeBoolean(false);
        }

        return null;
    }
}

module.exports = LogicRawOutReflector