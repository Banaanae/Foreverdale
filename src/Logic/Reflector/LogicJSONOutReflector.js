const LogicReflector = require("./LogicReflector.js")
const LogicRandom = require("../LogicRandom.js")
const LogicLong = require("../../Titan/LogicLong.js")

class LogicJSONOutReflector extends LogicReflector {
    constructor(data) {
        super();

        this.jsonData = data;
        this.stack = [];
        this.stackCount = 0;

        if (data && typeof data === "object" && !Array.isArray(data)) {
            this.currentObject = data;
            this.currentArray = null;
        } else if (Array.isArray(data)) {
            this.currentObject = null;
            this.currentArray = data;
        }

        this.currentArrayIndex = 0;
        this.indexStack = [];
        this.indexStackCount = 0;
    }

    destruct() {
        this.jsonData = null;
        this.stack = null;
        this.stackCount = 0;
        this.indexStack = null;
        this.indexStackCount = 0;
        this.currentArray = null;
        this.currentObject = null;
        this.currentArrayIndex = 0;
    }

    reflectObject(objectName) {
        this.beginObject(objectName);
        return true;
    }

    reflectExitObject() {
        this.endObject();
    }

    reflectInt(value, objectName, a4, endArray = false) {
        if (value === a4) {
            if (endArray) {
                this.currentArray.splice(this.currentArrayIndex, 1);
                if (this.currentArrayIndex !== 0)
                    this.currentArrayIndex--;
            }
            return;
        }

        if (!this.currentArray)
            this.currentObject[objectName] = value;
        else
            this.currentArray[this.currentArrayIndex][objectName] = value;

        if (endArray) this.currentArrayIndex++;
    }

    reflectBool(value, objectName, a4, endArray = false) {
        if (value === a4) {
            if (endArray) {
                this.currentArray.splice(this.currentArrayIndex, 1);
                if (this.currentArrayIndex !== 0)
                    this.currentArrayIndex--;
            }
            return;
        }

        if (!this.currentArray)
            this.currentObject[objectName] = value;
        else
            this.currentArray[this.currentArrayIndex][objectName] = value;

        if (endArray) this.currentArrayIndex++;
    }

    reflectLong(highInt, lowInt, objectName, a7, a8) {
        const longValue = LogicLong.toLong(highInt, lowInt);
        const defaultValue = LogicLong.toLong(a7, a8);

        if (!this.currentObject)
            console.error("LogicJSONOutReflector: no object exists");

        if (longValue !== defaultValue)
            this.currentObject[objectName] = longValue;
    }

    reflectString(value, objectName, a5) {
        this.setString(objectName, value, a5);
    }

    reflectRandom(rnd, objectName) {
        const seed = rnd.seed;

        if (!this.currentObject)
            console.error("LogicJSONOutReflector: no object exists");

        if (seed === 0) return;

        this.currentObject[objectName] = seed;
    }

    reflectIntArray(values, objectName) {
        this.beginArray(objectName, 0);
        for (const value of values)
            this.reflectNextInt(value);
        this.endArray();
    }

    reflectArray(length, objectName, dictDisabled = true) {
        if (length >= 1)
            this.beginArray(objectName, dictDisabled ? 0 : length);
        return length;
    }

    reflectExitArray() {
        this.endArray();
    }

    reflectNextInt(value) {
        if (!this.currentArray)
            console.error("LogicJSONOutReflector: no array exists");

        if (typeof value === "number")
            this.currentArray.push(value);
        else if (Array.isArray(value))
            this.currentArray.push(...value);
    }

    reflectNextBool(value) {
        if (!this.currentArray)
            console.error("LogicJSONOutReflector: no array exists");

        this.currentArray.push(value);
    }

    beginObject(objectName) {
        const jsonObject = {};

        if (this.currentObject)
            this.currentObject[objectName] = jsonObject;
        else
            this.currentArray.push(jsonObject);

        this.pushStack();
        this.currentObject = jsonObject;
    }

    endObject() {
        if (!this.currentObject)
            console.error("endObject called while no current object exists");

        if (this.stackCount <= 0 || this.indexStackCount <= 0)
            console.error("Mismatched begin/end in LogicJSONOutReflector");

        const jsonObject = this.stack.pop();
        this.stackCount--;

        this.currentArrayIndex = this.indexStack.pop();
        this.indexStackCount--;

        this.currentObject = null;
        this.currentArray = null;

        if (Array.isArray(jsonObject))
            this.currentArray = jsonObject;
        else if (typeof jsonObject === "object")
            this.currentObject = jsonObject;
        else
            console.error("Unsupported object type in stack");
    }

    beginArray(objectName, length) {
        const jsonArray = [];

        for (let i = 0; i < length; i++)
            jsonArray.push({});

        if (this.currentObject)
            this.currentObject[objectName] = jsonArray;
        else
            this.currentArray.push(jsonArray);

        this.pushStack();
        this.currentArray = jsonArray;
        this.currentArrayIndex = 0;
    }

    endArray() {
        if (!this.currentArray)
            console.error("endArray called while no current array exists");

        if (this.stackCount <= 0 || this.indexStackCount <= 0)
            console.error("Mismatched begin/end in LogicJSONOutReflector");

        const jsonObject = this.stack.pop();
        this.stackCount--;

        this.currentArrayIndex = this.indexStack.pop();
        this.indexStackCount--;

        this.currentObject = null;
        this.currentArray = null;

        if (Array.isArray(jsonObject))
            this.currentArray = jsonObject;
        else if (typeof jsonObject === "object")
            this.currentObject = jsonObject;
        else
            console.error("Unsupported object type in stack");
    }

    setString(objectName, value, a4) {
        if (!this.currentObject)
            console.error("LogicJSONOutReflector: no object exists");

        if (value !== a4)
            this.currentObject[objectName] = value;
    }

    addString(value) {
        if (!this.currentArray)
            console.error("LogicJSONOutReflector: no array exists");

        this.currentArray.push(value);
    }

    addInt(value) {
        if (!this.currentArray)
            console.error("LogicJSONOutReflector: no array exists");

        if (typeof value === "number")
            this.currentArray.push(value);
        else if (Array.isArray(value))
            this.currentArray.push(...value);
    }

    addBool(value) {
        if (!this.currentArray)
            console.error("LogicJSONOutReflector: no array exists");

        this.currentArray.push(value);
    }

    addFloat(value) {
        if (!this.currentArray)
            console.error("LogicJSONOutReflector: no array exists");

        this.currentArray.push(Math.trunc(value));
    }

    pushStack() {
        let jsonRoot = this.currentObject ?? this.currentArray;

        this.stack.push(jsonRoot);
        this.stackCount++;

        this.indexStack.push(this.currentArrayIndex);
        this.indexStackCount++;

        this.currentObject = null;
        this.currentArray = null;
        this.currentArrayIndex = 0;
    }
}

module.exports = LogicJSONOutReflector