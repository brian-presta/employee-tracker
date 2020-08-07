const connect = require('./credentials')
const cTable = require('console.table')

const queryHandler = {
    showAll(table) {
        const connection = connect()
        return connection.query(`select * from ${table}`, (err,result) => {
            console.table(result)
            connection.close()
        })
    }
}

queryHandler.showAll('department')