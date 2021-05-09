const mysql = require('mysql');
const inquirer = require('inquirer');
const db = require('./db');

connection.connect((err) => {
    if (err){
        console.log(err)
    }
    else{
        console.log("Now It's Workin!")
    }
  });