const inquirer = require("inquirer")
require("console.table")
const queryHandler = require("./db/db")

const menu = {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['View all departments','View all roles','View all employees',
            'Add a department','Add a role','Add an employee','Update an employee','Quit']
}
const doneScreen = {
    type: 'list',
    name: 'done',
    message: 'Done',
    choices: ['Done']
}
async function menuHandler() {
    const rawResponse = await inquirer.prompt(menu)
    const response = rawResponse.choice.toLowerCase().split(" ")
    if (response.includes("view")) {
        const result = await queryHandler.showAll(response[2].slice(0,-1))
        console.table(result)
        return await done()
    }
    if (response.includes("add")) {
        return await addEntry(response[2])
    }
    if (response.includes("update")) {
        return await updateHandler(response[2])
    }
    console.log("Goodbye!")
    return
}
async function addEntry(table) {

}
async function done() {
    await inquirer.prompt(doneScreen)
    return await menuHandler()
}

menuHandler()