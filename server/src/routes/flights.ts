import { Router } from "express";
import { pool } from "../db/pool.js";
import type { Flight } from "../models/types.js";

const router = Router();

router.get("/flights", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM flights");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Falied to fetch flight data" });
  }
});
router.post("/flights", async (req, res) => {
  const {
    flightNumber,
    origin,
    destination,
    departureTime,
    seatsAvailable,
  }: Flight = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO flights (flight_number, origin, destination, departure_time, seats_available) VALUES($1,$2,$3,$4,$5) RETURNING *`,
      [flightNumber, origin, destination, departureTime, seatsAvailable],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create flight data" });
  }
});
export default router;
