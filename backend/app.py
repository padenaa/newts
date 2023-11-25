from flask import Flask

app = Flask(__name__)


@app.route("/test")
def test_app():
    return {"message": "this app works"}


if __name__ == "__main__":
    app.run("127.0.0.1", 5000)
