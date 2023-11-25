# Newts

> Helping newcomers find services perfect for them!

## Getting the DB setup

Before starting the database, clone the .env.sample file in /backend and replace `POSTGRES_PASSWORD` with your choice of password.
You also must have [Docker](https://www.docker.com/) running on your device.
To get the database setup, run the following commands:
```sh
cd backend
docker-compose up -d
```
The database should now be running at localhost:5332, based on how this is configured for your machine.
