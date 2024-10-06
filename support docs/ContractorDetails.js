import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContractorDetails = ({ route }) => {
  const [contractor, setContractor] = useState({});

  useEffect(() => {
    fetch(`/api/contractors/${route.params.contractorId}`)
      .then(response => response.json())
      .then(data => setContractor(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contractor Details</Text>
      <Text style={styles.name}>{contractor.name}</Text>
      <Text style={styles.email}>{contractor.email}</Text>
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
});

export default ContractorDetails;