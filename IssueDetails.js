import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IssueDetails = ({ route }) => {
  const [issue, setIssue] = useState({});

  useEffect(() => {
    fetch(`/api/reports/${route.params.issueId}`)
      .then(response => response.json())
      .then(data => setIssue(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Issue Details</Text>
      <Text style={styles.title}>{issue.title}</Text>
      <Text style={styles.description}>{issue.description}</Text>
      <Text style={styles.location}>{issue.location}</Text>
      <Text style={styles.category}>{issue.category}</Text>
      <Text style={styles.severity}>{issue.severity}</Text>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  location: {
    fontSize: 16,
  },
  category: {
    fontSize: 16,
  },
  severity: {
    fontSize: 16,
  },
});

export default IssueDetails;