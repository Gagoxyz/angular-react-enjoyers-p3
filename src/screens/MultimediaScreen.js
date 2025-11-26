import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function MultimediaScreen({ route }) {
  const { player } = route.params;

  // URL del video (o el de prueba si no hay)
  const videoUrl = player.videoUrl || 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4';

  // 1. Configuración del Reproductor con el nuevo Hook
  const playerInstance = useVideoPlayer(videoUrl, player => {
    player.loop = true;
    player.play(); // Auto-play al entrar
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Highlights de {player.nombre}</Text>

      {/* 2. Componente Visual del Video */}
      <VideoView 
        style={styles.video} 
        player={playerInstance} 
        allowsFullscreen 
        allowsPictureInPicture 
      />

      {/* 3. ZONA DE INTERACCIÓN (4 Botones para cumplir Rúbrica) */}
      <View style={styles.controlsContainer}>
        
        {/* Botón 1: Play */}
        <View style={styles.button}>
            <Button title="▶ Play" onPress={() => playerInstance.play()} />
        </View>

        {/* Botón 2: Pause */}
        <View style={styles.button}>
            <Button title="⏸ Pause" onPress={() => playerInstance.pause()} />
        </View>

        {/* Botón 3: Mute/Unmute (Alternar) */}
        <View style={styles.button}>
            <Button 
                title="🔊/🔇 Mute" 
                onPress={() => {
                    playerInstance.muted = !playerInstance.muted;
                }} 
            />
        </View>

        {/* Botón 4: Reiniciar */}
        <View style={styles.button}>
            <Button 
                title="⏮ Reiniciar" 
                onPress={() => {
                    playerInstance.currentTime = 0;
                    playerInstance.play();
                }} 
            />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
    borderRadius: 10,
    backgroundColor: 'black', // Fondo negro mientras carga
  },
  controlsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
  },
  button: {
      margin: 5
  }
});