export interface Flight {
  id?: number;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: Date;
  seatsAvailable: number;
}

export interface Booking {
  id?: number;
  flightId: number;
  passengerId: number;
  fareAmount: number;
  status: "confirmed" | "cancelled" | "pending";
}
