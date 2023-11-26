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

Next, install [dbmate](https://github.com/amacneil/dbmate).
To create new migrations, run
```sh
dbmate new insert_migration_name
```
and update the file created in /backend/db/migrations.
Once finished updating this file, run
```sh
dbmate up
```
to apply the migrations.

## Starting the backend

To start the backend, you must have Python 3.9 installed.
Start a virtual environment if desired:
```sh
python -m venv env
./env/Scripts/activate
```
and install all dependencies to start the project:
```sh
pip install -r requirements.txt
python app.py
```
and you should have the backend running!

## Starting the frontend

To start the frontend, you must have Node installed.
Navigate to the frontend fold and install all dependencies:
```sh
npm run install
```
and start up the frontend on localhost:
```sh
npm run dev
```

