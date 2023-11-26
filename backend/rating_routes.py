from db_conn import conn
from flask import request, Blueprint
import json

rating_routes = Blueprint('rating_routes', __name__)


@rating_routes.route('/rating', methods=['POST'])
def ratings():
    if request.method == 'POST':
        data = json.loads(request.data.decode("utf-8"))
        if (data["userId"] is None) or (data["rating"]
                                        is None) or (data["locationId"]
                                                     is None):
            return {"error": "insufficient data provided"}, 400
        cursor = conn.cursor()
        cursor.execute("SELECT language_id FROM users WHERE id = %s;",
                       (data["userId"], ))
        lang_data = cursor.fetchone()
        if (lang_data is None) or (len(lang_data) < 1):
            return {"error": "user has no language"}, 400
        lang_id = lang_data[0]

        cursor.execute("SELECT id FROM ratings WHERE location_id = %s;",
                       (data["locationId"], ))
        ratings_data = cursor.fetchall()
        if (ratings_data is None) or (len(ratings_data) < 1):
            cursor.execute(
                "INSERT INTO location_languages(language_id, location_id) VALUES (%s, %s);",
                (lang_id, data["locationId"]))

        cursor.execute(
            "INSERT INTO ratings(user_id, language_id, rating, location_id) VALUES (%s, %s, %s, %s) RETURNING id;",
            (data["userId"], lang_id, data["rating"], data["locationId"]))

        id_data = cursor.fetchone()
        conn.commit()
        if (id_data is None) or (len(id_data) < 1):
            return {"error": "error creating, try again"}, 400
        else:
            return {"id": id_data[0]}, 201


@rating_routes.route('/avg_rating', methods=['GET'])
def avg_rating():
    if request.method == 'GET':
        args = request.args
        location_id = args.get("locationId", type=int)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT AVG(r.rating) FROM locations l LEFT JOIN ratings r on l.id = r.location_id WHERE l.id = %s GROUP BY l.id;",
            (location_id, ))
        rating_data = cursor.fetchone()
        if (rating_data is None) or (len(rating_data) < 1):
            return {"error": "rating not available, try again later"}, 400
        return {"avg_rating": round(rating_data[0], 2)}, 200
