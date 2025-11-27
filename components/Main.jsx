import { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { Player } from './Player';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPlayers } from '../service/players';

export function Main() {
  const [players, setPlayers] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const load = async () => {
      const data = await getPlayers();
      setPlayers(data);
    };

    load();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {players.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Player item={item} />}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        />
      )}
    </View>
  );
}
