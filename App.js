import 'react-native-gesture-handler'; // Importante que vaya primero
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importamos las pantallas
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import MultimediaScreen from './src/screens/MultimediaScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e', // Color de ejemplo (puedes poner el de tu equipo)
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Listado de Jugadores' }} 
        />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={{ title: 'Detalle del Jugador' }}
        />
        <Stack.Screen 
          name="Multimedia" 
          component={MultimediaScreen} 
          options={{ title: 'Multimedia' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}