USE employee_DB;

INSERT INTO departments (name)
VALUES ("Sales");

INSERT INTO departments (name)
VALUES ("Customer Service");

INSERT INTO roles (title, salary, dept_id)
VALUES ("CEO", 89000, 1);

INSERT INTO roles (title, salary, dept_id)
VALUES ("Department Manager", 60000, 2);

INSERT INTO employees (firstName, lastName, role_id, manager_id)
VALUES ("Peter", "Parker", 1, null);

INSERT INTO employees (firstName, lastName, role_id, manager_id)
VALUES ("Jane", "Doe", 2, null);