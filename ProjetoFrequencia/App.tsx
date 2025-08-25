import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './screens/MenuScreen';
import QRCodeScreen from './screens/QRCodeScreen';
import FaltasScreen from './screens/FaltasScreen';
import ListaPresencaScreen from './screens/ListaPresencaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="QRCode" component={QRCodeScreen} />
        <Stack.Screen name="Faltas" component={FaltasScreen} />
        <Stack.Screen name="ListaPresenca" component={ListaPresencaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}