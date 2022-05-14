// import dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const queries = require('./lib/queries');

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "passwerd",
        database: "company_db"
    },
    console.log(`Connected to the company_db database`)
);

function showActions() {
    const choices = ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'];
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: choices
        }
    ])
    .then((data) => {
        if (data.action === 'view all departments') {
            handleViewDeparments();
        } else if (data.action === 'view all roles') {
            handleViewRoles();
        } else if (data.action === 'view all employees') {
            handleViewEmployees();
        } else if (data.action === 'add a department') {
            handleAddDepartment();
        } else if (data.action === 'add a role') {
            handleAddRole();
        } else if (data.action === 'add an employee') {
            handleAddEmployee();
        } else if (data.action === 'update an employee role') {
            handleUpdateEmpRole();
        }
    })
}

function handleViewDeparments() {}
function handleViewRoles() {}
function handleViewEmployees() {}

function handleAddDepartment() {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ])
    .then((data) => {
        console.log(`Added ${data.name} to the database`);
    });
}

function handleAddRole() {
    const departments = ['choice']; // get departments
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does the role belong to?',
            choices: departments
        }
    ])
    .then((data) => {
        let dept_id = departments.indexOf(data.department) + 1;
        console.log([data.input, data.salary, dept_id]);
        console.log(`Added ${data.title} to the database`)
    });
}

function handleAddEmployee() {
    const roles = ['roles']; // get roles
    const employees = ['managers']; // get EMPLOYEES
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employee\'s role?',
            choices: roles
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s manager?',
            choices: employees
        }
    ])
    .then((data) => {
        let role_id = roles.indexOf(data.role) + 1;
        let manager_id = employees.indexOf(data.manager) + 1;
        console.log([data.first_name, data.last_name, role_id, manager_id]);
        console.log(`Added ${data.first_name} ${data.last_name} to the database`);
    });
}

function handleUpdateEmpRole() {
    const roles = ['roles']; // get roles
    const employees = ['managers']; // get EMPLOYEES
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee\'s role do you want to update?',
            choices: employees
        },
        {
            type: 'list',
            name: 'role',
            message: 'Which role do you want to assign the selected employee?',
            choices: roles
        }
    ])
    .then((data) => {
        let role_id = roles.indexOf(data.role) + 1;
        let manager_id = employees.indexOf(data.manager) + 1;
        console.log([role_id, manager_id]);
        console.log('Updated employee\'s role');
    })
}

function init() {
    showActions();
}

init();

// // import dependencies
// const inquirer = require("inquirer");
// const cTable = require("console.table");
// const queries = require("./lib/queries");
// const queryNoParams = require("./lib/queries");

// function showActions() {
//     const choices = ["view all departments", "add a department", "view all roles", "add a role", "view all employees", "add an employee", "update an employee role"];
//     inquirer
//         .prompt([
//             {
//                 type: "list",
//                 name: "action",
//                 message: "What would you like to do?",
//                 choices: choices
//             }
//         ])
//         .then((data) => {
//             const index = choices.indexOf(data.action);
//             handleActions(index);
//         })
// }

// function handleActions(index) {
//     if (index === 0 || 2 || 4) {
//         handleView(index);
//     }
// }

// async function handleView(index) {
//     let data = await queryNoParams(index);
//     console.table(data);
//     showActions();
// }

// function init() {
//     showActions();
// }

// init();






// // function showActions() {
// //     inquirer
// //         .prompt([
// //             {
// //                 type: "list",
// //                 name: "action",
// //                 message: "What would you like to do?",
// //                 choices: choices
// //             }
// //         ])
// //         .then((data) => {
// //             const actionType = data.action.substring(0, 1);
// //             if (actionType === 'a') {
// //                 handleAdds(data.action);
// //             } else if (actionType === 'd') {
// //                 handleDeletes(data.action);
// //             } else if (actionType === 'u') {
// //                 handleUpdates(data.action);
// //             } else {
// //                 handleViews(data.action);
// //             }
// //         });
// // }

// // function handleViews(action) {
// //     let query;
// //     if (action === "view all departments") {
// //         query = queries[0];
// //     } else if (action === "view all roles") {
// //         query = queries[2];
// //     }
// //     db.promise().query(query)
// //     .then(([rows, fields]) => {
// //         console.table(rows);
// //         showActions();
// //     });
// // }

// // function handleAdds(action) {
// //     if (action === "add a department") {
// //         addDepartment();
// //     } else if (action === "add a role") {
// //         addRole();
// //     }
// // }

// // function addDepartment() {
// //     inquirer
// //         .prompt([
// //             {
// //                 type: "input",
// //                 name: "name",
// //                 message: "What is the name of the department?"
// //             }
// //         ])
// //         .then((data) => {
// //             db.promise().query(queries[1], [data.name])
// //             .then(([rows, fields]) => {
// //                 console.log(`Added ${data.name} to the database`);
// //                 showActions();
// //             });
// //         });
// // }

// // function addRole() {
// //     const departments = getDepartments();
// //     inquirer
// //         .prompt([
// //             {
// //                 type: "input",
// //                 name: "title",
// //                 message: "What is the name of the role?"
// //             },
// //             {
// //                 type: "input",
// //                 name: "salary",
// //                 message: "What is the salary of the role?"
// //             },
// //             {
// //                 type: "list",
// //                 name: "department",
// //                 message: "Which department does the role belong to?",
// //                 choices: departments
// //             }
// //         ])
// //         .then((data) => {
// //             const dept_id = departments.indexOf(data.department) + 1;
// //             db.promise().query(queries[4], [data.title, data.salary, dept_id])
// //             .then(([rows, fields]) => {
// //                 console.log(`Added ${data.title} to the database`);
// //                 showActions();
// //             });
// //         });
// // }

// // async function getDepartments() {
// //     let promise = db.promise.query(queries[0]);
// //     let result = await promise;
// //     const depts = [];
// //         for (let i = 0; i < result.length; i++) {
// //             depts.push(result[i].name);
// //         }
// //     console.log(depts);
// //     return depts;

// //     // return (db.promise().query(queries[0])
// //     // .then(([rows, fields]) => {
// //     //     const depts = [];
// //     //     for (let i = 0; i < rows.length; i++) {
// //     //         depts.push(rows[i].name);
// //     //     }
// //     //     return depts;
// //     // }));
// // }

// // function init() {
// //     showActions();
// // }

// // init();


// // /*
// // - add department
// // - add role
// // - add employee

// // - view all departments
// // - view all roles
// // - view all employees
// // - view employees by manager
// // - view employees by department

// // - view combined salaries of all employees in said department

// // - update employee role
// // - update employee managers

// // - delete departments
// // - delete roles
// // - delete employees
// // */