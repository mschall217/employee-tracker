const inquirer = require("inquirer");
const connection = require("./connection");


connection.connect((err) => {
    if (err) throw err;
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
                    //value: ""
                },
                {
                    name: "Add Employee",
                    //value: ""
                },
                {
                    name: "View All Departments",
                    //value: ""
                },
                {
                    name: "Add Dempartment",
                    //value: ""
                },
                {
                    name: "View All Roles",
                    //value: ""
                },
                {
                    name: "Add Role",
                    //value: ""
                },
                {
                    name: "Update Employee Role",
                    //value: ""
                },
                {
                    name: "Quit",
                    //value: ""
                }
            ]
      })
      .then((answer) => {
          console.log(answer);
      })
  }