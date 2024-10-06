const mysql = require('mysql');

// Create the MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',         // Change this based on your setup
  user: 'root',              // Your MySQL username
  password: 'Mwangala@50', // Your MySQL password
  database: 'crowdsourced_app'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.log('Database connection error:', err);
  } else {
    console.log('Database connected');
  }
});

module.exports = db;
