const choices = ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'];

const queries = [
    `SELECT * FROM department`, // view all departments
    ``,
    ``,
    ``,
    ``,
    ``,
    ``
];

// const mysql = require("mysql2");

// const db = mysql.createConnection(
//     {
//         host: "localhost",
//         user: "root",
//         password: "passwerd",
//         database: "company_db"
//     },
//     console.log(`Connected to the company_db database`)
// );

// // const choices = ["view all departments", "add a department", "view all roles", "add a role", "view all employees", "add an employee", "update an employee role"];
// const queries = [
//     `SELECT * FROM department`, // view all departments
//     `INSERT INTO department (name) VALUES (?)`, // add a department
//     `SELECT role.id, title, department.name AS department, salary FROM role INNER JOIN department ON department.id = department_id`, // view all roles
//     `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, // add a role
//     ``, // view all employees
//     ``, // add an employee
//     ``, // update an employee role
//     ``
// ];


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

// function queryNoParams(index) {
//     db.promise().query(queries[index])
//     .then(([rows, fields]) => {
//         console.table(rows);
//     });
// }



// // // ["add a department", "add a role", "add an employee", "update an employee role"]

// // // view all departments
// // `SELECT name, id
// // FROM department`

// // // view all roles
// // `SELECT title, role.id, department.name, salary
// // FROM role 
// // INNER JOIN department ON department.id = department_id`

// // // view all employees
// // `WITH RECURSIVE Emp_CTE (id, first_name, last_name, title, department_name, salary, manager_first_name, manager_last_name)
// // AS (
// //     SELECT employee.id, first_name, last_name, title, name, salary
// //     FROM employee
// //     UNION ALL
// //         SELECT employee.id, first_name, last_name,  
// // )

// // SELECT employee.id, first_name, last_name, title, name, salary,  FROM employee INNER JOIN (role INNER JOIN department ON department.id = role.department_id) ON role.id = employee.role_id`

// // WITH RECURSIVE Emp_CTE (ID, Name, Designation, Manager_id, Manager_name)
// // AS (
// //     SELECT ID, Name, Designation, Manager_id, cast(NULL as varchar)
// //     FROM Employee_Information
// //     WHERE Manager_ID IS NULL
// //     UNION ALL
// //         SELECT e.ID, e.Name, e.Designation, e.Manager_id, Emp_CTE.Name
// //         FROM Employee_Information e
// //         INNER JOIN Emp_CTE ON Emp_CTE.ID = e.Manager_id
// //     )
// // SELECT *
// // FROM Emp_CTE


// // // view emplyees by manager
// // `SELECT * FROM employee ORDER BY manager_id`

// // // view employees by department
// // `SELECT employee.id, first_name, last_name, manager_id, department_id, name FROM employee
// // INNER JOIN (role INNER JOIN department ON department.id = role.department_id) ON role.id = employee.role_id 
// // ORDER BY department_id`

// // // view total utilized budget of a department, input: department id
// // `SELECT department.id, name, SUM(salary) AS total_utilized_budget 
// // FROM employee
// // INNER JOIN (role INNER JOIN department ON department.id = role.department_id) ON role.id = employee.role_id
// // WHERE department.id = ?
// // GROUP BY name`



// // // add an employee, 
// // `INSERT INTO employee (first_name, last_name, role_id, manager_id)`

//  /*

// - add department
// - add role
// - add employee


// - update employee role
// - update employee managers

// - delete departments
// - delete roles
// - delete employees
// */

module.exports = queries;