import RC4Encrypter from "./RC4/RC4Encrypter"
import PepperEncrypter from "./PepperCrypto/PepperEncrypter"
import CRYPTO_ENUM from "../Enums/CryptoTypes"

/**
 * StreamEncrypter
 * 
 * Class for working with encryption.
 * 
 * @param { Number } type - Crypto type
 */
class StreamEncrypter {
    constructor (type) {
        this.crypto = null;
        this.cryptoType = type

        switch (type) {
            case CRYPTO_ENUM.RC4:
                this.crypto = new RC4Encrypter();
            break;
            case CRYPTO_ENUM.PEPPER:
                this.crypto = new PepperEncrypter();
            break;
            default:
                Warn("Undefined crypto type: " + type)
        }
    }

    /**
     * Encrypt stream
     * @param { Number } type Message ID. Not used in case if crypto type is RC4
     * @param { Buffer } bytes Bytes to encrypt
     * @returns { Buffer } Encrypted bytes
     */
    encrypt (type, bytes) {
        switch (this.cryptoType) {
            case CRYPTO_ENUM.RC4:
                return this.crypto.encrypt(bytes);
            case CRYPTO_ENUM.PEPPER:
                return this.crypto.encrypt(type, bytes);
            default:
                Warn("Undefined crypto type: " + this.cryptoType)
                return bytes
        }
    }

    /**
     * Decrypt stream
     * @param { Number } type Message ID. Not used in case if crypto type is RC4
     * @param { Buffer } bytes Bytes to decrypt
     * @returns { Buffer } Decrypted bytes
     */
    decrypt (type, bytes) {
        switch (this.cryptoType) {
            case CRYPTO_ENUM.RC4:
                return this.crypto.decrypt(bytes);
            case CRYPTO_ENUM.PEPPER:
                return this.crypto.decrypt(type, bytes);
            default:
                Warn("Undefined crypto type: " + this.cryptoType)
                return bytes
        }
    }
}

export default StreamEncrypter