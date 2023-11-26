import pytest
import json
from app import app
import random


def test_langs_route():
    lang_response = app.test_client().post(
        '/lang',
        data=json.dumps({
            "name": "Language",
        }),
        headers={"Content-Type": "application/json"})

    assert lang_response.status_code == 201
    lang_id = json.loads(lang_response.data.decode('utf-8')).get('id')
    assert lang_id is not None

    response = app.test_client().get(
        '/langs',
        headers={"Content-Type": "application/json"})
    assert response.status_code == 201
    assert json.loads(response.data.decode('utf-8')).get('name') == "Language"