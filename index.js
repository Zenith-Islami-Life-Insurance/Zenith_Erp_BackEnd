// const oracledb = require('oracledb');
// oracledb.initOracleClient({libDir: 'C:\\instantclient_21_3'});
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const getDBConnection = require("./utils/ConnectOracle");

async function connstr(){
    let con;

    try{
        con = await getDBConnection();

        const data = await con.execute("SELECT * FROM HRD.ATTENDANCE_DETAILS");
        console.log(data.rows);
    }catch(err){
        console.error(err);
    }
}

connstr();
