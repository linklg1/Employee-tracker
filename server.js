const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require('console.table');
const {connection} = require('./config/connection');

// build connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
});
// main inquiry

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

// View functions

function viewDepartments() {
    connection.query(`SELECT * FROM departments`, function (err, res) {
      if (err) throw err;
      console.table(response);
      init();
    })
  };
  
  function viewRoles() {
    connection.query(`SELECT * FROM roles`, function (err, res) {
      if (err) throw err;
      console.table(response);
      init();
    })
  };
  
  function viewEmployees() {
    connection.query(`SELECT * FROM employees`, function (err, res) {
      if (err) throw err;
      console.table(response);
      init();
    })
  };

  // Add functions
  
  //department

  function addDepartment() {
    inquirer.prompt([
      {
        name: "addDept",
        type: "input",
        message: "What is the name of the new department?"
      }
    ]).then(function (response) {
      connection.query(
        "INSERT INTO departments SET ?", {
        name: response.addDept
      },
        function (err, res) {
          if (err) throw err;
          console.log(" Department Successfully Added!\n");
          init();
        }
      );
    });
  }
  
// role
  function addRole() {
    connection.query("SELECT * FROM departments", function (err, res) {
      if (err) throw err;     
      inquirer.prompt([
        {
          name: "role",
          type: "input",
          message: "What is the new role?"
        },
        {
          name: "pay",
          type: "number",
          message: "What is the salary?",
        },
        {
          name: "deptId",
          type: "rawlist",
          message: "Select a department for this role",
          choices: res.map(item => item.name)
        }
      ]).then(function (responses) {
        const selectedDept = res.find(dept => dept.name === responses.deptId);
        connection.query("INSERT INTO roles SET ?",
          {
            title: responses.role,
            salary: responses.pay,
            dept_id: selectedDept.id
          },
          function (err, res) {
            if (err) throw err;
            console.log("New role successfully added!\n");
            init();
          }
        );
      });
    })
  };

  // employee 
  function addEmployee() {
    connection.query("SELECT * FROM roles", function (err, results) {
      if (err) throw err;
      inquirer.prompt([
        {
          name: "first",
          type: "input",
          message: "What is the new employee's first name?"
        },
        {
          name: "last",
          type: "input",
          message: "What is the new employee's last name?"
        },
        {
          name: "roleId",
          type: "rawlist",
          choices: results.map(item => item.title),
          message: "Select a role for the employee"
        }
      ]).then(function (responses) {
        const selectedRole = results.find(item => item.title === responses.roleId);
        connection.query("INSERT INTO employees SET ?",
          {
            first_name: responses.first,
            last_name: responses.last,
            role_id: selectedRole.id
          }, function (err, res) {
            if (err) throw err;
            console.log("Added new employee named " + responses.first + " " + responses.last + "\n");
            init();
          })
      })
    })
  };

  //remove functions
 // employee
  function removeEmployee() {
    connection.query("SELECT * FROM employees", function (err, res) {
      if (err) throw err;
      inquirer.prompt([
        {
          type: "rawlist",
          name: "removeEmployee",
          message: "Select the employee who you want to remove",
          choices: res.map(emp => emp.id && emp.first)
        }
      ]).then(function (response) {
        const selectedEmp = res.find(emp => emp.id && emp.first === response.removeEmployee);
        connection.query("DELETE FROM employees WHERE ?",
          [{
            id: selectedEmp.id
          }],
          function (err, res) {
            if (err) throw err;
            console.log("Employee Successfully Removed\n");
            init();
          }
        );
      });
    })
  };
  //role
  function removeRole() {
    connection.query("SELECT * FROM roles", function (err, res) {
      if (err) throw err;
      inquirer.prompt([
        {
          type: "rawlist",
          name: "removeRole",
          message: "Select the role you want to remove",
          choices: res.map(role => role.id && role.title)
        }
      ]).then(function (response) {
        const selectedRole = res.find(role => role.id && role.role === response.removeRole);
        connection.query("DELETE FROM roles WHERE ?",
          [{
            id: selectedRole.id
          }],
          function (err, res) {
            if (err) throw err;
            console.log("Role Successfully Removed\n");
            init();
          }
        );
      });
    })
  };
  //department
  function removeDepartment() {
    connection.query("SELECT * FROM departments", function (err, res) {
      if (err) throw err;
      inquirer.prompt([
        {
          type: "rawlist",
          name: "removeDept",
          message: "Select the department you want to remove",
          choices: res.map(item => item.id && item.name)
        }
      ]).then(function (response) {
        const selectedDept = res.find(item => item.id && item.name === response.removeDept);
        connection.query("DELETE FROM roles WHERE ?",
          [{
            id: selectedDept.id
          }],
          function (err, res) {
            if (err) throw err;
            console.log("Department Successfully Removed\n");
            init();
          }
        );
      });
    })
  };