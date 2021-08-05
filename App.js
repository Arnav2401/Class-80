import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/homeScreen';
import ISSLocator from './screens/issLocation';
import Meteor from './screens/meteor';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator
    initialRouteName={'HomeScreen'}
    screenOptions={{
      headerShown:false
    }}
    >
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='ISSLocator'component={ISSLocator}/>
        <Stack.Screen name='Meteor' component={Meteor}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
