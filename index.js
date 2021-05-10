const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("./db/connection");
const logo = require('asciiart-logo');

connection.connect((err) => {
	if (err) throw err
    const logoTitle = logo({name: "Employee Tracker", font:"ANSI Shadow",color: "bold-green"}).render();
    console.log(logoTitle)
	console.log("Welcome to the Employee Tracker!");
	search();
});

const search = () => {
	inquirer
		.prompt({
			type: "list",
			name: "initial",
			message: "What would you like to do? (use arrow keys)",
			choices: [
				{
					name: "View All Employees",
					value: "View_All",
				},
				{
					name: "Add Employee",
					value: "Add_Employee",
				},
				{
					name: "View All Departments",
					value: "All_Departments",
				},
				{
					name: "Add Department",
					value: "Add_Department",
				},
				{
					name: "View All Roles",
					value: "All_Roles",
				},
				{
					name: "Add Role",
					value: "Add_Role",
				},
				{
					name: "Update Employee Role",
					value: "Update_Role",
				},
				{
					name: "Quit",
					value: "Quit",
				},
			],
		})
		.then((answer) => {
			console.log(answer.initial);
			switch (answer.initial) {
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
		});
};

const viewAllEmployees = () => {
	console.log("This function views all employees");
	connection.query(
		`SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS person, role.title, role.salary FROM employee INNER JOIN role on role.id = employee.role_id;`,
		function (err, res) {
			if (err) throw err;
			console.log("\n");
			console.table(res);
			search();
		}
	);
};

let roleChoices = [];
const selectRole = () => {
	connection.query(`SELECT * FROM role`, function (err, res) {
		if (err) throw err;
		for (let r = 0; r < res.length; r++) {
			roleChoices.push(res[r].title);
		}
	});
	return roleChoices;
};

const addEmployee = () => {
	console.log("This function adds an employees");
	inquirer
		.prompt([
			{
				name: "first_name",
				type: "input",
				message: "Please enter their first name:",
			},
			{
				name: "last_name",
				type: "input",
				message: "Please enter their last name:",
			},
			{
				name: "role",
				type: "list",
				message: "what is their role?",
				choices: selectRole(),
			},
		])
		.then(function (answers) {
			let roleID = selectRole().indexOf(answers.role) + 1;
			connection.query(
				`INSERT INTO employee SET ?`,
				{
					first_name: answers.first_name,
					last_name: answers.last_name,
					role_id: roleID,
				},
				function (err) {
					if (err) throw err;
					console.table(answers);
					search();
				}
			);
		});
};

const viewAllDepartments = () => {
	console.log("This function views all departments");
	connection.query(`SELECT * FROM department`, function (err, res) {
		if (err) throw err;
		console.log("\n");
		console.table(res);
		search();
	});
};

const addDepartment = () => {
	console.log("This function adds a department");
	inquirer
		.prompt([
			{
				name: "name",
				type: "input",
				message: "What department would you like to add?",
			},
		])
		.then(function (answers) {
			connection.query(
				`INSERT INTO department SET ?`,
				{
					name: answers.name,
				},
				function (err) {
					if (err) throw err;
					console.table(answers);
					search();
				}
			);
		});
};

const viewAllRoles = () => {
	console.log("This function views all roles");
	connection.query(
		`SELECT role.id, role.title, department.name AS department FROM department INNER JOIN role on role.department_id = department.id;`,
		function (err, res) {
			if (err) throw err;
			console.log("\n");
			console.table(res);
			search();
		}
	);
};
let departmentChoices = [];
const selectDepartment = () => {
	connection.query(`SELECT * FROM department`, function (err, res) {
		if (err) throw err;
		for (let d = 0; d < res.length; d++) {
			departmentChoices.push(res[d].name);
		}
	});
	return departmentChoices;
};

const addRole = () => {
	console.log("This function adds a role");
	inquirer
		.prompt([
			{
				name: "title",
				type: "input",
				message: "What is the title of this role?",
			},
			{
				name: "salary",
				type: "input",
				message: "What is the salary of this role",
			},
			{
				name: "department",
				type: "list",
				message: "What department does this role belong to?",
				choices: selectDepartment(),
			},
		])
		.then(function (answers) {
			let departmentID = selectDepartment().indexOf(answers.department) + 1;
			connection.query(
				`INSERT INTO role SET ?`,
				{
					title: answers.title,
					salary: answers.salary,
					department_id: departmentID,
				},
				function (err) {
					if (err) throw err;
					console.table(answers);
					search();
				}
			);
		});
};


const updateRole = () => {
	console.log("This function updates a role");
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee INNER JOIN role on role.id = employee.role_id;`,
    function(err, res){
        if(err)throw err
        console.log("\n");
        console.table(res);
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the employee's ID number from the table above?"
            },
            {
                name: "role",
                type: "list",
                message: "What is the employees new title?",
                choices: selectRole()
            }
        ]).then(function(answers){
			let roleID = selectRole().indexOf(answers.role) + 1;
            connection.query(`UPDATE employee SET role_id="${roleID}" WHERE id=${answers.id}`, 
            function (err) {
                if (err) throw err
                console.table(answers)
                search();
            })
        })
    })
};

const quit = () => {
	console.log("This function quits");
	process.exit();
};
