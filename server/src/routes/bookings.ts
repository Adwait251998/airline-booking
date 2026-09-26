import { Router } from "express";
import { pool } from "../db/pool.js";

const router = Router();

router.get("/bookings", async (req, res) => {
  const result = await pool.query(`
    SELECT b.id, b.fare_amount, b.status, f.flight_number, p.full_name
    FROM bookings b
    JOIN flights f ON b.flight_id = f.id
    JOIN passengers p ON b.passenger_id = p.id
  `);
  res.json(result.rows);
});

router.post("/bookings", async (req, res) => {
  const { flightId, passengerId, fareAmount } = req.body;
  const result = await pool.query(
    `INSERT INTO bookings (flight_id, passenger_id, fare_amount) VALUES ($1, $2, $3) RETURNING *`,
    [flightId, passengerId, fareAmount],
  );
  res.status(201).json(result.rows[0]);
});

export default router;
