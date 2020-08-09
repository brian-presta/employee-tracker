const credentials = require('./credentials')
const mysql = require("mysql2/promise")

const queryHandler = {
    async showAll(table) {
        const connection = await mysql.createConnection(credentials);
        const [rows, fields] = await connection.execute(`SELECT * FROM ${table}`);
        await connection.close();
        return rows;
    },
    async addRecord(table,data) {
        const connection = await mysql.createConnection(credentials);
        const [rows, fields] = await connection.execute(`INSERT INTO ${table} SET ?`,data);
        await connection.close();
        return rows;
    },
    async updateRecord(table,data,id) {
        const connection = await mysql.createConnection(credentials);
        const [rows, fields] = await connection.execute(`UPDATE ${table} SET ? WHERE id=${id}`,data)
        await connection.close();
        return rows;
    }
}

module.exports = queryHandler
