import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

conn = psycopg2.connect(
    database="newts",
    host="127.0.0.1",
    user="postgres",
    password=os.getenv("POSTGRES_PASSWORD"),
    port="5332",
)
