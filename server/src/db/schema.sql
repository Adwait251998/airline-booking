CREATE TABLE flights (
  id SERIAL PRIMARY KEY,
  flight_number VARCHAR(10) NOT NULL,
  origin VARCHAR(3) NOT NULL,
  destination VARCHAR(3) NOT NULL,
  departure_time TIMESTAMP NOT NULL,
  seats_available INT NOT NULL
);

CREATE TABLE passengers (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  passport_number VARCHAR(20)
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  flight_id INT REFERENCES flights(id),
  passenger_id INT REFERENCES passengers(id),
  fare_amount NUMERIC(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT NOW()
);