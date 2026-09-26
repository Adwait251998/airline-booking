import { Router } from "express";
import { pool } from "../db/pool.js";

const router = Router();

router.get("/passengers", async (req, res) => {
  const result = await pool.query("SELECT * FROM passengers");
  res.json(result.rows);
});

router.post("/passengers", async (req, res) => {
  const { fullName, passportNumber } = req.body;
  const result = await pool.query(
    `INSERT INTO passengers (full_name, passport_number) VALUES ($1, $2) RETURNING *`,
    [fullName, passportNumber],
  );
  res.status(201).json(result.rows[0]);
});

export default router;
