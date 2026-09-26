import { XMLParser } from "fast-xml-parser";
const parser = new XMLParser();

export interface ParsedBooking {
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  seatsAvailable: number;
  fullName: string;
  passportNumber: string;
  fareAmount: number;
}

export function parseBookingXml(xml: string): ParsedBooking {
  const cleanXml = xml.replace(/^\uFEFF/, "");
  const parsed = parser.parse(cleanXml);
  const req = parsed.BookingRequest;

  if (!req?.Flight || !req?.Passenger || !req?.Fare) {
    throw new Error("Invalid XML: missing required sections");
  }

  return {
    flightNumber: req.Flight.FlightNumber,
    origin: req.Flight.Origin,
    destination: req.Flight.Destination,
    departureTime: req.Flight.DepartureTime,
    seatsAvailable: Number(req.Flight.SeatsAvailable),
    fullName: req.Passenger.FullName,
    passportNumber: req.Passenger.PassportNumber,
    fareAmount: Number(req.Fare.Amount),
  };
}
