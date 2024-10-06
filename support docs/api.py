from app import app
from models import Report, User, Contractor

@app.route("/api/reports", methods=["GET"])
def get_reports():
    reports = Report.query.all()
    return jsonify([report.to_dict() for report in reports])

@app.route("/api/reports", methods=["POST"])
def create_report():
    data = request.get_json()
    report = Report(**data)
    db.session.add(report)
    db.session.commit()
    return jsonify(report.to_dict())

@app.route("/api/reports/<int:report_id>", methods=["GET"])
def get_report(report_id):
    report = Report.query.get(report_id)
    if report is None:
        return jsonify({"error": "Report not found"}), 404
    return jsonify(report.to_dict())

@app.route("/api/reports/<int:report_id>", methods=["PUT"])
def update_report(report_id):
    report = Report.query.get(report_id)
    if report is None:
        return jsonify({"error": "Report not found"}), 404
    data = request.get_json()
    for key, value in data.items():
        setattr(report, key, value)
    db.session.commit()
    return jsonify(report.to_dict())

@app.route("/api/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route("/api/contractors", methods=["GET"])
def get_contractors():
    contractors = Contractor.query.all()
    return jsonify([contractor.to_dict() for contractor in contractors])