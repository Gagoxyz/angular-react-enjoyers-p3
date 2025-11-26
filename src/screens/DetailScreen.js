import { View, Text, StyleSheet } from 'react-native';

// Recibimos 'route' además de navigation. En 'route.params' viajan los datos.
export default function DetailScreen({ route }) {
  // Extraemos el playerId que enviamos desde el Home
  const { playerId } = route.params; 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalle del Jugador</Text>
      <Text style={styles.idText}>ID recibido: {playerId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  idText: { fontSize: 18, color: '#666' }
});