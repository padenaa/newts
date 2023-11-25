import pytest
import json
from app import app


def test_test_route():
    response = app.test_client().get('/test')

    assert response.status_code == 200
    assert json.loads(
        response.data.decode('utf-8')).get('message') == 'this app works'
