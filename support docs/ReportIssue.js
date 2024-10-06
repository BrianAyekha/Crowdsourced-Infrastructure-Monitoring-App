import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

const ReportIssue = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [severity, setSeverity] = useState('');
  const [image, setImage] = useState(null);

  const handleTakePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      const result = await Camera.takePictureAsync();
      setImage(result.uri);
    }
  };

  const handleReportIssue = () => {
    // Call the API to report the issue
    fetch('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        location,
        category,
        severity,
        image,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Navigate to the Issue List Page
          navigation.navigate('IssueList');
        } else {
          alert('Error reporting issue');
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Report Issue</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Severity"
        value={severity}
        onChangeText={setSeverity}
      />
      <Button title="Take Photo" onPress={handleTakePhoto} />
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}
      <Button title="Report Issue" onPress={handleReportIssue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default ReportIssue;