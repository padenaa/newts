from db_conn import conn
import psycopg2
from psycopg2.errorcodes import UNIQUE_VIOLATION
from flask import request, Blueprint
import bcrypt
import json

user_routes = Blueprint('user_routes', __name__)


@user_routes.route('/login', methods=['POST'])
def login():
    data = json.loads(request.data.decode("utf-8"))
    if (data["username"] is None) or (data["password"] is None):
        return {"error": "login info incomplete"}, 400

    get_user = conn.cursor()
    get_user.execute("SELECT salt FROM users WHERE username = %s;",
                     (data["username"], ))

    salt_data = get_user.fetchone()
    if (salt_data is None) or (len(salt_data) < 1):
        return {"error": "username does not exist"}, 400

    hashed = bcrypt.hashpw(data["password"].encode('utf-8'),
                           salt_data[0].encode('utf-8'))

    cursor = conn.cursor()
    cursor.execute(
        "SELECT id FROM users WHERE username = %s AND password = %s", (
            data["username"],
            hashed.decode('utf-8'),
        ))

    id_data = cursor.fetchone()
    if (id_data is None) or (len(id_data) < 1):
        return {"error": "invalid password"}, 400
    return {"id": id_data[0]}, 200


@user_routes.route('/register', methods=['POST'])
def register():
    data = json.loads(request.data.decode("utf-8"))
    if (data["username"] is None) or (data["password"]
                                      is None) or (data["language"] is None):
        return {"error": "register info incomplete"}, 400

    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(data["password"].encode('utf-8'), salt)

    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO users(username, password, language_id, salt) VALUES (%s, %s, %s, %s) RETURNING id;",
            (
                data["username"],
                hashed.decode('utf-8'),
                data["language"],
                salt.decode('utf-8'),
            ))
    except psycopg2.errors.lookup(UNIQUE_VIOLATION) as e:
        return {"error": "username already exists"}, 400

    id_data = cursor.fetchone()
    conn.commit()
    if (id_data is None) or (len(id_data) < 1):
        return {"error": "error creating, try again"}, 400
    else:
        return {"id": id_data[0]}, 201
