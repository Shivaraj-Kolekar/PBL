const mysql = require('mysql2');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_root_password'
});

// Connect to MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server');

  // Create the database
  connection.query('CREATE DATABASE IF NOT EXISTS your_database_name', (err, results) => {
    if (err) {
      console.error('Error creating database:', err);
      connection.end(); // Close the connection
      return;
    }
    console.log('Database created or already exists');

    // Create the user and grant privileges
    connection.query(`CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';
                      GRANT ALL PRIVILEGES ON your_database_name.* TO 'your_username'@'localhost';`, (err, results) => {
      if (err) {
        console.error('Error creating user and granting privileges:', err);
        connection.end(); // Close the connection
        return;
      }
      console.log('User created and privileges granted');

      // Flush privileges
      connection.query('FLUSH PRIVILEGES', (err, results) => {
        if (err) {
          console.error('Error flushing privileges:', err);
          connection.end(); // Close the connection
          return;
        }
        console.log('Privileges flushed');

        // Close the connection
        connection.end((err) => {
          if (err) {
            console.error('Error closing connection:', err);
            return;
          }
          console.log('Connection closed');
        });
      });
    });
  });
});
