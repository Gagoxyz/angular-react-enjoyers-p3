import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { Player } from "../types/player";

type PlayerDetailsRouteProp = RouteProp<RootStackParamList, "PlayerDetails">;

interface Props {
  route: PlayerDetailsRouteProp;
}

export default function PlayerDetailsScreen({ route }: Props) {
  const { player } = route.params;

    return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: player.multimedia[0] }}
        style={styles.image}
      />

      <Text style={styles.name}>{player.nombre} {player.apellidos}</Text>
      <Text style={styles.position}>{player.posicion}</Text>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Edad:</Text>
        <Text style={styles.value}>{player.edad} años</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Altura:</Text>
        <Text style={styles.value}>{player.altura} cm</Text>
      </View>

      <Text style={styles.description}>{player.info}</Text>

      {/* YouTube — lo implementamos luego */}
      <View style={{ height: 200, backgroundColor: "#222", marginTop: 20, borderRadius: 10 }}>
        <Text style={{ color: "white", textAlign: "center", marginTop: 80 }}>
          Video YouTube (“{player.youtubeId}”)
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  image: {
    width: "100%",
    height: 300
  },
  name: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    paddingHorizontal: 14,
    marginTop: 12
  },
  position: {
    color: "#aaa",
    fontSize: 20,
    paddingHorizontal: 14,
    marginBottom: 10
  },
  infoSection: {
    flexDirection: "row",
    paddingHorizontal: 14,
    marginVertical: 4
  },
  label: {
    color: "#888",
    width: 90
  },
  value: {
    color: "white"
  },
  description: {
    color: "#ccc",
    paddingHorizontal: 14,
    fontSize: 16,
    marginTop: 10
  }
});