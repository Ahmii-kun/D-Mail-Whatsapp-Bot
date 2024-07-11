/// <reference types="node" />
import { IPipeline } from "../../interfaces/IPipeline";
declare const Encoding: readonly ["base64", "base64url", "hex"];
declare const StringEncoding: readonly ["ascii", "utf8", "utf-8", "utf16le", "ucs2", "ucs-2", "base64", "base64url", "latin1", "hex", "binary"];
declare const algorithmByteSizes: {
    readonly custom: -1;
    readonly "aes-128-cbc": 16;
    readonly "aes-192-cbc": 24;
    readonly "aes-256-cbc": 32;
};
declare const CryptoAlgorithm: string[];
type CryptoAlgorithm = keyof typeof algorithmByteSizes;
type Encoding = (typeof Encoding)[number];
type StringEncoding = (typeof StringEncoding)[number];
export interface BuiltInCryptOptions {
    key: string | Buffer;
    algorithm?: CryptoAlgorithm;
    encoding?: Encoding;
    solveEncoding?: boolean;
}
export interface CustomCryptOptions extends BuiltInCryptOptions {
    encryptor: Cryptor;
    decryptor: Cryptor;
}
export type ResolvedCryptOptions = Required<BuiltInCryptOptions> & {
    byteSize: number;
};
export type CryptOptions = BuiltInCryptOptions | CustomCryptOptions;
export type Cryptor = (options: ResolvedCryptOptions, data: string, encoding?: StringEncoding) => Promise<string>;
export declare class CryptPipeline implements IPipeline<string, string> {
    private options;
    private payloadExtractor;
    private encryptor;
    private decryptor;
    constructor(options: CryptOptions);
    serialize(value: string): Promise<string>;
    deserialize<R>(data: string): Promise<R>;
}
export {};
//# sourceMappingURL=crypt.d.ts.map