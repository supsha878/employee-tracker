const choices = ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'];

const queries = [
    `SELECT * FROM department`, // view all departments
    `SELECT role.id, title, department.name AS department, salary FROM role INNER JOIN department ON department.id = department_id`, // view all roles
    ``, // view all employees
    `INSERT INTO department (name) VALUES (?)`, // add a department
    ``,
    ``,
    ``,
    `SELECT name FROM department` // get departments
];

module.exports = queries;

// `SELECT A.CustomerName AS CustomerName1, B.CustomerName AS CustomerName2, A.City
// FROM Customers A, Customers B
// WHERE A.CustomerID <> B.CustomerID
// AND A.City = B.City 
// ORDER BY A.City;


// SELECT *
// FROM employee a, employee b

// // // WITH RECURSIVE Emp_CTE (ID, Name, Designation, Manager_id, Manager_name)
// // // AS (
// // //     SELECT ID, Name, Designation, Manager_id, cast(NULL as varchar)
// // //     FROM Employee_Information
// // //     WHERE Manager_ID IS NULL
// // //     UNION ALL
// // //         SELECT e.ID, e.Name, e.Designation, e.Manager_id, Emp_CTE.Name
// // //         FROM Employee_Information e
// // //         INNER JOIN Emp_CTE ON Emp_CTE.ID = e.Manager_id
// // //     )
// // // SELECT *
// // // FROM Emp_CTE


// `WITH RECURSIVE Emp_CTE (id, first_name, last_name, title, department_name, salary, manager_first_name, manager_last_name)
// // // AS (
// // //     SELECT employee.id, first_name, last_name, title, name, salary
// // //     FROM employee
// // //     UNION ALL
// // //         SELECT employee.id, first_name, last_name,  
// // // )

// // // SELECT employee.id, first_name, last_name, title, name, salary,  FROM employee INNER JOIN (role INNER JOIN department ON department.id = role.department_id) ON role.id = employee.role_id`


// // const queries = [
// //     `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, // add a role
// //     ``, // view all employees
// //     ``, // add an employee
// //     ``, // update an employee role
// //     ``
// // ];


// // // // view all employees
// // // `WITH RECURSIVE Emp_CTE (id, first_name, last_name, title, department_name, salary, manager_first_name, manager_last_name)
// // // AS (
// // //     SELECT employee.id, first_name, last_name, title, name, salary
// // //     FROM employee
// // //     UNION ALL
// // //         SELECT employee.id, first_name, last_name,  
// // // )

// // // SELECT employee.id, first_name, last_name, title, name, salary,  FROM employee INNER JOIN (role INNER JOIN department ON department.id = role.department_id) ON role.id = employee.role_id`

// // // WITH RECURSIVE Emp_CTE (ID, Name, Designation, Manager_id, Manager_name)
// // // AS (
// // //     SELECT ID, Name, Designation, Manager_id, cast(NULL as varchar)
// // //     FROM Employee_Information
// // //     WHERE Manager_ID IS NULL
// // //     UNION ALL
// // //         SELECT e.ID, e.Name, e.Designation, e.Manager_id, Emp_CTE.Name
// // //         FROM Employee_Information e
// // //         INNER JOIN Emp_CTE ON Emp_CTE.ID = e.Manager_id
// // //     )
// // // SELECT *
// // // FROM Emp_CTE


// // // // view emplyees by manager
// // // `SELECT * FROM employee ORDER BY manager_id`

// // // // view employees by department
// // // `SELECT employee.id, first_name, last_name, manager_id, department_id, name FROM employee
// // // INNER JOIN (role INNER JOIN department ON department.id = role.department_id) ON role.id = employee.role_id 
// // // ORDER BY department_id`

// // // // view total utilized budget of a department, input: department id
// // // `SELECT department.id, name, SUM(salary) AS total_utilized_budget 
// // // FROM employee
// // // INNER JOIN (role INNER JOIN department ON department.id = role.department_id) ON role.id = employee.role_id
// // // WHERE department.id = ?
// // // GROUP BY name`



// // // // add an employee, 
// // // `INSERT INTO employee (first_name, last_name, role_id, manager_id)`

// //  /*

// // - add department
// // - add role
// // - add employee


// // - update employee role
// // - update employee managers

// // - delete departments
// // - delete roles
// // - delete employees
// // */