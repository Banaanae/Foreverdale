const LogicReflector = require("./LogicReflector.js");
const LogicRandom = require("./LogicRandom.js");
//const Debugger = require("./Debugger.js");
//const { getFromArray } = require("./ListUtils.js");

class LogicJSONInReflector extends LogicReflector {
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
        let jsonObject = null;

        if (this.currentObject) {
            jsonObject = this.currentObject[objectName];
        } else {
            jsonObject = getFromArray(this.currentArray, this.currentArrayIndex);
        }

        if (jsonObject) {
            this.pushStack();
            this.currentObject = jsonObject;
            return true;
        }

        return false;
    }

    reflectExitObject() {
        this.exitObject();
    }

    reflectInt(objectName, a4) {
        const jsonNumber = this.currentObject?.[objectName];

        if (jsonNumber !== undefined) {
            if (typeof jsonNumber === "number")
                return jsonNumber;
            else
                console.warn(`JSONNumber type is ${typeof jsonNumber}, key ${objectName}`);
        } else {
            console.error("LogicJSONInReflector: no current object exists");
        }

        return a4;
    }

    reflectBool(objectName, a4) {
        const jsonBoolean = this.currentObject?.[objectName];

        if (jsonBoolean !== undefined) {
            if (typeof jsonBoolean === "boolean")
                return jsonBoolean;
            else
                console.warn(`JSONBoolean type is ${typeof jsonBoolean}, key ${objectName}`);
        } else {
            console.error("LogicJSONInReflector: no current object exists");
        }

        return a4;
    }

    reflectLong(objectName, a6) {
        const jsonNumber = this.currentObject?.[objectName];

        if (jsonNumber !== undefined) {
            if (typeof jsonNumber === "number")
                return jsonNumber;
            else
                console.warn(`JSONNumber type is ${typeof jsonNumber}, key ${objectName}`);
        } else {
            console.error("LogicJSONInReflector: no current object exists");
        }

        return a6;
    }

    reflectString(objectName, a5 = "") {
        return this.getString(objectName, a5);
    }

    reflectRandom(rnd, objectName) {
        const jsonNumber = this.currentObject?.[objectName];

        if (jsonNumber !== undefined) {
            if (typeof jsonNumber === "number")
                rnd.setIteratedRandomSeed(jsonNumber);
            else
                console.warn(`JSONNumber type is ${typeof jsonNumber}, key ${objectName}`);
        } else {
            console.error("LogicJSONInReflector: no current object exists");
        }
    }

    reflectIntArray(objectName) {
        const result = [];

        if (this.enterArray(objectName)) {
            if (!this.currentArray)
                console.error("LogicJSONInReflector: no current array exists");

            const size = this.currentArray.length;

            for (let i = 0; i < size; i++)
                result.push(this.reflectNextInt());

            this.exitArray();
        }

        return result;
    }

    reflectArray(length, objectName) {
        if (!this.enterArray(objectName)) return -1;

        if (!this.currentArray)
            console.error("LogicJSONInReflector: no current array exists");

        return this.currentArray.length;
    }

    reflectExitArray() {
        this.exitArray();
    }

    reflectNextInt() {
        if (!this.currentArray)
            console.error("LogicJSONInReflector: no current array exists");

        const jsonNumber = getFromArray(this.currentArray, this.currentArrayIndex);
        this.currentArrayIndex++;

        if (jsonNumber !== undefined) {
            if (typeof jsonNumber === "number")
                return jsonNumber;
            else
                console.warn(`JSONNumber wrong type ${typeof jsonNumber}, index ${this.currentArrayIndex - 1}`);
        }

        return 0;
    }

    reflectNextBool() {
        if (!this.currentArray)
            console.error("LogicJSONInReflector: no current array exists");

        const jsonBoolean = getFromArray(this.currentArray, this.currentArrayIndex);
        this.currentArrayIndex++;

        if (jsonBoolean !== undefined) {
            if (typeof jsonBoolean === "boolean")
                return jsonBoolean;
            else
                console.warn(`JSONBoolean wrong type ${typeof jsonBoolean}, index ${this.currentArrayIndex - 1}`);
        }

        return false;
    }

    exitObject() {
        if (!this.currentObject)
            console.error("exitObject called while no current object exists");

        if (this.stackCount <= 0 || this.indexStackCount <= 0)
            console.error("Mismatched begin/end in LogicJSONInReflector");

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

    exitArray() {
        if (!this.currentArray)
            console.error("exitArray called while no current array exists");

        if (this.stackCount <= 0 || this.indexStackCount <= 0)
            console.error("Mismatched begin/end in LogicJSONInReflector");

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

    getString(objectName, a4) {
        const jsonString = this.currentObject?.[objectName];

        if (jsonString !== undefined) {
            if (typeof jsonString === "string")
                return String(jsonString);
            else
                console.warn(`JSONString type is ${typeof jsonString}, key ${objectName}`);
        } else {
            console.error("LogicJSONInReflector: no current object exists");
        }

        return a4;
    }

    enterArray(objectName) {
        let jsonArray = null;

        if (this.currentObject) {
            jsonArray = this.currentObject[objectName];

            if (!Array.isArray(jsonArray)) {
                console.warn(`JSONArray type is ${typeof jsonArray}, key ${objectName}`);
                jsonArray = null;
            }
        } else {
            jsonArray = getFromArray(this.currentArray, this.currentArrayIndex);

            if (!Array.isArray(jsonArray)) {
                console.warn(`JSONArray wrong type ${typeof jsonArray}, index ${this.currentArrayIndex}`);
                jsonArray = null;
            }

            this.currentArrayIndex++;
        }

        if (jsonArray && jsonArray.length !== 0) {
            this.pushStack();
            this.currentArray = jsonArray;
            return true;
        }

        return false;
    }
}

module.exports = LogicJSONInReflector