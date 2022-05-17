// array of SQL queries used in index.js
const queries = [
    `SELECT * FROM department`, // view all departments 0
    `SELECT role.id, title, department.name AS department, salary FROM role INNER JOIN department ON department.id = department_id ORDER BY role.id`, // view all roles 1
    `DROP TABLE IF EXISTS manager`, // drop manager table if exists, used to view employees 2
    `CREATE TABLE manager SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name FROM employee WHERE id IN (SELECT DISTINCT manager_id FROM employee WHERE manager_id IS NOT NULL)`, // create manager table, used to view employees 3
    `SELECT employee.id, first_name, last_name, title, name AS department, salary, manager_name AS manager FROM (employee INNER JOIN (role INNER JOIN department ON department.id = department_id) ON role.id = role_id) LEFT JOIN manager ON manager.id = manager_id`, // view all employees 4
    `SELECT employee.id, first_name, last_name, title, name AS department, salary, manager_name AS manager FROM (employee INNER JOIN (role INNER JOIN department ON department.id = department_id) ON role.id = role_id) LEFT JOIN manager ON manager.id = manager_id WHERE manager_id = ?`, // view employees by manager 5
    `SELECT employee.id, first_name, last_name, title, name AS department, salary, manager_name AS manager FROM (employee INNER JOIN (role INNER JOIN department ON department.id = department_id) ON role.id = role_id) LEFT JOIN manager ON manager.id = manager_id WHERE department_id = ?`, // view employees by department 6
    `SELECT department.id, name AS department, SUM(salary) AS utilized_budget FROM employee INNER JOIN (role INNER JOIN department ON department.id = department_id) ON role.id = role_id WHERE department_id = ? GROUP BY department_id`, // view total utilized budget of a department 7
    `INSERT INTO department (name) VALUES (?)`, // add a department 8
    `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, // add a role 9
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, // add an employee 10
    `UPDATE employee SET role_id = ? WHERE id = ?`, // update an employee's role 11
    `UPDATE employee SET manager_id = ? WHERE id = ?`, // update an employee's manager 12
    `DELETE FROM department WHERE id = ?`, // delete a department 13
    `DELETE FROM role WHERE id = ?`, // delete a role 14
    `DELETE FROM employee WHERE id = ?`, // delete an employee 15
    `SELECT name FROM department`, // get departments 16
    `SELECT title FROM role`, // get roles 17
    `SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee`, // get employees 18
    `SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee WHERE id IN (SELECT DISTINCT manager_id FROM employee WHERE manager_id IS NOT NULL);` // get managers 19
];

module.exports = queries;
