// import dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const queries = require('./lib/queries');

// create database connection
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

// main guide function
function showActions() {
    const choices = ['view all departments', 'view all roles', 'view all employees','view employees by manager', 'view employees by department', 'view total utilized budget of a department', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'update an employee manager', 'delete a department', 'delete a role', 'delete an employee'];
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
        if (actionIndex < 6) {
            handleViews(actionIndex);
        } else if (actionIndex >= 6 && actionIndex <= 8) {
            handleAdds(actionIndex);
        } else if (actionIndex >= 9 && actionIndex <= 10) {
            handleUpdates(actionIndex);
        } else {
            handleDeletes(actionIndex);
        }
    })
}

// view functions
// view handler
function handleViews(index) {
    if (index < 2) {
        db.promise().query(queries[index])
        .then((result) => {
            console.table(result[0]);
            showActions();
        });
    } else if (index === 2) {
        db.promise().query(`${queries[2]}; ${queries[3]}; ${queries[4]}`)
        .then((result) => {
            console.table(result[0][2]);
            showActions();
        });
    } else if (index === 3) {
        db.promise().query(queries[19])
        .then((result) => {
            let managers = result[0].map(manager => manager.name);
            handleViewEmpByManager(managers);
        });
    } else if (index === 4) {
        db.promise().query(queries[16])
        .then((result) => {
            let depts = result[0].map(dept => dept.name);
            handleViewEmpByDept(depts);
        });
    } else {
        db.promise().query(queries[16])
        .then((result) => {
            let depts = result[0].map(dept => dept.name);
            handleViewUtilBudget(depts);
        });
    }
}

function handleViewEmpByManager(managers) {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'manager',
            message: 'Which manager\'s employees would you like to view?',
            choices: managers
        }
    ])
    .then((data) => {
        let manager_id = managers.indexOf(data.manager) + 1;
        db.promise().query(`${queries[2]}; ${queries[3]}`)
        .then((prep) => {
            db.promise().query(queries[5], [manager_id])
            .then((result) => {
                console.table(result[0]);
                showActions();
            })
        });
    });
}

function handleViewEmpByDept(depts) {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'department',
            message: 'Which department\'s employees would you like to view?',
            choices: depts
        }
    ])
    .then((data) => {
        let dept_id = depts.indexOf(data.department) + 1;
        db.promise().query(`${queries[2]}; ${queries[3]}`)
        .then((prep) => {
            db.promise().query(queries[6], [dept_id])
            .then((result) => {
                console.table(result[0]);
                showActions();
            })
        });
    });
}

function handleViewUtilBudget(depts) {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'department',
            message: 'Which department\'s total utilized budget would you like to view?',
            choices: depts
        }
    ])
    .then((data) => {
        let dept_id = depts.indexOf(data.department) + 1;
        db.promise().query(queries[7], [dept_id])
        .then((result) => {
            console.table(result[0]);
            showActions();
        });
    });
}

// add functions
// add handler
function handleAdds(index) {
    if (index === 6) {
        handleAddDepartment();
    } else if  (index === 7) {
        db.promise().query(queries[16])
        .then((result) => {
            let depts = result[0].map(dept => dept.name);
            handleAddRole(depts);
        });
    } else if (index === 8) {
        db.promise().query(`${queries[17]}; ${queries[18]}`)
        .then((result) => {
            let roles = result[0][0].map(role => role.title);
            let employees = result[0][1].map(emp => emp.name);
            handleAddEmployee(roles, employees);
        });
    }
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
        db.promise().query(queries[8], [data.name])
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
        db.promise().query(queries[9], params)
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
        db.promise().query(queries[10], params)
        .then((result) => {
            console.log(`Added ${data.first_name} ${data.last_name} to the database`);
            showActions();
        });
    });
}

// update functions
// update handler
function handleUpdates(index) {
    if (index === 9) {
        db.promise().query(`${queries[17]}; ${queries[18]}`)
        .then((result) => {
            let roles = result[0][0].map(role => role.title);
            let employees = result[0][1].map(emp => emp.name);
            handleUpdateEmpRole(roles, employees);
        });
    } else {
        db.promise().query(queries[18])
        .then((result) =>  {
            let employees = result[0].map(emp => emp.name);
            handleUpdateEmpManager(employees);
        }); 
    }
}

function handleUpdateEmpRole(roles, employees) {
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
        let emp_id = employees.indexOf(data.manager) + 1;
        let params = [role_id, emp_id];
        db.promise().query(queries[11], params)
        .then((result) => {
            console.log(`Updated ${data.employee}`);
            showActions();
        });
    });
}

function handleUpdateEmpManager(employees) {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee\'s manager would you like to update?',
            choices: employees
        },
        {
            type: 'list',
            name: 'manager',
            message: "Which employee would you like to assign as their manager?",
            choices: employees
        }
    ])
    .then((data) => {
        let emp_id = employees.indexOf(data.employee) + 1;
        let manager_id = employees.indexOf(data.manager) + 1;
        if (emp_id === manager_id) {
            console.log('Employee cannot be set as their own manager')
            showActions();
        } else {
            let params = [manager_id, emp_id];
            db.promise().query(queries[12], params)
            .then((result) => {
                console.log(`Updated ${data.employee}`);
                showActions();
            });
        }
    })
}

// delete functions
// delete handler
function handleDeletes(index) {
    if (index === 11) {
        db.promise().query(queries[16])
        .then((result) => {
            let depts = result[0].map(dept => dept.name);
            handleDeleteDept(depts)
        });
    } else if (index === 12) {
        db.promise().query(queries[17])
        .then((result) => {
            let roles = result[0].map(role => role.title);
            handleDeleteRole(roles);
        });
    } else {
        db.promise().query(queries[18])
        .then((result) => {
            let employees = result[0].map(emp => emp.name);
            handleDeleteEmp(employees);
        });
    }

}

function handleDeleteDept(depts) {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'department',
            message: 'Which department would you like to delete?',
            choices: depts
        }
    ])
    .then((data) => {
        let dept_id = depts.indexOf(data.department) + 1;
        db.promise().query(queries[13], [dept_id])
        .then((result) => {
            console.log(`Deleted ${data.department}`);
            showActions();
        });
    })
}

function handleDeleteRole(roles) {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'role',
            message: 'Which role would you like to delete?',
            choices: roles
        }
    ])
    .then((data) => {
        let role_id = roles.indexOf(data.role) + 1;
        db.promise().query(queries[14], [role_id])
        .then((result) => {
            console.log(`Deleted ${data.role}`);
            showActions();
        });
    })
}

function handleDeleteEmp(employees) {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee would you like to delete?',
            choices: employees
        }
    ])
    .then((data) => {
        let emp_id = employees.indexOf(data.employee) + 1;
        db.promise().query(queries[15], [emp_id])
        .then((result) => {
            console.log(`Deleted ${data.employee}`);
            showActions();
        });
    })
}

// initlization function
function init() {
    showActions();
}

// call initilize
init();
