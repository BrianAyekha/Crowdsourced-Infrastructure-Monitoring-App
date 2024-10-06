import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import ReportIssue from './ReportIssue';
import IssueList from './IssueList';
import IssueDetails from './IssueDetails';
import ContractorList from './ContractorList';
import ContractorDetails from './ContractorDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ReportIssue" component={ReportIssue} />
        <Stack.Screen name="IssueList" component={IssueList} />
        <Stack.Screen name="IssueDetails" component={IssueDetails} />
        <Stack.Screen name="ContractorList" component={ContractorList} />
        <Stack.Screen name="ContractorDetails" component={ContractorDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;