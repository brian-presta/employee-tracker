const credentials = require('./credentials')
const mysql = require("mysql2/promise");

const queryHandler = {
    async getAll(table) {
        const connection = await mysql.createConnection(credentials);
        const [rows, fields] = await connection.execute(`SELECT * FROM ${table}`);
        await connection.close();
        return rows;
    },
    async addRecord(table,data) {
        const connection = await mysql.createConnection(credentials);
        await connection.execute(`INSERT INTO ${table} set ${data}`);
        await connection.close();
        return;
    },
    async updateRecord(table,data,id) {
        const connection = await mysql.createConnection(credentials);
        const [rows, fields] = await connection.execute(`UPDATE ${table} SET ? WHERE id=${id}`,data)
        await connection.close();
        return rows;
    }
}

module.exports = queryHandler
// async function init() {
//     // await queryHandler.addRecord('employee','first_name="jeb", last_name="seb", role_id=1, manager_id=1')
//     let x =await queryHandler.getAll('department')
//     for (department of x) {
//         console.log(department.name)
//     }
// }

// init()