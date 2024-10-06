import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ContractorList = () => {
  const [contractors, setContractors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/contractors')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.every(item => item.name && item.email && item.id)) {
          setContractors(data);
        } else {
          setError('Invalid data format');
        }
      })
      .catch(error => setError(error.message));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contractor List</Text>
      {error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : (
        <FlatList
          data={contractors}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
});

export default ContractorList;