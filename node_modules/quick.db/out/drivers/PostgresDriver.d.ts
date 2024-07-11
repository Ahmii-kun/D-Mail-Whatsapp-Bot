import { PoolConfig } from "pg";
import { IRemoteDriver } from "../interfaces/IRemoteDriver";
export declare class PostgresDriver implements IRemoteDriver {
    private static instance;
    private config;
    private conn;
    constructor(config: PoolConfig);
    static createSingleton(config: PoolConfig): PostgresDriver;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    private checkConnection;
    prepare(table: string): Promise<void>;
    getAllRows(table: string): Promise<{
        id: string;
        value: any;
    }[]>;
    getRowByKey<T>(table: string, key: string): Promise<[T | null, boolean]>;
    setRowByKey<T>(table: string, key: string, value: any, update: boolean): Promise<T>;
    deleteAllRows(table: string): Promise<number>;
    deleteRowByKey(table: string, key: string): Promise<number>;
}
//# sourceMappingURL=PostgresDriver.d.ts.map