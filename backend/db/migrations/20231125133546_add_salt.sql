-- migrate:up
ALTER TABLE users
ADD COLUMN IF NOT EXISTS salt TEXT NOT NULL;

-- migrate:down
ALTER TABLE users
DROP COLUMN IF EXISTS salt;
