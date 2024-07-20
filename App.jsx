import React from 'react';
import {Button} from 'react-native';
import {withAuthenticator, useAuthenticator} from '@aws-amplify/ui-react-native';
import { NavigationContainer } from '@react-navigation/native';
import {HomeScreen} from './src/screens/HomeScreen'
import {DetailsScreen} from './src/screens/DetailsScreen'
import {ProfileScreen} from './src/screens/ProfileScreen'
import { MapScreen } from './src/screens/MapScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack=createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='Details' component={DetailsScreen}/>
        <Stack.Screen name='Profile' component={ProfileScreen}/>
        <Stack.Screen name="MapScreen" component={MapScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut} title="Sign Out" />;
}

export default withAuthenticator(App);
