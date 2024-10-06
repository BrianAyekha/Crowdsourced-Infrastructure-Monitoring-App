import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ReportForm extends StatefulWidget {
  @override
  _ReportFormState createState() => _ReportFormState();
}

class _ReportFormState extends State<ReportForm> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final TextEditingController _locationController = TextEditingController();

  void submitReport() async {
    final response = await http.post(
      Uri.parse('http://localhost:3001/reports'),
      headers: {'Content-Type': 'application/json'},
      body: {
        'title': _titleController.text,
        'description': _descriptionController.text,
        'location': _locationController.text,
        'image': '' // Add image logic later
      },
    );
    if (response.statusCode == 201) {
      // Handle successful report submission
    } else {
      // Handle error
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Submit Report')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _titleController,
              decoration: InputDecoration(labelText: 'Title'),
            ),
            TextField(
              controller: _descriptionController,
              decoration: InputDecoration(labelText: 'Description'),
            ),
            TextField(
              controller: _locationController,
              decoration: InputDecoration(labelText: 'Location'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: submitReport,
              child: Text('Submit'),
            ),
          ],
        ),
      ),
    );
  }
}
