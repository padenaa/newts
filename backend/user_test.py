import pytest
import json
from app import app
import random


def test_register_route():
    response = app.test_client().post(
        '/register',
        data=json.dumps({
            "username": "test" + str(random.randint(0, 1000000000)),
            "password": "test",
            "language": 1,
        }),
        headers={"Content-Type": "application/json"})
    assert response.status_code == 201
    assert json.loads(response.data.decode('utf-8')).get('id') is not None


def test_login_route():
    randnum = str(random.randint(0, 1000000000))
    register_response = app.test_client().post(
        '/register',
        data=json.dumps({
            "username": "test" + randnum,
            "password": "test",
            "language": 1,
        }),
        headers={"Content-Type": "application/json"})
    assert register_response.status_code == 201

    id = json.loads(register_response.data.decode('utf-8')).get('id')
    assert id is not None

    login_response = app.test_client().post(
        '/login',
        data=json.dumps({
            "username": "test" + randnum,
            "password": "test",
        }),
        headers={"Content-Type": "application/json"})
    assert login_response.status_code == 200
    assert json.loads(login_response.data.decode('utf-8')).get('id') == id
