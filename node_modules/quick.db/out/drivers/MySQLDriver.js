"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLDriver = void 0;
class MySQLDriver {
    static instance;
    _mysql;
    conn;
    config;
    get mysql() {
        return this._mysql;
    }
    constructor(config) {
        this.config = config;
        this._mysql = require("mysql2/promise");
    }
    static createSingleton(config) {
        if (!this.instance)
            this.instance = new MySQLDriver(config);
        return this.instance;
    }
    checkConnection() {
        if (!this.conn) {
            throw new Error("MySQL not connected to the database");
        }
    }
    async connect() {
        if (typeof this.config == "string") {
            this.conn = await this._mysql.createPool(this.config);
        }
        else {
            this.conn = await this._mysql.createPool(this.config);
        }
    }
    async prepare(table) {
        this.checkConnection();
        await this.conn.query(`CREATE TABLE IF NOT EXISTS ${table} (ID VARCHAR(255) PRIMARY KEY, json TEXT)`);
    }
    async getAllRows(table) {
        this.checkConnection();
        const [rows] = await this.conn.query(`SELECT * FROM ${table}`);
        return rows.map((row) => ({
            id: row.ID,
            value: JSON.parse(row.json),
        }));
    }
    async getRowByKey(table, key) {
        this.checkConnection();
        const [rows] = await this.conn.query(`SELECT json FROM ${table} WHERE ID = ?`, [key]);
        if (rows.length == 0)
            return [null, false];
        return [JSON.parse(rows[0].json), true];
    }
    async setRowByKey(table, key, value, update) {
        this.checkConnection();
        const stringifiedJson = JSON.stringify(value);
        if (update) {
            await this.conn.query(`UPDATE ${table} SET json = (?) WHERE ID = (?)`, [stringifiedJson, key]);
        }
        else {
            await this.conn.query(`INSERT INTO ${table} (ID,json) VALUES (?,?)`, [key, stringifiedJson]);
        }
        return value;
    }
    async deleteAllRows(table) {
        this.checkConnection();
        const [rows] = await this.conn.query(`DELETE FROM ${table}`);
        return rows.affectedRows;
    }
    async deleteRowByKey(table, key) {
        this.checkConnection();
        const [rows] = await this.conn.query(`DELETE FROM ${table} WHERE ID=?`, [key]);
        return rows.affectedRows;
    }
}
exports.MySQLDriver = MySQLDriver;
//# sourceMappingURL=MySQLDriver.js.map