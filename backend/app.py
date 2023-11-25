from flask import Flask
from dotenv import load_dotenv
import psycopg2
import os

load_dotenv()

app = Flask(__name__)
conn = psycopg2.connect(
    database="newts",
    host="127.0.0.1",
    user="postgres",
    password=os.getenv("POSTGRES_PASSWORD"),
    port="5332",
)


@app.route("/test")
def test_app():
    return {"message": "this app works"}


if __name__ == "__main__":
    app.run("127.0.0.1", 5000)
