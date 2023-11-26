from db_conn import conn
from flask import request, Blueprint
import json
from deep_translator import GoogleTranslator
from infobip_channels.sms.channel import SMSChannel
from dotenv import load_dotenv
import os
import requests

location_routes = Blueprint('location_routes', __name__)
load_dotenv()

BASE_URL = os.getenv("INFOBIP_BASE_URL")
API_KEY = os.getenv("INFOBIP_API_KEY")
RECIPIENT = os.getenv("RECIPIENT")


@location_routes.route('/contact', methods=['POST'])
def contact():
    if request.method == 'POST':
        data = json.loads(request.data.decode('utf-8'))
        if (data["message"] is None) or (data["locationId"] is None) or (
                data["userId"] is None) or (data["phoneNumber"] is None):
            return {"error": "insufficient message information"}, 400
        cursor = conn.cursor()
        cursor.execute(
            """SELECT name FROM languages l LEFT JOIN users u ON u.language_id = l.id WHERE u.id = %s;""",
            (data["userId"], ))
        lang_data = cursor.fetchone()
        if (lang_data is None) or (len(lang_data) < 1):
            return {"error": "user does not have language"}, 400
        lang_name = lang_data[0]

        translated = GoogleTranslator(
            source=lang_name, target='en').translate(text=data["message"])

        channel = SMSChannel.from_auth_params({
            "base_url": BASE_URL,
            "api_key": API_KEY,
        })

        sms_response = channel.send_sms_message({
            "messages": [{
                "destinations": [{
                    "to": RECIPIENT
                }],
                "text":
                f"""Hi there! A Newts user asked for more information about your services.
They would like to use {lang_name} to communicate.
You can contact them at {data["phoneNumber"]}.
The following is their message.
Translated message: {translated}
Original message: {data["message"]}
                """,
                "from": os.getenv("SENDER"),
            }]
        })

        query_parameters = {"limit": 10}
        delivery_reports = channel.get_outbound_sms_delivery_reports(
            query_parameters)
        print(delivery_reports)
        return {"message": "success"}, 200


@location_routes.route('/markers', methods=['POST'])
def markers():
    data = json.loads(request.data.decode('utf-8'))
    if (data["search"] is None) or (data["userId"] is None) or (
            data["latitude"] is None) or (data["longitude"] is None):
        return {"error": "insufficient search information"}, 400

    loc_insert = conn.cursor()
    loc_insert.execute("SELECT language_id FROM users WHERE id = %s;",
                       (data["userId"], ))
    user_data = loc_insert.fetchone()
    if (user_data is None) or (len(user_data) < 1):
        return {"error": "user does not exist"}, 400
    lang_id = user_data[0]

    headers = {
        'Accept': 'application/json',
        'Authorization': f"Bearer {os.getenv('YELP_API_KEY')}"
    }
    res = requests.get(
        f"https://api.yelp.com/v3/businesses/search?sort_by=best_match&limit=5&latitude={data['latitude']}&longitude={data['longitude']}&term={data['search']}",
        headers=headers,
    )
    res_json = res.json()
    print(res_json)
    all_map_ids = [row["id"] for row in res_json["businesses"]]
    loc_insert.execute("SELECT map_id FROM locations WHERE map_id IN %s;",
                       (tuple(all_map_ids), ))
    mapped_rows = loc_insert.fetchall()
    already_mapped = []
    if mapped_rows:
        already_mapped = [row[0] for row in loc_insert.fetchall()]
    map_ids_to_add = list(set(all_map_ids) - set(already_mapped))
    rows_to_add = [
        row for row in res_json["businesses"] if row["id"] in map_ids_to_add
    ]
    for row in rows_to_add:
        loc_insert.execute(
            "INSERT INTO locations(name, latitude, longitude, map_id) VALUES (%s, %s, %s, %s);",
            (row["name"], row["coordinates"]["latitude"],
             row["coordinates"]["longitude"], row["id"]))
    known_languages = {}
    rating_avgs = {}
    for id in already_mapped:
        loc_insert.execute(
            "SELECT l.name FROM languages l, location_languages o, locations n WHERE o.language_id = l.id AND n.id = o.location_id AND l.map_id = %s;",
            (id, ))
        language_rows = loc_insert.fetchall()
        if language_rows:
            known_languages[id] = [row[0] for row in language_rows]

        loc_insert.execute(
            "SELECT AVG(r.rating) FROM locations l LEFT JOIN ratings r on l.id = r.location_id WHERE r.language_id = %s GROUP BY l.id;",
            (lang_id, ))
        rating_rows = loc_insert.fetchall()
        if rating_rows:
            rating_avgs[id] = [row[0] for row in rating_rows]

    loc_insert.execute(
        "SELECT id, name, latitude, longitude, map_id FROM locations WHERE map_id in %s",
        (tuple(all_map_ids), ))
    all_locations = loc_insert.fetchall()
    if not all_locations:
        return {"error", "could not load locations, please try again"}

    conn.commit()
    return {
        "markers": [{
            "id":
            row[0],
            "coord": [row[2], row[3]],
            "rating":
            rating_avgs[row[4]] if row[4] in rating_avgs else 0,
            "name":
            row[1],
            "langs":
            known_languages[row[4]] if row[4] in known_languages else []
        } for row in all_locations]
    }, 200
