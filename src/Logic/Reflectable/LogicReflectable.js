class LogicReflectable {
    constructor() {
        if (new.target === LogicReflectable) {
            throw new Error("Cannot instantiate abstract class LogicReflectable directly");
        }
    }

    reflect(reflector, reflectableData) {
        // Override in subclass
        throw new Error("reflect() must be implemented by subclass");
    }

    getReflectableId() {
        return -1;
    }

    destruct() {
        // Optional override
    }
}

module.exports = LogicReflectable