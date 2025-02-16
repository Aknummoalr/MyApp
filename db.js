require('dotenv').config();
const { Client } = require('pg')

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT,
});
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = client;