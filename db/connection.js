const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,
  user: 'root',
  // Be sure to update with your own MySQL password!
  password: 'Mas73019!',
  database: 'employee_DB',
});

module.exports = connection;