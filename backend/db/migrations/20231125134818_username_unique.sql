-- migrate:up
ALTER TABLE users
ADD CONSTRAINT username_unique
UNIQUE(username);

-- migrate:down
ALTER TABLE users
DROP CONSTRAINT username_unique;
