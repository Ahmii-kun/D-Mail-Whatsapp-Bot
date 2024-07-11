"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONDriver = void 0;
const MemoryDriver_1 = require("./MemoryDriver");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
class JSONDriver extends MemoryDriver_1.MemoryDriver {
    path;
    writeFile;
    constructor(path = "./quickdb.json") {
        super();
        this.path = path;
        this.writeFile = require("write-file-atomic");
        this.loadContentSync();
    }
    loadContentSync() {
        if ((0, fs_1.existsSync)(this.path)) {
            const contents = (0, fs_1.readFileSync)(this.path, { encoding: "utf-8" });
            try {
                const data = JSON.parse(contents);
                for (const table in data) {
                    const store = this.getOrCreateTable(table);
                    data[table].forEach((d) => store.set(d.id, d.value));
                }
            }
            catch {
                throw new Error("Database malformed");
            }
        }
        else {
            this.writeFile.sync(this.path, "{}");
        }
    }
    async loadContent() {
        if ((0, fs_1.existsSync)(this.path)) {
            const contents = await (0, promises_1.readFile)(this.path, { encoding: "utf-8" });
            try {
                const data = JSON.parse(contents);
                for (const table in data) {
                    const store = this.getOrCreateTable(table);
                    data[table].forEach((d) => store.set(d.id, d.value));
                }
            }
            catch {
                throw new Error("Database malformed");
            }
        }
        else {
            await this.writeFile(this.path, "{}");
        }
    }
    async export() {
        const val = {};
        for (const tableName of this.store.keys()) {
            val[tableName] = await this.getAllRows(tableName);
        }
        return val;
    }
    async snapshot() {
        const data = await this.export();
        await this.writeFile(this.path, JSON.stringify(data));
    }
    async deleteAllRows(table) {
        const val = super.deleteAllRows(table);
        await this.snapshot();
        return val;
    }
    async deleteRowByKey(table, key) {
        const val = super.deleteRowByKey(table, key);
        await this.snapshot();
        return val;
    }
    async setRowByKey(table, key, value, update) {
        const val = super.setRowByKey(table, key, value, update);
        await this.snapshot();
        return val;
    }
}
exports.JSONDriver = JSONDriver;
//# sourceMappingURL=JSONDriver.js.map