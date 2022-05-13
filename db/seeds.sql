INSERT INTO department (name)
VALUES ("Marketing"),
        ("Legal"),
        ("Human Resources"),
        ("Information Technology");

INSERT INTO role (title, salary, department_id)
VALUES ("Brand Management", 75000, 1),
        ("Copywriter", 90000, 1),
        ("Legal Director", 120000, 2),
        ("Contract Administrator", 100000, 2),
        ("Recruiting Manager", 80000, 3),
        ("Training Coordinator", 95000, 3),
        ("Data Analyst", 85000, 4),
        ("Network Technician", 70000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Matt", "Tress", 5, NULL),
        ("Cathy", "Fuller", 3, NULL),
        ("Adam", "Zapel", 7, NULL),
        ("Shelley", "Greenway", 2, NULL),
        ("Chloe", "Pham", 4, 2),
        ("Jared", "Richardson", 6, 1),
        ("Rick", "Mckay", 6, 1); 
