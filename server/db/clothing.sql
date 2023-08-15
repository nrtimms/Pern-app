CREATE DATABASE outfit-maker;

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);

CREATE TABLE clothing(
  clothing_id SERIAL NOT NULL PRIMARY KEY,
  user_emial VARCHAR(255),
  photo TEXT NOT NULL,
  title VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL,
  color VARCHAR(50),
--   material VARCHAR(50),
--   size VARCHAR(50),
--   brand VARCHAR(50),
--   condition VARCHAR(50),
--   date_added DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
--   link TEXT,
  favorite BOOLEAN
);

CREATE TABLE outfits(
  outfits_id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  top TEXT NOT NULL,
  bottom TEXT NOT NULL,
  shoes TEXT NOT NULL,
--  date_added DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  favorite BOOLEAN
);