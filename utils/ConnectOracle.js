// const oracledb = require('oracledb');
// oracledb.initOracleClient({libDir: 'C:\\instantclient_21_3'});

// const connection = oracledb.getConnection({
//   user:"MENU",
//   password:"mayin",
//   connectString:"192.168.3.11/system"
// });

// module.exports = connection;


const oracledb = require('oracledb');
require('dotenv').config({ path: '.env.local' }); // Load environment variables from a .env file

// Initialize the Oracle client (required for local Oracle client library)
oracledb.initOracleClient({ libDir: 'C:\\instantclient_21_3' });

// This function returns a promise with the database connection
async function getDBConnection() {
  try {
    // Fetch connection details from environment variables
    const con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });
    return con;
  } catch (err) {
    console.error('Error connecting to Oracle DB:', err);
    throw err;  // Rethrow the error to be handled by the caller
  }
}

module.exports = getDBConnection;
