import { StyleSheet, FlatList, ImageBackground, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Player } from '../../components/Player'; 
import { images } from '../../assets/images/images';
import { getPlayers } from '../../service/players';

export default function HomeScreen({ navigation }) { // Recibimos 'navigation'
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getPlayers();
      setPlayers(data);
    };
    load();
  }, []);

 return (
    <ImageBackground
      source={images.background}
      style={styles.background}
      resizeMode="cover"
    >
      <FlatList
        data={players}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            // 2. Envolvemos el Player con TouchableOpacity
            // 'Detail' es el nombre que le pusimos en App.js
            // Pasamos un objeto con el ID del jugador para usarlo después
            <TouchableOpacity 
              onPress={() => navigation.navigate('Detail', { playerId: item.id })}
            >
              <Player item={item} />
            </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingVertical: 50 }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
