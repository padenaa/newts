import pytest
import json
from app import app
import random


def test_ratings_route():
    lang_response = app.test_client().post(
        '/lang',
        data=json.dumps({
            "name": "Spanish",
        }),
        headers={"Content-Type": "application/json"})

    assert lang_response.status_code == 201
    lang_id = json.loads(lang_response.data.decode('utf-8')).get('id')
    assert lang_id is not None

    user_response = app.test_client().post(
        '/register',
        data=json.dumps({
            "username": "test" + str(random.randint(0, 1000000000)),
            "password": "test",
            "language": lang_id,
        }),
        headers={"Content-Type": "application/json"})
    assert user_response.status_code == 201
    user_id = json.loads(user_response.data.decode('utf-8')).get('id')
    assert user_id is not None

    location_response = app.test_client().post(
        '/location',
        data=json.dumps({
            "name": "location" + str(random.randint(0, 1000000000)),
            "latitude": 0.00,
            "longitude": 0.00,
        }),
        headers={"Content-Type": "application/json"})
    assert location_response.status_code == 201
    location_id = json.loads(location_response.data.decode('utf-8')).get('id')
    assert location_id is not None

    rating_response = app.test_client().post(
        '/rating',
        data=json.dumps({
            "userId": user_id,
            "rating": 3,
            "locationId": location_id
        }),
        headers={"Content-Type": "application/json"})
    assert rating_response.status_code == 201
    assert json.loads(
        rating_response.data.decode('utf-8')).get('id') is not None

