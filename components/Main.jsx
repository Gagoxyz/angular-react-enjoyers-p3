import { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet, Image, Text } from 'react-native';
import { Player } from './Player';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from '../assets/images/images';
import { getPlayers } from '../service/players';
import { Link } from 'expo-router';

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
      {/* HEADER */}
      {/* <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.title}>Equipo Basket</Text>
        <Link href="/about" style={{ color: "white", marginTop: 10 }}>
          Ir al About
        </Link>
      </View> */}

      {/* CONTENIDO */}
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#E44D26",
    width: "100%",
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
