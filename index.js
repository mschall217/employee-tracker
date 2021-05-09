const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./db/connection');


connection.connect((err) => {
    if (err) throw err;
    console.log('Welcome to the Employee Tracker!')
    search();
  });

  const search = () => {
    inquirer
      .prompt({
            type: 'list',
            name: 'initial',
            message: 'What would you like to do? (use arrow keys)',
            choices: [
                {
                    name: "View All Employees",
                    value: "View_All"
                },
                {
                    name: "Add Employee",
                    value: "Add_Employee"
                },
                {
                    name: "View All Departments",
                    value: "All_Departments"
                },
                {
                    name: "Add Dempartment",
                    value: "Add_Department"
                },
                {
                    name: "View All Roles",
                    value: "All_Roles"
                },
                {
                    name: "Add Role",
                    value: "Add_Role"
                },
                {
                    name: "Update Employee Role",
                    value: "Update_Role"
                },
                {
                    name: "Quit",
                    value: "Quit"
                }
            ]
      })
      .then((answer) => {
          console.log(answer.initial);
          switch(answer.initial){
                case "View_All":
                    viewAllEmployees();
                break;

                case "Add_Employee":
                    addEmployee();
                break;

                case "All_Departments":
                    viewAllDepartments();
                break;

                case "Add_Department":
                    addDepartment();
                break;

                case "All_Roles":
                    viewAllRoles();
                break;

                case "Add_Role":
                    addRole();
                break;

                case "Update_Role":
                    updateRole();
                break;

                case "Quit":
                    quit();
                break;
          }
      })
  }


const viewAllEmployees = () => {
    console.log('This function views all employees')
    search();
}

const addEmployee = () => {
    console.log('This function adds an employees')
    search();
}

const viewAllDepartments = () => {
    console.log('This function views all departments')
    search();
}

const addDepartment = () => {
    console.log('This function adds a department')
    search();
}

const viewAllRoles = () => {
    console.log('This function views all roles')
    search();
}

const addRole = () => {
    console.log('This function adds a role')
    search();
}

const updateRole = () => {
    console.log('This function updates a role')
    search();
}

const quit = () => {
    console.log('This function quits')
    process.exit();
}