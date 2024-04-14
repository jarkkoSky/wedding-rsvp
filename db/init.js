const { query } = require('./index');

const dbInitialized = async () => {
  const res = await query(`SELECT EXISTS (
        SELECT FROM 
            pg_tables
        WHERE 
            tablename  = 'guest'
        );`);

  return res.rows[0].exists;
};

const initDatabase = async () => {
  const isDbInitialized = await dbInitialized();

  if (isDbInitialized === false) {
    await query(`CREATE TABLE GUEST (
      id serial PRIMARY KEY,
      session_id VARCHAR(500),
      name VARCHAR(500) NOT NULL,
      diet TEXT,
      other_information TEXT,
      attending BOOL,
      create_date TIMESTAMP NOT NULL DEFAULT NOW()
    )`);
  } else {
    console.log('DB Status ok!');
  }
};

const checkDatabaseStatus = async () => {
  console.log('Check database status');
  await initDatabase();
};

module.exports = {
  checkDatabaseStatus,
};
