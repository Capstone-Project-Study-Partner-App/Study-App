// Require Client from pg
const { Client } = require("pg");

//Establishing connect to database (like how we do with http://)
const client = new Client(
  process.env.POSTGRES_DB_URL || 
  `postgres://localhost:5432/study-app`
);
client.connect();

//Export for use in other files
module.exports = client;
