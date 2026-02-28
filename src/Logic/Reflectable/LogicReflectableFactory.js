// const { LogicDeliverableManager } = require('./LogicDeliverableManager');
const { LogicReflectable } = require('./LogicReflectable');

class LogicReflectableFactory {
    static reflectableTypes = {
        // 2207: LogicDeliverableManager
    };

    static reflectableExists(reflectableType) {
        return reflectableType in this.reflectableTypes;
    }

    static createReflectable(reflectableType) {
        if (this.reflectableExists(reflectableType)) {
            return new this.reflectableTypes[reflectableType]();
        } else {
            console.error(`createReflectable - unknown type ${reflectableType}`);
            return new LogicReflectable();
        }
    }
}

module.exports = { LogicReflectableFactory };