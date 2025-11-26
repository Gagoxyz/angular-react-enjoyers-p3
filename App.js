import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, ImageBackground, View } from 'react-native';
import { Player } from './components/Player';
import { images } from './assets/images/images';

import { getPlayers } from './service/players';

export default function App() {
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
        renderItem={({ item }) => <Player item={item} />}
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