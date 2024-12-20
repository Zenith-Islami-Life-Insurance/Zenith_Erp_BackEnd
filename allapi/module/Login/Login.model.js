// const connection = require("../../../utils/ConnectOracle");
// const oracledb = require('oracledb');
// oracledb.initOracleClient({ libDir: 'C:\\instantclient_21_3' });

const getDBConnection = require("../../../utils/ConnectOracle");

const Login = {
  getById: async (personalId, password, callback) => {
    let con;
    try {
      con = await getDBConnection();

      const result = await con.execute(
        "SELECT PERSONALID,NAME,ROLE_ID,ROLE_NAME,DEPARTMENT,DEP_NAME,PROJECT,USER_TYPE FROM USER_ROLE_DEPT WHERE PERSONALID = :personalId AND USER_PASSWORD = :password",
        {
          personalId: personalId,
          password: password
        }
      );

      // Assuming you want to return the first row
      const data = result.rows[0];
      callback(null, data);
    } catch (err) {
      console.error(err);
      callback(err, null);
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

};

module.exports = Login;
