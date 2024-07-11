"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptPipeline = void 0;
const crypto_1 = __importDefault(require("crypto"));
const lodash_1 = require("lodash");
const cryptSymbol = "__SYM_QUICKDB_CRYPT__{%encoding%;%payload%}";
const cryptSymbolVars = ["encoding", "payload"];
const Encoding = ["base64", "base64url", "hex"];
const StringEncoding = [
    "ascii",
    "utf8",
    "utf-8",
    "utf16le",
    "ucs2",
    "ucs-2",
    "base64",
    "base64url",
    "latin1",
    "hex",
    "binary",
];
const algorithmByteSizes = {
    custom: -1,
    "aes-128-cbc": 16,
    "aes-192-cbc": 24,
    "aes-256-cbc": 32,
};
const CryptoAlgorithm = Object.keys(algorithmByteSizes);
function makePayloadExtractor(template) {
    const varSymLength = 2;
    const varRegex = /%((?:[a-zA-Z_])+)%/gm;
    const indices = [];
    let result;
    while ((result = varRegex.exec(template))) {
        indices.push({
            index: result.index,
            length: result[1].length,
            name: result[1],
        });
    }
    const parts = [];
    let lastInd = 0;
    for (const part of indices) {
        parts.push(template.substring(lastInd, part.index));
        lastInd = part.index + part.length + varSymLength;
    }
    if (lastInd < template.length)
        parts.push(template.slice(lastInd, template.length));
    let payloadRegexStr = "^";
    for (let i = 0; i < parts.length - 1; i++) {
        payloadRegexStr += parts[i];
        payloadRegexStr += "(.*)";
    }
    payloadRegexStr += parts[parts.length - 1];
    payloadRegexStr += "$";
    const payloadRegex = new RegExp(payloadRegexStr);
    function payloadExtractor(str) {
        if (!payloadRegex.test(str))
            return undefined;
        const matches = payloadRegex.exec(str);
        const ret = {};
        for (let i = 0; i < indices.length; i++) {
            const variable = indices[i];
            const match = matches[i + 1];
            ret[variable.name] = match;
        }
        return ret;
    }
    return payloadExtractor;
}
class CryptPipeline {
    options;
    payloadExtractor;
    encryptor;
    decryptor;
    constructor(options) {
        options.algorithm ??= "aes-128-cbc";
        options.encoding ??= "hex";
        options.solveEncoding ??= true;
        const byteSize = algorithmByteSizes[options.algorithm];
        if (options.algorithm !== "custom" &&
            (!options.key || options.key.length !== byteSize))
            throw new Error(`Encryption key must have ${byteSize} bytes`);
        if (!CryptoAlgorithm.includes(options.algorithm))
            throw new Error("Algorithm is not supported");
        if (!Encoding.includes(options.encoding))
            throw new Error("Encoding is not supported");
        options.solveEncoding = !!options.solveEncoding;
        this.options = {
            key: options.key,
            algorithm: options.algorithm,
            encoding: options.encoding,
            solveEncoding: options.solveEncoding,
            byteSize: 16,
        };
        this.payloadExtractor =
            makePayloadExtractor(cryptSymbol);
        if (("encryptor" in options && !("decryptor" in options)) ||
            (!("encryptor" in options) && "decryptor" in options))
            throw new Error("Both an encryptor and decryptor must be provided when using a custom algorithm.");
        else
            options.algorithm = "custom";
        if ("encryptor" in options) {
            if (typeof options.encryptor !== "function")
                throw new Error("Encriptor is not a function.");
            this.encryptor = options.encryptor;
        }
        else {
            this.encryptor ??= async function (options, data) {
                try {
                    const iv = crypto_1.default.randomBytes(options.byteSize);
                    const cipher = crypto_1.default.createCipheriv(options.algorithm, Buffer.from(options.key), iv);
                    const stringifiedData = typeof data === "string" ? data : JSON.stringify(data);
                    return Buffer.concat([
                        cipher.update(stringifiedData),
                        cipher.final(),
                        iv,
                    ]).toString(options.encoding);
                }
                catch (e) {
                    const err = e instanceof Error ? e : new Error(`${e}`);
                    throw new Error("Unknown error", { cause: err });
                }
            };
        }
        if ("decryptor" in options) {
            if (typeof options.decryptor !== "function")
                throw new Error("Decriptor is not a function.");
            this.decryptor = options.decryptor;
        }
        else {
            this.decryptor ??= async function (options, data, encoding) {
                try {
                    encoding ??= "utf8";
                    const binaryData = Buffer.from(data, options.encoding);
                    const iv = binaryData.subarray(binaryData.length - options.byteSize, binaryData.length);
                    const encryptedData = binaryData.subarray(0, binaryData.length - options.byteSize);
                    const decipher = crypto_1.default.createDecipheriv(options.algorithm, Buffer.from(options.key), iv);
                    const decrypted = Buffer.concat([
                        decipher.update(encryptedData),
                        decipher.final(),
                    ]);
                    return decrypted.toString(encoding);
                }
                catch (e) {
                    const err = e instanceof Error ? e : new Error(`${e}`);
                    if (err.message.includes("error:1C800064:Provider routines::bad decrypt"))
                        throw new Error("Bad decrypt");
                    throw new Error("Unknown error", { cause: err });
                }
            };
        }
    }
    async serialize(value) {
        try {
            const encryptedData = await this.encryptor(this.options, value);
            return cryptSymbol
                .replace("%encoding%", this.options.encoding)
                .replace("%payload%", encryptedData);
        }
        catch (e) {
            const err = e instanceof Error ? e : new Error(`${e}`);
            throw new Error("Unable to encrypt data", { cause: err });
        }
    }
    async deserialize(data) {
        try {
            const nData = data.trim().replace(/^"/, "").replace(/"$/, "");
            const payload = this.payloadExtractor(nData);
            if (!payload) {
                return data;
            }
            const options = { ...this.options };
            if (payload.encoding !== "null") {
                if (payload.encoding !== this.options.encoding &&
                    !this.options.solveEncoding)
                    throw new Error(`Invalid encoding. Expected '${this.options.encoding}', but got '${payload.encoding}'`);
                if (Encoding.includes(payload.encoding))
                    options.encoding = payload.encoding;
            }
            const decryptedData = await this.decryptor(options, payload.payload, "utf8");
            try {
                return JSON.parse(decryptedData);
            }
            catch (_) {
                return decryptedData;
            }
        }
        catch (e) {
            let err = undefined;
            if ((0, lodash_1.isError)(e)) {
                err = e;
            }
            else {
                err = new Error(`${e}`);
            }
            throw new Error("Unable to decrypt data", { cause: err });
        }
    }
}
exports.CryptPipeline = CryptPipeline;
//# sourceMappingURL=crypt.js.map