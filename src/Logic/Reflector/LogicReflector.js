class LogicReflector {
    constructor() {
        if (new.target === LogicReflector) {
            throw new Error("Cannot instantiate abstract class LogicReflector directly");
        }

        if (this.destruct === undefined) {
            throw new Error("Class extending LogicReflector must implement destruct()");
        }
    }

    destruct() {
        throw new Error("destruct() must be implemented by subclass");
    }
}

module.exports = LogicReflector;