import { IDriver } from "../interfaces/IDriver";
import { IPipeline } from "../interfaces/IPipeline";
export declare class PipeLiner<R> implements IDriver {
    driver: IDriver;
    pipeline: IPipeline<R, string>;
    constructor(driver: IDriver, pipeline: IPipeline<R, string>);
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
//# sourceMappingURL=pipeliner.d.ts.map