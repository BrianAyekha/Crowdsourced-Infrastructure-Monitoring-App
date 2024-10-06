import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const IssueList = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch('/api/reports')
      .then(response => response.json())
      .then(data => setIssues(data))
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.severity}>{item.severity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Issue List</Text>
      <FlatList
        data={issues}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
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
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
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

export default IssueList;