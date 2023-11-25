-- migrate:up
CREATE TABLE IF NOT EXISTS languages (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	username TEXT NOT NULL,
	password TEXT NOT NULL,
	language_id INT NOT NULL,
	CONSTRAINT fk_language_id
		FOREIGN KEY(language_id) REFERENCES languages(id)
);

CREATE TABLE IF NOT EXISTS locations (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name TEXT NOT NULL,
	latitude DECIMAL NOT NULL,
	longitude DECIMAL NOT NULL,
	map_id INT
);

CREATE TABLE IF NOT EXISTS location_languages (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	language_id INT NOT NULL,
	location_id INT NOT NULL,
	CONSTRAINT fk_language_id
		FOREIGN KEY(language_id) REFERENCES languages(id),
	CONSTRAINT fk_location_id
		FOREIGN KEY(location_id) REFERENCES locations(id)
);

CREATE TABLE IF NOT EXISTS ratings (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	user_id INT NOT NULL,
	language_id INT NOT NULL,
	rating INT NOT NULL,
	location_id INT NOT NULL,
	CONSTRAINT fk_user_id
		FOREIGN KEY(user_id) REFERENCES users(id),
	CONSTRAINT fk_language_id
		FOREIGN KEY(language_id) REFERENCES languages(id),
	CONSTRAINT fk_location_id
		FOREIGN KEY(location_id) REFERENCES locations(id)
);

-- migrate:down
DROP TABLE IF EXISTS languages;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS location_languages;
DROP TABLE IF EXISTS ratings;
