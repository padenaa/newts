from flask import Flask
from user_routes import user_routes
from language_routes import language_routes
from location_routes import location_routes
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(user_routes)
app.register_blueprint(language_routes)
app.register_blueprint(location_routes)
CORS(app)


@app.route("/test")
def test_app():
    return {"message": "this app works"}


if __name__ == "__main__":
    app.run("127.0.0.1", 5000)
