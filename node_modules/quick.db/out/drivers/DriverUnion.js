"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverUnion = void 0;
const utilities_1 = require("../utilities");
class DriverUnion {
    drivers;
    _main;
    get main() {
        return this._main;
    }
    set main(value) {
        if (!(value in this.drivers))
            return;
        this._main = value;
    }
    constructor(main, ...mirrors) {
        this.drivers = [main, ...mirrors];
        this._main = 0;
    }
    async init() {
        for (const driver of this.drivers) {
            if ((0, utilities_1.isConnectable)(driver))
                await driver.connect();
        }
    }
    async prepare(table) {
        for (const driver of this.drivers)
            await driver.prepare(table);
    }
    async getAllRows(table) {
        const main = this.drivers[this._main];
        return await main.getAllRows(table);
    }
    async getRowByKey(table, key) {
        const main = this.drivers[this._main];
        return await main.getRowByKey(table, key);
    }
    async setRowByKey(table, key, value, update) {
        let val = undefined;
        for (let i = 0; i < this.drivers.length; i++) {
            const driver = this.drivers[i];
            const res = await driver.setRowByKey(table, key, value, update);
            if (i === this._main)
                val = res;
        }
        return val;
    }
    async deleteAllRows(table) {
        let rows = 0;
        for (let i = 0; i < this.drivers.length; i++) {
            const driver = this.drivers[i];
            const delRows = await driver.deleteAllRows(table);
            if (i === this._main)
                rows = delRows;
        }
        return rows;
    }
    async deleteRowByKey(table, key) {
        let rows = 0;
        for (let i = 0; i < this.drivers.length; i++) {
            const driver = this.drivers[i];
            const delRows = await driver.deleteRowByKey(table, key);
            if (i === this._main)
                rows = delRows;
        }
        return rows;
    }
}
exports.DriverUnion = DriverUnion;
//# sourceMappingURL=DriverUnion.js.map