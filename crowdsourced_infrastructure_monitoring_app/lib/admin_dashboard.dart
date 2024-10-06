import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class AdminDashboard extends StatefulWidget {
  @override
  _AdminDashboardState createState() => _AdminDashboardState();
}

class _AdminDashboardState extends State<AdminDashboard> {
  List reports = [];

  @override
  void initState() {
    super.initState();
    fetchReports();
  }

  void fetchReports() async {
    final response = await http.get(Uri.parse('http://localhost:3001/reports'));
    if (response.statusCode == 200) {
      setState(() {
        reports = jsonDecode(response.body);
      });
    } else {
      print('Failed to load reports');
    }
  }

  void updateReportStatus(int reportId, String status) async {
    final response = await http.patch(
      Uri.parse('http://localhost:3001/reports/$reportId/status'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'status': status}),
    );
    if (response.statusCode == 200) {
      fetchReports(); // Refresh the report list
    } else {
      print('Failed to update report status');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Admin Dashboard')),
      body: ListView.builder(
        itemCount: reports.length,
        itemBuilder: (context, index) {
          final report = reports[index];
          return ListTile(
            title: Text(report['title']),
            subtitle: Text('Status: ${report['status']}'),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                IconButton(
                  icon: Icon(Icons.check, color: Colors.green),
                  onPressed: () {
                    updateReportStatus(report['id'], 'approved');
                  },
                ),
                IconButton(
                  icon: Icon(Icons.close, color: Colors.red),
                  onPressed: () {
                    updateReportStatus(report['id'], 'rejected');
                  },
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
