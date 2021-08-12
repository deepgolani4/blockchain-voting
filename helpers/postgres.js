const { Client } = require("pg");

const client = new Client({
  host: "127.0.0.1",
  port: "5432",
  database: "voting",
});

const run = async () => {
  await client.connect();
  const res = await client.query("SELECT * FROM VOTED");
  console.log(res.rows);
  await client.end();
};

module.exports = client;
