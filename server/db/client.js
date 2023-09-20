// Require Client from pg
const { Client } = require("pg");

//Establishing connect to database (like how we do with http://)
const database = "study-app";
const client = new Client(`postgres://localhost:5432/${database}`);
client.connect();

//Export for use in other files
module.exports = client;
