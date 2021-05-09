const inquirer = require("inquirer");
const connection = require("./connection");


connection.connect((err) => {
    if (err){
        console.log(err)
    }
    else{
        console.log("Now It's Workin!")
    }
  });
