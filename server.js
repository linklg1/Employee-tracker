const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require('console.table');
const {connection} = require('./config/connection');

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
});

function init() {
    inquirer.prompt([
        {
          name: "choice",
          type: "list",
          message: "What would you like to do?",
          choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a new department",
            "Add a new role",
            "Add a new employee",
            "Remove an employee",
            "Remove a role",
            "Remove a department",
            "Update employee roles",
            "View the total utilized budget of a department",
            "Quit"
          ]
        }])

        .then(function (response) {
            switch (response.choice) {
              case "View all departments":
                viewDepartments();
                break;
              case "View all roles":
                viewRoles();
                break;
              case "View all employees":
                viewEmployees();
                break;
              case "Add a new department":
                addDepartment();
                break;
              case "Add a new role":
                addRole();
                break;
              case "Add a new employee":
                addEmployee();
                break;
              case "Remove an employee":
                removeEmployee();
                break;
              case "Remove a role":
                removeRole();
                break;
              case "Remove a department":
                  removeDepartment();
                  break;
              case "Update employee roles":
                selectEmp();
                break;
              case "Quit":
                process.exit(0);
                break;
            }
          });
      };

