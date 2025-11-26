import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

export default function PlayerDetail({ route }) {
  const { jugador } = route.params;

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Image
        source={{ uri: jugador.multimedia[0] }}
        style={{ width: '100%', height: 250, borderRadius: 10 }}
      />
      <Text style={{ fontSize: 24, marginVertical: 10 }}>
        {jugador.nombre} {jugador.apellidos}
      </Text>
      <Text>Edad: {jugador.edad}</Text>
      <Text>Altura: {jugador.altura} cm</Text>
      <Text>Posición: {jugador.posicion}</Text>
      <Text style={{ marginVertical: 10 }}>{jugador.info}</Text>

      <Text style={{ fontSize: 18, marginVertical: 10 }}>🎥 Video</Text>
      <View style={{ height: 220 }}>
        <YoutubePlayer
          height={220}
          play={false}                // no autoplay
          videoId={jugador.youtubeId} // usa directamente el ID de Firestore
        />
      </View>
    </ScrollView>
  );
}
