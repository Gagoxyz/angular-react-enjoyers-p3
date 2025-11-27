import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getPlayers } from "../service/players";

export function Media({ id }) {
  const [player, setPlayer] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      const players = await getPlayers();
      const p = players.find((pl) => pl.id === id);
      setPlayer(p);
    };
    load();
  }, [id]);

  // Rewind 15s
  const rewind = useCallback(async () => {
    if (!playerRef.current) return;
    const time = await playerRef.current.getCurrentTime();
    playerRef.current.seekTo(Math.max(time - 15, 0), true);
  }, []);

  // Forward 15s
  const forward = useCallback(async () => {
    if (!playerRef.current) return;
    const time = await playerRef.current.getCurrentTime();
    playerRef.current.seekTo(time + 15, true);
  }, []);

  // Stop = volver al inicio
  const stop = useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(0, true);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>
          {player ? `Vídeo de ${player.nombre} ${player.apellidos}` : "Cargando..."}
        </Text>

        {player && (
          <YoutubePlayer
            ref={playerRef}
            height={240}
            width="100%"
            videoId={player.youtubeId}
            webViewStyle={{ opacity: 0.99 }}
            initialPlayerParams={{
              controls: true, // dejamos que el propio player maneje Play/Pause
              modestbranding: true,
              rel: false,
            }}
          />
        )}

        <View style={styles.controls}>
          <TouchableOpacity onPress={rewind} style={styles.iconBtn}>
            <Ionicons name="play-back-circle" size={40} color="#0F2537" />
          </TouchableOpacity>

          <TouchableOpacity onPress={stop} style={styles.iconBtn}>
            <Ionicons name="stop-circle-sharp" size={40} color="#0F2537" />
          </TouchableOpacity>

          <TouchableOpacity onPress={forward} style={styles.iconBtn}>
            <Ionicons name="play-forward-circle" size={40} color="#0F2537" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, width: "100%" },
  card: {
    backgroundColor: "#FDFDFD",
    borderRadius: 16,
    padding: 20,
    maxWidth: 700,
    width: "100%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
    color: "#0F2537",
    fontWeight: "bold",
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: -10,
  },
  iconBtn: {
    padding: 4,
  },
});
