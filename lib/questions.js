const questions = { 
    menu: {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['View all departments','View all roles','View all employees',
            'Add a department','Add a role','Add an employee',"Update an employee's role",'Quit']
    },
    done: {
        type: 'list',
        name: 'done',
        message: 'Done',
        choices: ['Done']
    },
    department: {

            type: 'input',
            name: 'name',
            message: "What is the name of the department you'd like to add?"
    },
    role: [
        {
            type: 'input',
            name: 'name',
            message: "What is the name of the role you'd like to add?"
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the role's salary?",
            validate: validateNumber

        },
        {
            type: 'list',
            name:'department',
            choices:[]
        }
    ],
    employee: [
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: []
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is this employee's manager?",
            choices: []
        }
    ]


    
}
function validateNumber(input) {
    if (parseInt(input)) {
        return true;
    } 
    else {
        console.log('\n\nPlease enter a number.\n');
        return false;
    }
};
module.exports = questions