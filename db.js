const { Pool } = require("pg")

const pool = new Pool({
  user: "iamburakgul",
  host: "localhost",
  database: "postgres",
  password: "1234",
  port: 5432
})

module.exports = pool
