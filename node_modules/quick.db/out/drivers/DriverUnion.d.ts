import { IDriver } from "../interfaces/IDriver";
export declare class DriverUnion implements IDriver {
    private drivers;
    private _main;
    get main(): number;
    set main(value: number);
    constructor(main: IDriver, ...mirrors: IDriver[]);
    init(): Promise<void>;
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
//# sourceMappingURL=DriverUnion.d.ts.map