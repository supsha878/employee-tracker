// import dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "passwerd",
        database: "company_db"
    },
    console.log(`Connected to the company_db database`)
);

function showOptions() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "option",
                message: "What would you like to do?",
                choices: ["view all departments", "add a department", "view all roles", "add a role", "view all employees", "add an employee", "update an employee role"]
            }
        ])
        .then((data) => {
            console.log(data.option);
        });
}

function init() {
    showOptions();
}

init();


// // connect to database
// const db = mysql.createConnection(
//     {
//         host: "localhost",
//         user: "root",
//         password: "passwerd",
//         database: "company_db"
//     },
//     console.log("connected to the company_db database")
// )




// // initialize app
// function init() {
//     inquirer
//         .prompt([
//             {
//                 type: "list",
//                 name: "action",
//                 message: "Would you like to view, add, or update your information?",
//                 choices: ["view", "add", "update"]
//             }
//         ])
//         .then((data) => {
//             console.log(data.action);
//         });
// }

// function menu()

// // call initialization
// init();

/*
- add department
- add role
- add employee

- view all departments
- view all roles
- view all employees
- view employees by manager
- view employees by department
- view combined salaries of all employees in said department

- update employee role
- update employee managers

- delete departments
- delete roles
- delete employees
*/