from db_conn import conn
from flask import request, Blueprint
import json

language_routes = Blueprint('language_routes', __name__)


@language_routes.route('/lang', methods=['POST'])
def lang():
    if request.method == 'POST':
        data = json.loads(request.data.decode("utf-8"))
        if data["name"] is None:
            return {"error": "no language name provided"}, 400
        cursor = conn.cursor()
        cursor.execute("INSERT INTO languages(name) VALUES (%s) RETURNING id;",
                       (data["name"], ))

        id_data = cursor.fetchone()
        conn.commit()
        if (id_data is None) or (len(id_data) < 1):
            return {"error": "error creating, try again"}, 400
        else:
            return {"id": id_data[0]}, 201
        
@language_routes.route('/langs', methods=['GET'])
def langs():
    if request.method == 'GET':
        cursor = conn.cursor()
        cursor.execute("SELECT distinct * FROM languages;")

        data = cursor.fetchall()
        conn.commit()
        if (data is None) or (len(data) < 1):
            return {"error": "error fetching from database, try again"}, 400
        else:
            return {"langs": data},200
        

