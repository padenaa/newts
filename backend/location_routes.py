from db_conn import conn
from flask import request, Blueprint
import json
from deep_translator import GoogleTranslator
from infobip_channels.sms.channel import SMSChannel
from dotenv import load_dotenv
import os

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
