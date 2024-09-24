const connection = require("../../../utils/ConnectOracle");
const oracledb = require("oracledb");
oracledb.initOracleClient({ libDir: "C:\\instantclient_21_3" });
const config = {
  user: 'MENU',
  password: 'mayin',
  connectString: '192.168.3.11/system'  // replace with your actual connection string
};
function convertDateToMMDDYYYY(dateString) {
  if (typeof dateString !== 'string' || dateString.length !== 8) {
    throw new Error('Invalid date format');
  }

  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  return `${month}/${day}/${year}`;
}

const proposal = {
  //PROPOSAL-1 PAGE
  InsertProposalData: async (proposals) => {
    let con;

    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });
      const results = [];

      for (const proposal of proposals) {
        const {
          PROPOSAL_N,
          POL_ENTRY_STATUS,
          PROPOSAL_D,
          RISKDATE,
          PROPOSER,
          FATHERS_NAME,
          FATHERHUSB,
          MOTHERS_NAME,
          ADDRESS1,
          POST_CODE_CUR,
          POST_CODE_PER,
          CITY,
          MOBILE,
          LOCALITY,
          N_ID_NUMBER,
          DOB,
          AGE,
          SEX,
          OCCUPATION,
          AGENT_ID,
          BRANCH_ID,
          USERID,
          LAST_EDUCATION,
          LAST_EDU_DOCUMENT,
          RELIGION,
          MARITAL_STATUS,
          LOCALITY_COUNTRY,
          SPOUSE,
          PD_CODE,
          MARRIAGE_DATE,
        } = proposal;

        // Safeguard against undefined date strings and convert them
        const formattedProposalDate = PROPOSAL_D ? convertDateToMMDDYYYY(PROPOSAL_D) : null;
        const formattedRiskDate = RISKDATE ? convertDateToMMDDYYYY(RISKDATE) : null;
        const formattedDOB = DOB ? convertDateToMMDDYYYY(DOB) : null;
        const formattedMarriageDate = MARRIAGE_DATE ? convertDateToMMDDYYYY(MARRIAGE_DATE) : null;

        // Double-check all bind variables are defined and passed correctly
        const result = await con.execute(
          `INSERT INTO POLICY_MANAGEMENT.PROPOSAL_DUMMY(
                    PROPOSAL_N, POL_ENTRY_STATUS, PROPOSAL_D, RISKDATE, PROPOSER, 
                    FATHERS_NAME, FATHERHUSB, MOTHERS_NAME, ADDRESS1, POST_CODE_CUR, 
                    POST_CODE_PER, CITY, MOBILE, LOCALITY, N_ID_NUMBER, DOB, AGE, SEX, 
                    OCCUPATION, AGENT_ID, BRANCH_ID, USERID, LAST_EDUCATION, 
                    LAST_EDU_DOCUMENT, RELIGION, MARITAL_STATUS, LOCALITY_COUNTRY, SPOUSE, PD_CODE, MARRIAGE_DATE
                ) 
                VALUES(
                    :PROPOSAL_N, :POL_ENTRY_STATUS, TO_DATE(:PROPOSAL_D, 'MM/DD/YYYY'), 
                    TO_DATE(:RISKDATE, 'MM/DD/YYYY'), :PROPOSER, :FATHERS_NAME, :FATHERHUSB, 
                    :MOTHERS_NAME, :ADDRESS1, :POST_CODE_CUR, :POST_CODE_PER, :CITY, 
                    :MOBILE, :LOCALITY, :N_ID_NUMBER, TO_DATE(:DOB, 'MM/DD/YYYY'), :AGE, 
                    :SEX, :OCCUPATION, :AGENT_ID, :BRANCH_ID, :USERID, :LAST_EDUCATION, 
                    :LAST_EDU_DOCUMENT, :RELIGION, :MARITAL_STATUS, :LOCALITY_COUNTRY, :SPOUSE, :PD_CODE,
                    TO_DATE(:MARRIAGE_DATE, 'MM/DD/YYYY')
                )`,
          {
            PROPOSAL_N,           // Ensure this value is not undefined
            POL_ENTRY_STATUS,      // Check that all these fields exist and are properly bound
            PROPOSAL_D: formattedProposalDate,
            RISKDATE: formattedRiskDate,
            PROPOSER,
            FATHERS_NAME,
            FATHERHUSB,
            MOTHERS_NAME,
            ADDRESS1,
            POST_CODE_CUR,
            POST_CODE_PER,
            CITY,
            MOBILE,
            LOCALITY,
            N_ID_NUMBER,
            DOB: formattedDOB,
            AGE,
            SEX,
            OCCUPATION,
            AGENT_ID,
            BRANCH_ID,
            USERID,
            LAST_EDUCATION,
            LAST_EDU_DOCUMENT,
            RELIGION,
            MARITAL_STATUS,
            LOCALITY_COUNTRY,
            SPOUSE,
            PD_CODE,
            MARRIAGE_DATE: formattedMarriageDate,
          },
          { autoCommit: true }
        );

        results.push({ proposalNumber: PROPOSAL_N });
      }

      return results;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  },



  InsertProposalAddress: async (proposals) => {
    let con;

    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });
      const results = [];

      for (const proposal of proposals) {
        const {
          PROPOSAL_N,
          DCODE,
          TCODE,
          POST_CODE
        } = proposal;

        const result = await con.execute(
          `INSERT INTO POLICY_MANAGEMENT.PROPOSAL_ADDRESS(PROPOSAL_N,DCODE,TCODE,POST_CODE
          ) 
          VALUES(
            :PROPOSAL_N,
            :DCODE,
            :TCODE,
            :POST_CODE
          )`,
          {
            PROPOSAL_N,
            DCODE,
            TCODE,
            POST_CODE
          },
          { autoCommit: true }
        );

        results.push(result.outBinds);
      }

      return results;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  },
  InsertProposalExtend: async (proposals) => {
    let con;

    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });
      const results = [];

      for (const proposal of proposals) {
        const {
          PROPOSAL_N,
        } = proposal;

        const result = await con.execute(
          `INSERT INTO POLICY_MANAGEMENT.PROPOSAL_DUMMY_EXTEND(PROPOSAL_N) 
           VALUES(:PROPOSAL_N)`,
          {
            PROPOSAL_N,
          },
          { autoCommit: true }
        );

        results.push(result.outBinds);
      }

      return results;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  },
  InsertProposalChain: async (proposals) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });
      const results = [];

      for (const proposal of proposals) {
        const {
          PROPOSAL_N,
          CHAIN_CODE,
          USER_ID

        } = proposal;

        const result = await con.execute(
          `INSERT INTO POLICY_MANAGEMENT.PROPOSAL_DUMMY_CHAIN(PROPOSAL_N,CHAIN_CODE,USER_ID) 
           VALUES(:PROPOSAL_N,:CHAIN_CODE,:USER_ID)`,
          {
            PROPOSAL_N,
            CHAIN_CODE,
            USER_ID,
          },
          { autoCommit: true }
        );

        results.push(result.outBinds);
      }

      return results;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  },
  InsertNominee: async (proposals) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });
      const results = [];

      for (const proposal of proposals) {
        const {
          PROPOSAL_N,


        } = proposal;

        const result = await con.execute(
          `INSERT INTO POLICY_MANAGEMENT.NOMINEE(PROPOSAL_N) 
           VALUES(:PROPOSAL_N)`,
          {
            PROPOSAL_N,

          },
          { autoCommit: true }
        );

        results.push(result.outBinds);
      }

      return results;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  },
  InsertProposalChainSetup: async (proposals) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });
      const results = [];

      for (const proposal of proposals) {
        const {
          PROPOSAL_N,
          v_fa_code,
          v_user_id
        } = proposal;

        const result = await con.execute(
          `BEGIN
             POLICY_MANAGEMENT.PROPOSAL_CHAIN_SETUP(:PROPOSAL_N, :v_fa_code, :v_user_id);
           END;`,
          {
            PROPOSAL_N,
            v_fa_code,
            v_user_id,
          },
          { autoCommit: true }
        );

        results.push(result);
      }

      return results;
    } catch (err) {
      console.error("Error during insert operation:", err);
      throw err;
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error("Error closing the connection:", err);
        }
      }
    }
  },

  //update data

  updateTables: async (updateData1, updateData2, proposalNumber) => {
    let connection;

    try {
      connection = await oracledb.getConnection(config);

      // Start a transaction
      await connection.execute('SAVEPOINT sp1');

      // Filter out BRANCH_ID and PROPOSAL_N from updateData1
      const filteredUpdateData1 = Object.fromEntries(
        Object.entries(updateData1).filter(([key]) => key !== 'BRANCH_ID' && key !== 'PROPOSAL_N')
      );

      // Update for the Proposal_Dummy table
      const setClause1 = Object.keys(filteredUpdateData1)
        .map((key) => `${key} = :${key}`)
        .join(', ');

      const sql1 = `UPDATE POLICY_MANAGEMENT.PROPOSAL_DUMMY SET ${setClause1} WHERE PROPOSAL_N = :proposal_number`;
      const binds1 = { ...filteredUpdateData1, proposal_number: proposalNumber };

      console.log('Executing SQL1:', sql1, 'with binds:', binds1);  // Debugging statement
      await connection.execute(sql1, binds1);

      // Filter out BRANCH_ID and PROPOSAL_N from updateData2
      const filteredUpdateData2 = Object.fromEntries(
        Object.entries(updateData2).filter(([key]) => key !== 'BRANCH_ID' && key !== 'PROPOSAL_N')
      );

      // Update for the Address table
      const setClause2 = Object.keys(filteredUpdateData2)
        .map((key) => `${key} = :${key}`)
        .join(', ');

      const sql2 = `UPDATE POLICY_MANAGEMENT.PROPOSAL_ADDRESS SET ${setClause2} WHERE PROPOSAL_N = :proposal_number`;
      const binds2 = { ...filteredUpdateData2, proposal_number: proposalNumber };

      console.log('Executing SQL2:', sql2, 'with binds:', binds2);  // Debugging statement
      await connection.execute(sql2, binds2);

      // Commit the transaction
      await connection.commit();

      return true;

    } catch (err) {
      if (connection) {
        try {
          // Rollback the transaction if there is an error
          await connection.execute('ROLLBACK');
        } catch (rollbackErr) {
          console.error('Error during rollback:', rollbackErr);
        }
      }
      console.error('Error updating the tables:', err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error closing the connection:', err);
        }
      }
    }
  },

  //PROPOSAL-2 PAGE
  InsertProposal2Data: async (proposals) => {
    let con;

    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const results = [];

      for (const proposal of proposals) {
        const {
          TABLE_ID, TERM,
        } = proposal;

        const result = await con.execute(
          `INSERT INTO POLICY_MANAGEMENT.PROPOSAL_DUMMY(TABLE_ID, TERM) 
            
            VALUES(:TABLE_ID,:TERM)`,
          {
            TABLE_ID,
            TERM,

          },
          { autoCommit: true }
        );

        results.push(result.outBinds);
      }

      return results;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  },

  //FIND PROPOSAL NUMBER
  getProposalnNumber: async (OFFICE_CODE, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT POLICY_MANAGEMENT.M_PROPOSAL_NO(:OFFICE_CODE) FROM SYS.DUAL",
        { OFFICE_CODE: OFFICE_CODE }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //ID TYPE  LIST
  getIdTypeList: (callback) => {
    async function type() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT DISTINCT * FROM  POLICY_MANAGEMENT.ONLINE_AGEPROOF"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    type();
  },
  //ID TYPE  LIST

  //ALL Edication LIST
  getEducation: (callback) => {
    async function education() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT EDNAME,EDCODE FROM POLICY_MANAGEMENT.ONLINE_EDUCATION"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    education();
  },
  //ALL Religion LIST
  getReligion: (callback) => {
    async function religion() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT RELIGIONS_NAME,RELIGIONS_ID FROM POLICY_MANAGEMENT.ONLINE_RELIGIONS"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    religion();
  },

  //ALL COUNTRY LIST
  getOccupname: (callback) => {
    async function occupation() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT OCCUPNAME,OCCUP FROM POLICY_MANAGEMENT.ONLINE_OCCUPATION ORDER BY OCCUPNAME"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    occupation();
  },
  //ALL COUNTRY LIST
  getAllCountry: (callback) => {
    async function COUNTRY() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT DISTINCT  C_NAME,C_CODE FROM POLICY_MANAGEMENT.COUNTRY"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    COUNTRY();
  },
  //ALL BRANCH LIST
  getAllBranch: (callback) => {
    async function allbranch() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT NAME,BRANCH_ID FROM POLICY_MANAGEMENT.BRANCH WHERE OFFICE_STATUS='A' ORDER BY NAME"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    allbranch();
  },

  //GENDER LIST
  getAllGender: (callback) => {
    async function allgender() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT GENDER_NAME,GENDER_ID FROM POLICY_MANAGEMENT.ONLINE_GENDER"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    allgender();
  },

  //LOCALITY LIST
  getAlllocallity: (callback) => {
    async function allLocallity() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT LOCALITY_TYPE,LOCALITY_ID FROM POLICY_MANAGEMENT.ONLINE_LOCALITY"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    allLocallity();
  },

  //ALL PROJECT LIST
  getAllproject: (callback) => {
    async function allprojects() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT 'PROJECT-'||CODE NAME, CODE FROM POLICY_MANAGEMENT.PD WHERE STAT='A' ORDER BY CODE"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    allprojects();
  },

  //DIVISION LIST
  getDivisionList: (callback) => {
    async function allDivision() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT DNAME DIVNAME,DCODE FROM POLICY_MANAGEMENT.DISTRICT ORDER BY DIVNAME"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    allDivision();
  },

  //CHAIN LIST
  getchainListbyprojectid: async (base_project, base_code, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT CHAIN_NAME,CHAIN_CODE,CHAIN_DESIGNATION,CHAIN_POSITION FROM (SELECT DISTINCT BASE_NAME CHAIN_NAME,BASE_CODE CHAIN_CODE,'FA' CHAIN_DESIGNATION,1 CHAIN_POSITION FROM POLICY_MANAGEMENT.ALL_SENIOR_INFO_DETAILS  WHERE BASE_PROJECT=:base_project AND  BASE_CODE=:base_code AND BASE_DSGN='01' UNION ALL SELECT CHAIN_NAME,CHAIN_CODE,CHAIN_DESIGNATION,CHAIN_POSITION FROM POLICY_MANAGEMENT.ALL_SENIOR_INFO_DETAILS WHERE BASE_PROJECT=:base_project AND  BASE_CODE=:base_code AND BASE_DSGN='01') ORDER BY CHAIN_POSITION",
        [base_project, base_code]
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //PROPOSAL INFORMATION
  getProposalInfo: async (proposal_no, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT PROPOSAL_N,PROPOSAL_D,RISKDATE,TABLE_ID,TERM,SUM_INSURE,PREMIUM,SUMATRISK,PROPOSER,SALUTE,ADDRESS1,ADDRESS2,CITY,ZIP,MOBILE,DOB,AGE,AGE_P_CODE,FATHERHUSB,SEX,OCCUPATION,INSTMODE,TOTALINST,INSTNO,AGENT_ID,PD_CODE,MOTHERS_NAME,FATHERS_NAME,MARITAL_STATUS,N_ID_NUMBER,PLAN_DESCRIPTION, POL_ENTRY_STATUS,LAST_EDU_DOCUMENT,MARRIAGE_DATE,SPOUSE,LAST_EDUCATION,ACCPREM,ACCRATE,WAIVER_OF_PREMIUM,HOSPREMIUM,OEPREM,MAJOR_DIS_RIDER,IPD_RIDER FROM POLICY_MANAGEMENT.PROPOSAL_DUMMY WHERE PROPOSAL_N=:proposal_no",
        { proposal_no: proposal_no }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //POLICY INFORMATION
  getPolicyInfo: async (policy_no, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT POLICY_NO, PROPOSER,RISKDATE,SUM_INSURE FROM POLICY_MANAGEMENT.PROPOSAL WHERE POLICY_NO=:policy_no",
        { policy_no: policy_no }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //AGENT LIST
  getAgentList: async (base_project, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT DISTINCT BASE_NAME,BASE_CODE FROM POLICY_MANAGEMENT.ALL_SENIOR_INFO_DETAILS WHERE BASE_PROJECT=:base_project AND BASE_DSGN='01'",
        { base_project: base_project }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //THANA LIST
  getThanaList: async (div_code, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT THANA,TCODE FROM POLICY_MANAGEMENT.THANA WHERE DCODE=:div_code",
        { div_code: div_code }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //POST OFFICE LIST
  getPostList: async (code, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT POST_OFFICE_NM,POST_CODE FROM POLICY_MANAGEMENT.POST_OFFICE WHERE THANA_CODE=:code",
        { code: code }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //commencement data info
  getCommencementDate: async (com_date, policy_type, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT POLICY_MANAGEMENT.API_COMM_DATE (TO_DATE(:com_date, 'YYYYMMDD'),:policy_type) FROM SYS.DUAL",
        {
          com_date: com_date,
          policy_type: policy_type,
        }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //ALL PLAN LIST
  getAllPlan: async (age, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT PLAN_ID, PLAN_DESCRIPTION,SUPPLEMENTARY,EXTRA_LOADING,MAJOR_DIEASES_RIDER,INPATIENT_RIDER,PREMIUM_WAIVER, CALCULATION_TYPE, MIN_AGE, MAX_AGE, MIN_TERM, MAX_TERM, MIN_SUMINS, MAX_SUMINS FROM POLICY_MANAGEMENT.PLANS WHERE :AGE BETWEEN MIN_AGE AND MAX_AGE AND IDRA_SENT = 'Y'",
        { age: age }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //PAYMNENT MODE LIST
  getPaymodeList: async (plan_id, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT MODE_CODE, MODE_NAME FROM POLICY_MANAGEMENT.PAYMENT_MODE_PLANWISE A, POLICY_MANAGEMENT.PAY_MODE B WHERE A.MODE_CODE=B.MODE_ID AND A.TABLE_ID=:plan_id",
        { plan_id: plan_id }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //term list
  getTermList: async (plan_id, age, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT DISTINCT TERM from POLICY_MANAGEMENT.POLICY01 WHERE TABLE_ID=:plan_id AND AGE<=:age ORDER BY TERM",
        {
          plan_id: plan_id,
          age: age,
        }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //find age
  getAge: async (comm_date, dob, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT POLICY_MANAGEMENT.AGE( TO_DATE(:comm_date,'YYYYMMDD'),TO_DATE(:dob,'YYYYMMDD') ) FROM sys.DUAL",
        {
          comm_date: comm_date,
          dob: dob,
        }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },
  //find Nominee age
  getNomineeAge: async (comm_date, dob, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT POLICY_MANAGEMENT.AGE( TO_DATE(:comm_date,'YYYYMMDD'),TO_DATE(:dob,'YYYYMMDD') ) FROM sys.DUAL",
        {
          comm_date: comm_date,
          dob: dob,
        }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },
  //total_installment
  getTotalInstallment: async (pay_mode, term, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT POLICY_MANAGEMENT.TOTAL_INSTALMENT(:pay_mode,:term) FROM SYS.DUAL",
        {
          pay_mode: pay_mode,
          term: term,
        }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //rate calculation
  getRateCalcultion: async (age, term, table_id, cAge, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT RATE, FACTOR FROM POLICY_MANAGEMENT.POLICY01 WHERE AGE=:age AND TERM=:term AND TABLE_ID=:table_id AND C_AGE=:cAge",
        { age, term, table_id, cAge }
      );

      const data = result;
      callback(null, data.rows);
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
  },


  //ALL PREMIUM LIST
  getPremiumlist: (callback) => {
    async function premium() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT DISTINCT PREMIUM,PREMIUM/100 PREM_AMT FROM POLICY_MANAGEMENT.MONTHLY_PREMIUM"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    premium();
  },

  //ALL BANK LIST
  getBanklist: (callback) => {
    async function bank() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT DISTINCT BANKCODE,BANKNAME FROM POLICY_MANAGEMENT.BANK_BRANCH_VIEW"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    bank();
  },

  //BRANCH LIST
  getBankBranchList: async (bank_code, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT DISTINCT BRANCHNAME,ROUTINGNO FROM POLICY_MANAGEMENT.BANK_BRANCH_VIEW WHERE BANKCODE=:bank_code",
        { bank_code: bank_code }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },
  //NOMINEE BRANCH LIST
  getNomineeBranchList: async (bank_code, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT DISTINCT BRANCHNAME,ROUTINGNO FROM POLICY_MANAGEMENT.BANK_BRANCH_VIEW WHERE BANKCODE=:bank_code",
        { bank_code: bank_code }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //ALL SUPPL. CLASS LIST
  getSupplClasslist: (occup_id, supp_code, callback) => {
    async function SupplClass() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          `SELECT CLASS_ID, CLASS_NAME 
           FROM (
             SELECT DISTINCT a.CLASS_ID, b.CLASS_NAME 
             FROM POLICY_MANAGEMENT.SUPPLEMENTARY_RATE a, POLICY_MANAGEMENT.SUPPLEMENTARY_CLASS b 
             WHERE a.CLASS_ID = b.CLASS_ID 
             AND OCCUP = :occup_id 
             AND SUPP_CODE = :supp_code
           ) 
           ORDER BY CLASS_ID`,
          {
            occup_id: occup_id,
            supp_code: supp_code,
          }
        );
        callback(null, data.rows);
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
    SupplClass();
  },

  //ALL SUPPL.  LIST
  getSuppllist: (callback) => {
    async function SuppliClass() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT SUPP_CODE,SUPP_NAME FROM POLICY_MANAGEMENT.SUPPLEMENTARY_TYPE WHERE STATUS='A'"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    SuppliClass();
  },

  //SUPPL PREMIUM VALUE
  getSupplyPremium: async (
    table_id,
    occup_id,
    supp_type,
    supp_class,
    sum_assured,
    pay_mode,
    callback
  ) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT POLICY_MANAGEMENT.SUPPL_VAL(:table_id,:occup_id,:supp_type,:supp_class,:sum_assured,:pay_mode) FROM SYS.DUAL",
        {
          table_id: table_id,
          occup_id: occup_id,
          supp_type: supp_type,
          supp_class: supp_class,
          sum_assured: sum_assured,
          pay_mode: pay_mode,
        }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //new basic premium date:12/08/2024
  getBasicPremium: async (
    tableId,
    termId,
    userAge,
    instMode,
    sumAss,
    userOption,
    pensionValue,
    deathCoverage,
    callback
  ) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT CEIL(POLICY_MANAGEMENT.PREMIUM_VAL_NEW(:tableId, :termId, :userAge, :instMode, :sumAss, :userOption, :pensionValue, :deathCoverage)) AS BASIC_PREMIUM FROM DUAL",
        {
          tableId: tableId,
          termId: termId,
          userAge: userAge,
          instMode: instMode,
          sumAss: sumAss,
          userOption: userOption,
          pensionValue: pensionValue,
          deathCoverage: deathCoverage,
        }
      );

      const data = result.rows;

      if (data && data.length > 0) {
        callback(null, data);
      } else {
        callback(null, []);
      }
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
  },

  //sumassurance
  getSumassurance: async (
    table_id,
    term_id,
    age,
    monthlyPremium,
    sum_insured,
    callback
  ) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT (POLICY_MANAGEMENT.SUMINSURE_VALUE_NEW(:table_id,:term_id,:age,:monthlyPremium,:sum_insured)) FROM DUAL",
        {
          table_id: table_id,
          term_id: term_id,
          age: age,
          monthlyPremium: monthlyPremium,
          sum_insured: sum_insured,
        }
      );
      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //SUM AT RISK CALCULATION
  getSumAtRisk: async (
    table_id,
    sum_ass,
    premium,
    factor,
    instmode,
    callback
  ) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT POLICY_MANAGEMENT.RISK_VALUE(:table_id,:sum_ass,:premium,:factor,:instmode) FROM SYS.DUAL",
        {
          table_id: table_id,
          sum_ass: sum_ass,
          premium: premium,
          factor: factor,
          instmode: instmode,
        }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //PREM PLAN LIST
  getPremPlanList: async (sum_assured, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT PLAN_NO,PLAN_NAME FROM (SELECT DISTINCT PLAN_NO,PLAN_NAME FROM (select PLAN_NAME,YLY_MAX_BENEFIT,PLAN_NO from policy_management.IPD_PLAN WHERE PLAN_NO=1 UNION ALL select PLAN_NAME,YLY_MAX_BENEFIT,PLAN_NO from policy_management.IPD_PLAN WHERE NVL(YLY_MAX_BENEFIT,0)<=NVL(:sum_assured,0))) ORDER BY PLAN_NO",
        { sum_assured: sum_assured }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //IPD end at value
  getEndAtdate: async (RISKDATE, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT ADD_MONTHS(TO_DATE(:RISKDATE, 'YYYYMMDD'), 12)  FROM  SYS.DUAL",
        { RISKDATE: RISKDATE }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //get basic premium rate for ipd
  getPremRate: async (
    plan_no,
    dob,
    risk_rate,
    instmode,
    table_id,
    callback
  ) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT POLICY_MANAGEMENT.IPD_PREM_CALC_NEW(:plan_no,TO_DATE(:dob, 'YYYYMMDD'),TO_DATE(:risk_rate, 'YYYYMMDD'),:instmode,:table_id) FROM SYS.DUAL",
        {
          plan_no: plan_no,
          dob: dob,
          risk_rate: risk_rate,
          instmode: instmode,
          instmode: instmode,
          table_id: table_id,
        }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //get rider rate and premium
  getRiderRatePrem: async (
    table_id,
    term_id,
    dob,
    risk_date,
    sum_insured,
    instmode,
    callback
  ) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT POLICY_MANAGEMENT.CRITICAL_ILLNESS_CALC_NEW(:table_id,:term_id,TO_DATE(:dob, 'YYYYMMDD'),TO_DATE(:risk_date, 'YYYYMMDD'),:sum_insured,:instmode,'PREM') AS PREM,POLICY_MANAGEMENT.CRITICAL_ILLNESS_CALC_NEW(:table_id,:term_id,TO_DATE(:dob, 'YYYYMMDD'),TO_DATE(:risk_date,'YYYYMMDD'),:sum_insured,:instmode,'RATE') AS RATE FROM SYS.DUAL",
        {
          table_id: table_id,
          term_id: term_id,
          dob: dob,
          risk_date: risk_date,
          sum_insured: sum_insured,
          instmode: instmode,
        }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //get waiver premium
  getWaiverPrem: async (age, plan, basic_prem, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT POLICY_MANAGEMENT.PREMIUM_WAIVER(:age,:plan,:basic_prem) FROM SYS.DUAL",
        {
          age: age,
          plan: plan,
          basic_prem: basic_prem,
        }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //get supplimentary rate
  getSuppRate: async (occup_code, supp_code, class_id, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "select RATE from POLICY_MANAGEMENT.SUPPLEMENTARY_RATE where OCCUP=:occup_code and SUPP_CODE=:supp_code and CLASS_ID=:class_id",
        {
          occup_code: occup_code,
          supp_code: supp_code,
          class_id: class_id,
        }
      );

      // Assuming you want to return the first row
      const data = result.rows;
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
  },


  //get Occupation premium and rate
  getOErate: async (
    table_id,
    occup_code,
    gender,
    sum_assured,
    last_education,
    last_education_document,
    instmode,
    callback
  ) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT POLICY_MANAGEMENT.LOADING_VAL_NEW(:table_id,:occup_code,:gender,:sum_assured,:last_education,:last_education_document,:instmode) FROM SYS.DUAL",
        {
          table_id: table_id,
          occup_code: occup_code,
          gender: gender,
          sum_assured: sum_assured,
          last_education: last_education,
          last_education_document: last_education_document,
          instmode: instmode,
        }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  //get Hospital premium and rate

  getHospitalPremRate: async (
    table_id,
    occup_code,
    gender,
    sum_assured,
    last_education,
    last_education_document,
    instmode,
    callback
  ) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });
      // "SELECT POLICY_MANAGEMENT.HOSPITAL_EXTRA_NEW (:table_id,:occup_code,:gender,:sum_assured,:last_education,:last_education_document,NVL(:instmode,'1')) FROM SYS.DUAL",
      const result = await con.execute(
        "SELECT POLICY_MANAGEMENT.LOADING_VAL_NEW(:table_id,:occup_code,:gender,:sum_assured,:last_education,:last_education_document,:instmode) FROM SYS.DUAL",
        {
          table_id: table_id,
          occup_code: occup_code,
          gender: gender,
          sum_assured: sum_assured,
          last_education: last_education,
          last_education_document: last_education_document,
          instmode: instmode,
        }
      );

      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
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
  },

  // get hospital and occupation rate
  getOccupationRate: async (occup, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT NVL(OE_FE_RATE, 0) FROM POLICY_MANAGEMENT.ONLINE_OCCUPATION WHERE OCCUP = :occup",
        {
          occup: occup,
        }
      );

      // Assuming you want to return the first row and the first column
      const data = result.rows.length > 0 ? result.rows[0][0] : 0;
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
  },

  //get waiver premium
  getWaiverPrem: async (
    age,
    table_id,
    premium,
    callback
  ) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });
      const result = await con.execute(
        "SELECT POLICY_MANAGEMENT.PREMIUM_WAIVER(:age,:table_id,:premium) FROM SYS.DUAL",
        {
          age: age,
          table_id: table_id,
          premium: premium

        }
      );
      const data = result;
      callback(null, data.rows);
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
  },
  // get MDR Premium 
  getMdrPremium: async (
    table_id,
    term,
    dob,
    com_date,
    sumAssurance,
    instmode,
    prem,
    callback
  ) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        `SELECT POLICY_MANAGEMENT.CRITICAL_ILLNESS_CALC_NEW(
          :table_id,
          :term,
          TO_DATE(:dob,'YYYYMMDD'),
          TO_DATE(:com_date,'YYYYMMDD'),
          :sumAssurance,
          :instmode,
          :prem
        ) AS xx FROM DUAL`,
        {
          table_id: table_id,
          term: term,
          dob: dob, // Pass as YYYYMMDD
          com_date: com_date, // Pass as YYYYMMDD
          sumAssurance: sumAssurance,
          instmode: instmode,
          prem: prem,
        }
      );

      console.log("SQL Result: ", result);

      const data = result.rows || [];
      callback(null, data);
    } catch (err) {
      console.error("SQL Execution Error: ", err);
      callback(err, null);
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error("Error closing connection: ", err);
        }
      }
    }
  },
  // get MDR Raty 
  getMdrRate: async (
    table_id,
    term,
    dob,
    com_date,
    sumAssurance,
    instmode,
    rate,
    callback
  ) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        `SELECT POLICY_MANAGEMENT.CRITICAL_ILLNESS_CALC_NEW(
          :table_id,
          :term,
          TO_DATE(:dob,'YYYYMMDD'),
          TO_DATE(:com_date,'YYYYMMDD'),
          :sumAssurance,
          :instmode,
          :rate
        ) AS xx FROM DUAL`,
        {
          table_id: table_id,
          term: term,
          dob: dob,
          com_date: com_date,
          sumAssurance: sumAssurance,
          instmode: instmode,
          rate: rate,
        }
      );

      console.log("SQL Result: ", result);

      const data = result.rows || [];
      callback(null, data);
    } catch (err) {
      console.error("SQL Execution Error: ", err);
      callback(err, null);
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error("Error closing connection: ", err);
        }
      }
    }
  },
  //get plan name for Ipd Rider
  getPlanDetails: async (riskAdate, txtSumInsured, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });
      const result = await con.execute(
        `SELECT DISTINCT PLAN_NAME, PLAN_NO, YLY_MAX_BENEFIT, 
               TO_DATE(:RISKADATE, 'YYYYMMDD') AS START_FROM, 
               ADD_MONTHS(TO_DATE(:RISKADATE, 'YYYYMMDD'), 12) AS END_TO
        FROM (
          SELECT PLAN_NAME, YLY_MAX_BENEFIT, PLAN_NO 
          FROM policy_management.IPD_PLAN 
          WHERE PLAN_NO = 1
          UNION ALL
          SELECT PLAN_NAME, YLY_MAX_BENEFIT, PLAN_NO 
          FROM policy_management.IPD_PLAN 
          WHERE NVL(YLY_MAX_BENEFIT, 0) <= NVL(:TXT_SUM_INSURED, 0)
        )
        ORDER BY PLAN_NO`,
        {
          RISKADATE: riskAdate,
          TXT_SUM_INSURED: txtSumInsured,
        }
      );

      console.log("SQL Result: ", result);

      const data = result.rows || [];
      callback(null, data);
    } catch (err) {
      console.error("SQL Execution Error: ", err);
      callback(err, null);
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error("Error closing connection: ", err);
        }
      }
    }
  },
  //get Medical Status

  getMedicalStatus: async (proposalNo, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });
      const result = await con.execute(
        `SELECT POLICY_MANAGEMENT.MEDICAL_STATUS(:proposalNo) AS XX FROM SYS.DUAL`,
        {
          proposalNo: { val: proposalNo, dir: oracledb.BIND_IN, type: oracledb.STRING }, // Explicitly specify the binding type
        }
      );

      // Extract the result, handling different scenarios
      const data = result.rows.length > 0 ? result.rows[0][0] : null;
      callback(null, data);
    } catch (err) {
      console.error("SQL Execution Error: ", err);
      callback(err, null);
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error("Error closing connection: ", err);
        }
      }
    }
  },
  //Get maturity date
  getMaturityDate: async (com_date, term, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      // Updated query to properly call a function or procedure and handle parameters
      const result = await con.execute(
        `SELECT POLICY_MANAGEMENT.MATURITY_DATE(
          TO_DATE(:com_date, 'YYYYMMDD'),
          :term
        ) AS maturity_date FROM DUAL`,
        {
          com_date: com_date,
          term: term,
        }
      );

      console.log("SQL Result: ", result);

      const data = result.rows || [];
      callback(null, data);
    } catch (err) {
      console.error("SQL Execution Error: ", err);
      callback(err, null);
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error("Error closing connection: ", err);
        }
      }
    }
  },

  // get option name for plan:22,23
  getOption: async (table_id, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        `SELECT DISTINCT OPTION_N,
                DECODE(OPTION_N, 
                       'A', 'A: Pension, Maturity and Death Claim',
                       'B', 'B: Pension, Maturity and Death Claim (optional)')
                DESCRIPTION 
         FROM POLICY_MANAGEMENT.PLAN_22_23_RATE 
         WHERE TABLE_ID = :table_id 
         ORDER BY OPTION_N`,
        {
          table_id: { val: table_id }  // Proper binding
        }
      );

      const data = result.rows;
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
  },

  // insert into ipd rider
  insertPremInfo: async (premInfo) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      // Create a transaction to insert all records
      const insertPromises = premInfo.map(async (info) => {
        return con.execute(
          `INSERT INTO policy_management.IPD_PREM_INFO(
            REFNO, PLAN_NO, AGE, PREM_RATE, DOB, CURRENT_AGE, START_FROM, END_AT)
            VALUES(:REFNO, :PLAN_NO, :AGE, :PREM_RATE, 
                   TO_DATE(:DOB, 'MM/DD/YYYY'), :CURRENT_AGE, 
                   TO_DATE(:START_FROM, 'MM/DD/YYYY'), 
                   TO_DATE(:END_AT, 'MM/DD/YYYY'))`,
          {
            REFNO: info.REFNO,
            PLAN_NO: info.PLAN_NO,
            AGE: info.AGE,
            PREM_RATE: info.PREM_RATE,
            DOB: info.DOB, // Pass the date as a string (e.g., "5/17/1996")
            CURRENT_AGE: info.CURRENT_AGE,
            START_FROM: info.START_FROM, // e.g., "5/17/2024"
            END_AT: info.END_AT, // e.g., "5/17/2034"
          },
          { autoCommit: false } // Set autoCommit to false
        );
      });

      const results = await Promise.all(insertPromises);
      await con.commit(); // Explicitly commit the transaction
      return results; // Return the results
    } catch (err) {
      console.error('Error inserting premium info:', err);
      throw err; // Re-throw the error so it can be caught in the controller
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error('Error closing connection:', err);
        }
      }
    }
  },


  //Delete from ipd
  deletePremInfo: async (proposalNumber) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        `DELETE FROM policy_management.IPD_PREM_INFO WHERE REFNO = :PROPOSAL_N`,
        {
          PROPOSAL_N: proposalNumber,
        },
        { autoCommit: true }
      );

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  },

  updateProposalDummy: async (updateData, proposalNumber) => {
    let connection;

    try {
      connection = await oracledb.getConnection(config);

      // Decode the proposalNumber (in case it's URL encoded)
      const decodedProposalNumber = decodeURIComponent(proposalNumber);

      // Filter out empty/null fields from the updateData object
      const filteredData = Object.fromEntries(
        Object.entries(updateData).filter(
          ([key, value]) => value !== null && value !== undefined && value !== ''
        )
      );

      // Ensure date fields are in the correct format
      ['JDOB', 'START_FROM', 'END_AT', 'MATURITY'].forEach((dateField) => {
        if (filteredData[dateField]) {
          try {
            const date = new Date(filteredData[dateField]);
            if (isNaN(date.getTime())) throw new Error(`Invalid date: ${filteredData[dateField]}`);
            // Format to MM/DD/YYYY
            filteredData[dateField] = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
          } catch (e) {
            throw new Error(`Date formatting error for ${dateField}: ${e.message}`);
          }
        }
      });

      // Convert date fields to Oracle's TO_DATE format if necessary
      const setClause = Object.keys(filteredData)
        .map((key) => {
          if (['JDOB', 'START_FROM', 'END_AT', 'MATURITY'].includes(key)) {
            return `${key} = TO_DATE(:${key}, 'MM/DD/YYYY')`;
          } else {
            return `${key} = :${key}`;
          }
        })
        .join(', ');

      // If there's nothing to update, return early
      if (!setClause) {
        console.log('No fields to update.');
        return false;
      }

      // Use the dynamic proposalNumber
      const sql = `UPDATE POLICY_MANAGEMENT.PROPOSAL_DUMMY 
                   SET ${setClause} 
                   WHERE PROPOSAL_N = :proposal_number`;

      // Bind parameters for the query
      const binds = { ...filteredData, proposal_number: decodedProposalNumber };

      console.log('Executing SQL:', sql);  // Debugging statement
      console.log('With binds:', binds);  // Debugging statement

      // Execute the SQL statement
      const result = await connection.execute(sql, binds);
      console.log('Rows affected:', result.rowsAffected); // Log rows affected

      // If no rows were affected, log a message
      if (result.rowsAffected === 0) {
        console.log('No rows were updated. Check if PROPOSAL_N exists.');
      }

      // Commit the transaction
      await connection.commit();

      return true;

    } catch (err) {
      if (connection) {
        try {
          // Rollback the transaction if there is an error
          await connection.execute('ROLLBACK');
        } catch (rollbackErr) {
          console.error('Error during rollback:', rollbackErr);
        }
      }
      console.error('Error updating the table:', err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error closing the connection:', err);
        }
      }
    }
  },

  //Get previous sumassured
  getPreviousSumassured: async (policyNo, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });
      const result = await con.execute(
        `SELECT SUM_INSURE FROM POLICY_MANAGEMENT.PROPOSAL WHERE POLICY_NO=:policy_no`,
        {
          policy_no: policyNo,
        }
      );

      console.log("SQL Result: ", result);

      const data = result.rows || [];
      callback(null, data);
    } catch (err) {
      console.error("SQL Execution Error: ", err);
      callback(err, null);
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error("Error closing connection: ", err);
        }
      }
    }
  },

  //4th page update Medical Info 
  updateMedicalInfo: async (updateData, proposalNumber) => {
    let connection;

    try {
      connection = await oracledb.getConnection(config);

      // Decode the proposalNumber (in case it's URL encoded)
      const decodedProposalNumber = decodeURIComponent(proposalNumber);

      // Filter out empty/null fields from the updateData object
      const filteredData = Object.fromEntries(
        Object.entries(updateData).filter(
          ([key, value]) => value !== null && value !== undefined && value !== ''
        )
      );

      // Ensure date fields are in the correct format
      ['LAST_DELIVERY_DT', 'EXP_DELIVERY_DT', 'INDATE', 'LAST_MENSTRUAL_DT', 'EXP_DELIVERY_DT', 'UNW_RESULT_DT'].forEach((dateField) => {
        if (filteredData[dateField]) {
          try {
            const date = new Date(filteredData[dateField]);
            if (isNaN(date.getTime())) throw new Error(`Invalid date: ${filteredData[dateField]}`);
            // Format to MM/DD/YYYY
            filteredData[dateField] = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
          } catch (e) {
            throw new Error(`Date formatting error for ${dateField}: ${e.message}`);
          }
        }
      });

      // Convert date fields to Oracle's TO_DATE format if necessary
      const setClause = Object.keys(filteredData)
        .map((key) => {
          if (['LAST_DELIVERY_DT', 'EXP_DELIVERY_DT', 'INDATE', 'LAST_MENSTRUAL_DT', 'EXP_DELIVERY_DT', 'UNW_RESULT_DT'].includes(key)) {
            return `${key} = TO_DATE(:${key}, 'MM/DD/YYYY')`;
          } else {
            return `${key} = :${key}`;
          }
        })
        .join(', ');

      // If there's nothing to update, return early
      if (!setClause) {
        console.log('No fields to update.');
        return false;
      }

      // Use the dynamic proposalNumber
      const sql = `UPDATE POLICY_MANAGEMENT.PROPOSAL_DUMMY_EXTEND SET ${setClause} WHERE PROPOSAL_N = :proposal_number`;

      // Bind parameters for the query
      const binds = { ...filteredData, proposal_number: decodedProposalNumber };

      console.log('Executing SQL:', sql);  // Debugging statement
      console.log('With binds:', binds);  // Debugging statement

      // Execute the SQL statement
      const result = await connection.execute(sql, binds);
      console.log('Rows affected:', result.rowsAffected); // Log rows affected

      // If no rows were affected, log a message
      if (result.rowsAffected === 0) {
        console.log('No rows were updated. Check if PROPOSAL_N exists.');
      }

      // Commit the transaction
      await connection.commit();

      return true;

    } catch (err) {
      if (connection) {
        try {
          // Rollback the transaction if there is an error
          await connection.execute('ROLLBACK');
        } catch (rollbackErr) {
          console.error('Error during rollback:', rollbackErr);
        }
      }
      console.error('Error updating the table:', err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error closing the connection:', err);
        }
      }
    }
  },
  updatePreviousPolicyNo: async (updateData, proposalNumber) => {
    let connection;

    try {
      connection = await oracledb.getConnection(config);

      // Decode the proposalNumber (in case it's URL encoded)
      const decodedProposalNumber = decodeURIComponent(proposalNumber);

      // Filter out empty/null fields from the updateData object
      const filteredData = Object.fromEntries(
        Object.entries(updateData).filter(
          ([key, value]) => value !== null && value !== undefined && value !== ''
        )
      );

      // Ensure date fields are in the correct format
      ['LAST_DELIVERY_DT', 'EXP_DELIVERY_DT', 'INDATE', 'LAST_MENSTRUAL_DT', 'EXP_DELIVERY_DT', 'UNW_RESULT_DT'].forEach((dateField) => {
        if (filteredData[dateField]) {
          try {
            const date = new Date(filteredData[dateField]);
            if (isNaN(date.getTime())) throw new Error(`Invalid date: ${filteredData[dateField]}`);
            // Format to MM/DD/YYYY
            filteredData[dateField] = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
          } catch (e) {
            throw new Error(`Date formatting error for ${dateField}: ${e.message}`);
          }
        }
      });

      // Convert date fields to Oracle's TO_DATE format if necessary
      const setClause = Object.keys(filteredData)
        .map((key) => {
          if (['LAST_DELIVERY_DT', 'EXP_DELIVERY_DT', 'INDATE', 'LAST_MENSTRUAL_DT', 'EXP_DELIVERY_DT', 'UNW_RESULT_DT'].includes(key)) {
            return `${key} = TO_DATE(:${key}, 'MM/DD/YYYY')`;
          } else {
            return `${key} = :${key}`;
          }
        })
        .join(', ');

      // If there's nothing to update, return early
      if (!setClause) {
        console.log('No fields to update.');
        return false;
      }

      // Use the dynamic proposalNumber
      const sql = `UPDATE POLICY_MANAGEMENT.PROPOSAL_DUMMY SET ${setClause} WHERE PROPOSAL_N = :proposal_number`;

      // Bind parameters for the query
      const binds = { ...filteredData, proposal_number: decodedProposalNumber };

      console.log('Executing SQL:', sql);  // Debugging statement
      console.log('With binds:', binds);  // Debugging statement

      // Execute the SQL statement
      const result = await connection.execute(sql, binds);
      console.log('Rows affected:', result.rowsAffected); // Log rows affected

      // If no rows were affected, log a message
      if (result.rowsAffected === 0) {
        console.log('No rows were updated. Check if PROPOSAL_N exists.');
      }

      // Commit the transaction
      await connection.commit();

      return true;

    } catch (err) {
      if (connection) {
        try {
          // Rollback the transaction if there is an error
          await connection.execute('ROLLBACK');
        } catch (rollbackErr) {
          console.error('Error during rollback:', rollbackErr);
        }
      }
      console.error('Error updating the table:', err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error closing the connection:', err);
        }
      }
    }
  },
  insertNominees: async (proposals) => {
    let con;

    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });
      const results = [];

      for (const proposal of proposals) {
        const {
          PROPOSAL_N,
          NAME,
          AGE,
          DOB,
          RELATION,
          PERCENTAGE,
          ID_TYPE,
          NN_ID_NUMBER,
          N_MOBILE_NO,
          ACC_NO,
          ROUTINGNO,
          GUARDIAN,
          GAGE,
          GRELATION,
          GACCNO,
          GROUTINGNO,
        } = proposal;

        // Log PERCENTAGE for debugging
        console.log('PERCENTAGE from frontend (as string):', PERCENTAGE);

        // Convert DOB from YYYYMMDD to MM/DD/YYYY
        const formattedDOB = DOB
          ? `${DOB.substring(4, 6)}/${DOB.substring(6, 8)}/${DOB.substring(0, 4)}`
          : null;

        // Query to get total percentage for the given PROPOSAL_N
        const percentageQuery = await con.execute(
          `SELECT SUM(TO_NUMBER(PERCENTAGE)) AS TOTAL_PERCENTAGE
           FROM POLICY_MANAGEMENT.NOMINEE
           WHERE PROPOSAL_N = :PROPOSAL_N`,
          { PROPOSAL_N }
        );

        // Get the total percentage from the result, default to 0 if null
        const totalPercentage = percentageQuery.rows[0][0] || 0;

        // Log total percentage for debugging
        console.log('Total percentage in DB:', totalPercentage);

        // Convert both totalPercentage and PERCENTAGE to numbers for calculations
        const numericTotalPercentage = Number(totalPercentage);
        const numericPercentage = parseFloat(PERCENTAGE); // Convert string to number

        console.log('Sum of total and given percentage:', numericTotalPercentage + numericPercentage);

        // Prevent insert if total percentage is already 100% or more
        if (numericTotalPercentage + numericPercentage > 100) {
          throw new Error(`Percentage is already 100% for proposal ${PROPOSAL_N}.`);
        }

        // Insert the nominee, storing PERCENTAGE as varchar
        const result = await con.execute(
          `INSERT INTO POLICY_MANAGEMENT.NOMINEE(
            PROPOSAL_N, NAME, AGE, DOB, RELATION, PERCENTAGE, ID_TYPE, NN_ID_NUMBER,
            N_MOBILE_NO, ACC_NO, ROUTINGNO, GUARDIAN, GAGE, GRELATION, GACCNO, GROUTINGNO
          ) 
          VALUES(
            :PROPOSAL_N, :NAME, :AGE, TO_DATE(:DOB, 'MM/DD/YYYY'), :RELATION, :PERCENTAGE,
            :ID_TYPE, :NN_ID_NUMBER, :N_MOBILE_NO, :ACC_NO, :ROUTINGNO, :GUARDIAN, 
            :GAGE, :GRELATION, :GACCNO, :GROUTINGNO
          )`,
          {
            PROPOSAL_N,
            NAME,
            AGE,
            DOB: formattedDOB,
            RELATION,
            PERCENTAGE: PERCENTAGE, // Save the original string value for PERCENTAGE
            ID_TYPE,
            NN_ID_NUMBER,
            N_MOBILE_NO,
            ACC_NO,
            ROUTINGNO,
            GUARDIAN,
            GAGE,
            GRELATION,
            GACCNO,
            GROUTINGNO,
          },
          { autoCommit: true }
        );

        results.push(result.outBinds);
      }

      return results;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  },


  //update nominee
  updateNominee: async (updateData, slno) => {
    let connection;
    try {
      connection = await oracledb.getConnection(config);

      // Decode the proposalNumber (in case it's URL encoded)
      const decodedProposalNumber = decodeURIComponent(slno);

      // Filter out empty/null fields from the updateData object
      const filteredData = Object.fromEntries(
        Object.entries(updateData).filter(
          ([key, value]) => value !== null && value !== undefined && value !== ''
        )
      );

      // Ensure date fields are in the correct format
      ['DOB',].forEach((dateField) => {
        if (filteredData[dateField]) {
          try {
            const date = new Date(filteredData[dateField]);
            if (isNaN(date.getTime())) throw new Error(`Invalid date: ${filteredData[dateField]}`);
            // Format to MM/DD/YYYY
            filteredData[dateField] = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
          } catch (e) {
            throw new Error(`Date formatting error for ${dateField}: ${e.message}`);
          }
        }
      });

      // Convert date fields to Oracle's TO_DATE format if necessary
      const setClause = Object.keys(filteredData)
        .map((key) => {
          if (['DOB'].includes(key)) {
            return `${key} = TO_DATE(:${key}, 'MM/DD/YYYY')`;
          } else {
            return `${key} = :${key}`;
          }
        })
        .join(', ');

      // If there's nothing to update, return early
      if (!setClause) {
        console.log('No fields to update.');
        return false;
      }

      // Use the dynamic proposalNumber
      const sql = `UPDATE POLICY_MANAGEMENT.NOMINEE SET ${setClause} WHERE SLNO = :slno`;

      // Bind parameters for the query
      const binds = { ...filteredData, slno: decodedProposalNumber };

      console.log('Executing SQL:', sql);  // Debugging statement
      console.log('With binds:', binds);  // Debugging statement

      // Execute the SQL statement
      const result = await connection.execute(sql, binds);
      console.log('Rows affected:', result.rowsAffected); // Log rows affected

      // If no rows were affected, log a message
      if (result.rowsAffected === 0) {
        console.log('No rows were updated. Check if SLNO exists.');
      }

      // Commit the transaction
      await connection.commit();

      return true;

    } catch (err) {
      if (connection) {
        try {
          // Rollback the transaction if there is an error
          await connection.execute('ROLLBACK');
        } catch (rollbackErr) {
          console.error('Error during rollback:', rollbackErr);
        }
      }
      console.error('Error updating the table:', err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error('Error closing the connection:', err);
        }
      }
    }
  },
  getNomineesByProposal: async (proposalNumber) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        `SELECT PROPOSAL_N, NAME, AGE, DOB, RELATION, PERCENTAGE, ID_TYPE, 
                NN_ID_NUMBER, N_MOBILE_NO, ACC_NO, ROUTINGNO, 
                GUARDIAN, GAGE, GRELATION, GACCNO, GROUTINGNO,SLNO
         FROM POLICY_MANAGEMENT.NOMINEE
         WHERE PROPOSAL_N = :proposalNumber`,
        { proposalNumber }
      );
      // Map the rows to key-value pairs
      const mappedResult = result.rows.map((row) => {
        return result.metaData.reduce((obj, col, index) => {
          obj[col.name.toLowerCase()] = row[index];
          return obj;
        }, {});
      });

      return mappedResult;
    } catch (err) {
      console.error(err);
      throw err;
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
module.exports = proposal;
