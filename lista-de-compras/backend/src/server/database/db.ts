import { Pool } from "pg";

const pool: Pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "api",
  password: "postgres",
  port: 5432,
});

export default pool;
