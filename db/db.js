const credentials = require('./credentials');
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
        await connection.execute(`UPDATE ${table} SET ${data} WHERE id=${id}`);
        await connection.close();
        return;
    },
    async showAllEmployees() {
        const connection = await mysql.createConnection(credentials);
        const [rows,fields] = await connection.execute(
            `
            SELECT employee.id, employee.first_name as 'first name', employee.last_name as 'last name', role.title as title, 
            department.name as department, role.salary as salary, employee.manager_id as 'manager id'

            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id;
            `
        )
        await connection.close();
        return rows;
    }
};

module.exports = queryHandler;
