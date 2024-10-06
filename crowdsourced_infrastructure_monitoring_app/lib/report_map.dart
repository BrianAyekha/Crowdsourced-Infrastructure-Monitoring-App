import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ReportMap extends StatefulWidget {
  @override
  _ReportMapState createState() => _ReportMapState();
}

class _ReportMapState extends State<ReportMap> {
  late GoogleMapController _mapController;
  Set<Marker> _markers = {};
  final TextEditingController _locationController = TextEditingController();

  @override
  void initState() {
    super.initState();
    fetchReports();
  }

  void fetchReports({String? location}) async {
    var url = Uri.parse('http://localhost:3001/reports');
    if (location != null && location.isNotEmpty) {
      url = Uri.parse('http://localhost:3001/reports?location=$location');
    }

    final response = await http.get(url);
    if (response.statusCode == 200) {
      final data = jsonDecode(response.body) as List;
      setState(() {
        _markers.clear();
        for (var report in data) {
          var location = report['location'].split(',');
          var lat = double.parse(location[0]);
          var lng = double.parse(location[1]);
          _markers.add(
            Marker(
              markerId: MarkerId(report['id'].toString()),
              position: LatLng(lat, lng),
              infoWindow: InfoWindow(
                title: report['title'],
                snippet: report['description'],
              ),
            ),
          );
        }
      });
    } else {
      print('Failed to load reports');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Report Map'),
        actions: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: _locationController,
              decoration: InputDecoration(
                hintText: 'Filter by location',
                suffixIcon: IconButton(
                  icon: Icon(Icons.search),
                  onPressed: () {
                    fetchReports(location: _locationController.text);
                  },
                ),
              ),
            ),
          ),
        ],
      ),
      body: GoogleMap(
        onMapCreated: (controller) {
          _mapController = controller;
        },
        markers: _markers,
        initialCameraPosition: CameraPosition(
          target: LatLng(1.2921, 36.8219), // Default position (Nairobi)
          zoom: 12,
        ),
      ),
    );
  }
}
