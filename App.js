import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa tus pantallas
import HomeScreen from './screens/HomeScreen';
import PlayerDetail from './screens/playerDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Pantalla principal con la lista de jugadores */}
        <Stack.Screen 
          name="Inicio" 
          component={HomeScreen} 
          options={{ title: 'Jugadores de Basket 🏀' }}
        />

        {/* Pantalla de detalle con datos + vídeo */}
        <Stack.Screen 
          name="Detalle" 
          component={PlayerDetail} 
          options={{ title: 'Detalle del Jugador' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
