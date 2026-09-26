import { Router } from "express";
import multer from "multer";
import { pool } from "../db/pool.js";
import { parseBookingXml } from "../services/xmlService.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/import/booking", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const xmlString = req.file.buffer.toString("utf-8");
    const data = parseBookingXml(xmlString);

    // Insert flight (or find existing one)
    const flightResult = await pool.query(
      `INSERT INTO flights (flight_number, origin, destination, departure_time, seats_available)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [
        data.flightNumber,
        data.origin,
        data.destination,
        data.departureTime,
        data.seatsAvailable,
      ],
    );
    const flightId = flightResult.rows[0].id;

    // Insert passenger
    const passengerResult = await pool.query(
      `INSERT INTO passengers (full_name, passport_number) VALUES ($1, $2) RETURNING id`,
      [data.fullName, data.passportNumber],
    );
    const passengerId = passengerResult.rows[0].id;

    // Insert booking
    const bookingResult = await pool.query(
      `INSERT INTO bookings (flight_id, passenger_id, fare_amount) VALUES ($1, $2, $3) RETURNING *`,
      [flightId, passengerId, data.fareAmount],
    );

    res.status(201).json(bookingResult.rows[0]);
  } catch (err: any) {
    res
      .status(400)
      .json({ error: "Failed to process XML", details: err.message });
  }
});

export default router;
