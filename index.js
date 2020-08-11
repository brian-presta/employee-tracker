const inquirer = require("inquirer")
const cTable = require("console.table")
const queryHandler = require("./db/db")
const questions = require("./lib/questions")

async function menuHandler() {
    let response = await inquirer.prompt(questions.menu)
    response = response.choice.toLowerCase().split(" ")
    if (response.includes("view")) {
        const result = await queryHandler.getAll(response[2].slice(0,-1))
        console.table(result)
        return await done()
    }
    if (response.includes("add")) {
        return await addEntryHandler(response[2])
    }
    if (response.includes("update")) {
        return await updateHandler(response[2])
    }
    console.log("Goodbye!")
    return
}
async function addEntryHandler(table) {
    if (table === 'department') {
        return await addDepartment()
    }
    if (table === 'role') {
        return await addRole()
    }
    if (table === 'employee') {
        return await addEmployee()
    }
}
async function addDepartment() {
    let response = await inquirer.prompt(questions.department)
    await queryHandler.addRecord('department',`name="${response.name}"`)
    console.log("\nDepartment added!")
    return await done()
}
async function addRole() {
    let question =  questions.role
    const departments = await queryHandler.getAll('department')
    for (department of departments) {
        question[2].choices.push(department.name)
    }
    const response = await inquirer.prompt(question)
    for (department of departments) {
        if (department.name === response.department) {
            response.departmentID = department.id
            break
        }
    }
    await queryHandler.addRecord('role', `title="${response.name}", salary=${response.salary}, department_id=${response.departmentID}`)
    return await done()
}
async function addEmployee() {
    let question = questions.employee 
    const roles = await queryHandler.getAll('role')
    const employees = await queryHandler.getAll('employee')
    let idTracker = {}
    for (role of roles) {
        question[2].choices.push(role.title)
        idTracker[role.title] = role.id
    }
    for (employee of employees) {
        let answerString = `${employee.first_name} ${employee.last_name} Employee ID: ${employee.id}`
        question[3].choices.push(answerString)
        idTracker[[answerString]] = employee.id
    }
    const response = await inquirer.prompt(question)
    question[2].choices,question[3].choices = []
    response.roleID = idTracker[response.role]
    response.managerID = idTracker[response.manager]
    await queryHandler.addRecord(
        'employee',
        `first_name="${response.first_name}",last_name="${response.last_name}",role_id=${response.roleID},manager_id=${response.managerID}`
    )
    return await done()
}
async function done() {
    await inquirer.prompt(questions.done)
    return await menuHandler()
}

menuHandler()