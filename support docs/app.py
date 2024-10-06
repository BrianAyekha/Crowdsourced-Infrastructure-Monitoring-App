from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://user:password@localhost/infrastructure_monitoring_app"
db = SQLAlchemy(app)

@app.route("/")
def index():
    return "Infrastructure Monitoring App"

if __name__ == "__main__":
    app.run(debug=True)