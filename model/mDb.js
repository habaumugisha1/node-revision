import { Pool } from 'pg';
import dbConfig from './dbConfig.js'

export const pool = new Pool(dbConfig);
pool.on('connect', () => {
    console.log('db connected successful!,AMI')
});

export const createTables = () => {
  const tables = ` CREATE TABLE IF NOT EXISTS users(
  id serial PRIMARY KEY,
  firstName VARCHAR (50) NOT NULL,
  lastName VARCHAR (50) NOT NULL,
  email VARCHAR (100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  isAdmin BOOLEAN NOT NULL DEFAULT false,
  userRole VARCHAR (10) NOT NULL DEFAULT 'user',
  createdOn TIMESTAMP NOT NULL
  );`;
  pool.query(tables)
      .then((res) => {
          console.log('users', res);
          pool.end()
      }).catch((err) =>{
          console.log(err);
          pool.end();
      });
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});
// require('make-runnable');
