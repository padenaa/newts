-- migrate:up
ALTER TABLE locations
ALTER COLUMN map_id TYPE TEXT;

-- migrate:down
ALTER TABLE locations
ALTER COLUMN map_id TYPE INT;
