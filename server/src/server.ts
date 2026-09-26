import { pool } from "./db/pool.js";

import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  const result = await pool.query("SELECT NOW()");
  console.log("DB connected:", result.rows[0]);
});
