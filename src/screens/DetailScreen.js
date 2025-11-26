import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const { player } = route.params; 

  return (
    <ScrollView style={styles.container}>
      {/* Zona de Imagen */}
      <View style={styles.imageContainer}>
        <Image 
          // CORRECCIÓN 1: Usamos multimedia[0] porque es un array de imágenes
          source={{ uri: player.multimedia ? player.multimedia[0] : 'https://via.placeholder.com/300' }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Zona de Datos */}
      <View style={styles.infoContainer}>
        {/* CORRECCIÓN 2: nombre y apellidos */}
        <Text style={styles.title}>{player.nombre} {player.apellidos}</Text>
        
        {/* CORRECCIÓN 3: posicion */}
        <Text style={styles.position}>{player.posicion}</Text>
        
        {/* Extras: Edad y Altura (ya que los tenemos en el modelo) */}
        <View style={styles.statsContainer}>
            <Text style={styles.stat}>Edad: {player.edad} años</Text>
            <Text style={styles.stat}>Altura: {player.altura} cm</Text>
        </View>

        <View style={styles.divider} />
        
        <Text style={styles.descriptionLabel}>Descripción:</Text>
        {/* CORRECCIÓN 4: info */}
        <Text style={styles.description}>
          {player.info || "Sin descripción disponible."}
        </Text>
      </View>
      
      <View style={{ margin: 20, gap: 10 }}>
         {/* NUEVO BOTÓN: Navega a Multimedia pasando el jugador */}
         <Button 
           title="Ver El video" 
           color="#f4511e"
           onPress={() => navigation.navigate('Multimedia', { player })} 
         />

         <Button title="Volver al Listado" onPress={() => navigation.goBack()} />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  position: {
    fontSize: 18,
    color: '#f4511e',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 10,
  },
  stat: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'justify',
  },
});