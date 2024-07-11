"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipeLiner = void 0;
class PipeLiner {
    driver;
    pipeline;
    constructor(driver, pipeline) {
        this.driver = driver;
        this.pipeline = pipeline;
    }
    async prepare(table) {
        return await this.driver.prepare(table);
    }
    async getAllRows(table) {
        const rawData = await this.driver.getAllRows(table);
        const deserializedData = [];
        for (const entry of rawData) {
            const deserialized = await this.pipeline.deserialize(JSON.stringify(entry.value));
            deserializedData.push({ id: entry.id, value: deserialized });
        }
        return deserializedData;
    }
    async getRowByKey(table, key) {
        const rawData = await this.driver.getRowByKey(table, key);
        if (!rawData[0])
            return rawData;
        const deserializedData = await this.pipeline.deserialize(JSON.stringify(rawData[0]));
        return typeof deserializedData !== undefined
            ? [deserializedData, true]
            : [null, false];
    }
    async setRowByKey(table, key, value, update) {
        const serializedData = await this.pipeline.serialize(value);
        const ret = await this.driver.setRowByKey(table, key, serializedData, update);
        if (typeof ret === "string")
            return await this.pipeline.deserialize(ret);
        else
            return ret;
    }
    async deleteAllRows(table) {
        return await this.driver.deleteAllRows(table);
    }
    async deleteRowByKey(table, key) {
        return await this.driver.deleteRowByKey(table, key);
    }
}
exports.PipeLiner = PipeLiner;
//# sourceMappingURL=pipeliner.js.map