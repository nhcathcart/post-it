import pg from "pg"
import dotenv from "dotenv"

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_URI,
});

pool.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });

export default pool