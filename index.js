// import dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");

// connect to database
// const db = mysql.createConnection(
//     {
//         host: "localhost",
//         user: "root",
//         password: "passwerd",
//         database: "company_db"
//     },
//     console.log("connected to the company_db database")
// )

// initialize app
function init() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "action",
                message: "Would you like to view, add, or update your information?",
                choices: ["view", "add", "update"]
            }
        ])
        .then((data) => {
            console.log(data.action);
        });
}

// call initialization
init();

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