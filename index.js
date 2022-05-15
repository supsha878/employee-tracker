// import dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const queries = require('./lib/queries');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'passwerd',
        database: 'company_db',
        multipleStatements: 'true'
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
        const actionIndex = choices.indexOf(data.action);
        if (actionIndex < 3) {
            handleViews(actionIndex);
        } else if (actionIndex >= 3 && actionIndex <= 5) {
            handleAdds(actionIndex);
        } else if (data.action === 'update an employee role') {
            handleUpdateEmpRole();
        }
    })
}

function handleViews(index) {
    db.promise().query(queries[index])
    .then((result) => {
        console.table(result[0]);
        showActions();
    });
}

function handleAdds(index) {
    if (index === 3) {
        handleAddDepartment();
    } else if  (index === 4) {
        db.promise().query(queries[7])
        .then((result) => {
            let depts = result[0].map(dept => dept.name);
            handleAddRole(depts);
        });
    } else if (index === 5) {
        db.promise().query(`${queries[8]}; ${queries[9]}`)
        .then((result) => {
            let roles = result[0][0].map(role => role.title);
            let employees = result[0][1].map(emp => emp.name);
            handleAddEmployee(roles, employees);
        });
    }
}

// TODO remove
function getDepartments() {
    const depts = [];
    return db.promise().query(queries[7])
    .then((result) => {
        for (let i = 0; i < result[0].length;) {
            depts.push(result[0][i].name);
        }
        return depts;
    });
}

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
        db.promise().query(queries[3], [data.name])
        .then((result) => {
            console.log(`Added ${data.name} to the database`);
            showActions();
        }); 
    });
}

function handleAddRole(depts) {
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
            choices: depts
        }
    ])
    .then((data) => {
        let dept_id = depts.indexOf(data.department) + 1;
        let params = [data.title, data.salary, dept_id];
        db.promise().query(queries[4], params)
        .then((result) => {
            console.log(`Added ${data.title} to the database`);
            showActions();
        });
    });
}

function handleAddEmployee(roles, employees) {
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
        let params = [data.first_name, data.last_name, role_id, manager_id];
        db.promise().query(queries[5], params)
        .then((result) => {
            console.log(`Added ${data.first_name} ${data.last_name} to the database`);
            showActions();
        });
    });
}

// TODO
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