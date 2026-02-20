const SERVER_ENV_ENUM = require("../Titan/Enums/ServerEnv")

class LogicVersion {
    static major = 11
    static minor = 99
    static build = 0

    static environment = SERVER_ENV_ENUM.DEV

    static getVersionString () {
        return [LogicVersion.major, LogicVersion.minor, LogicVersion.build].join(".")
    }

    static getServerEnv () {
        const currentEnv = Object.keys(SERVER_ENV_ENUM).find(env => SERVER_ENV_ENUM[env] === this.environment)
      
        return currentEnv ? currentEnv.toLowerCase() : 'unknown'
    }

    static isProd = () => this.environment === SERVER_ENV_ENUM.PROD
    static isStage = () => this.environment === SERVER_ENV_ENUM.STAGE
    static isIntegration = () => this.environment === SERVER_ENV_ENUM.INTEGRATION
    static isDev = () => this.environment === SERVER_ENV_ENUM.DEV
}

module.exports = LogicVersion