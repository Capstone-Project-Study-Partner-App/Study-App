// Require Client from pg
const { Client } = require("pg");

//Establishing connect to database (like how we do with http://)
const client = new Client(
  `postgres://binderbuddies_db_user:bYqjrV6QHSgJxJmvqOwnVKbrdn286pvw@dpg-clpkbmhoh6hc73c5lkfg-a/binderbuddies_db`

  // `postgres://localhost:5432/study-app`
  // `postgres://study_app_user:IIp71YfoxgIQZBNHOLAxgERTkWy3NeVX@dpg-cknrlmj1a5fs73b54sa0-a/study_app`
);
client.connect();

//Export for use in other files
module.exports = client;



// process.env.POSTGRES_DB_URL || 