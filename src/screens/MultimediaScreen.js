import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, ActivityIndicator, Alert, Linking, Platform, Share } from 'react-native';
import { Video } from 'expo-av';
import YoutubePlayer from 'react-native-youtube-iframe';
import { getPlayerById } from '../../service/players';

export default function MultimediaScreen({ route }) {
  const playerId = route?.params?.playerId ?? route?.params?.player?.id ?? null;
  const [player, setPlayer] = useState(route?.params?.player ?? null);
  const [loading, setLoading] = useState(!player);

  useEffect(() => {
	let mounted = true;
	const load = async () => {
	  if (player) {
		setLoading(false);
		return;
	  }
	  if (!playerId) {
		setLoading(false);
		return;
	  }
	  try {
		const p = await getPlayerById(playerId);
		if (mounted) setPlayer(p);
	  } catch (e) {
		console.warn('Error fetching player', e);
	  } finally {
		if (mounted) setLoading(false);
	  }
	};
	load();
	return () => (mounted = false);
  }, [playerId]);

  const videoRef = useRef(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMutedVideo, setIsMutedVideo] = useState(false);

  // YouTube simple states
  const [ytPlaying, setYtPlaying] = useState(false);
  const [ytMuted, setYtMuted] = useState(false);

  const openExternal = async () => {
	const id = player?.youtubeId;
	if (!id) return Alert.alert('Error', 'ID de YouTube no disponible');
	const web = `https://www.youtube.com/watch?v=${id}`;
	const deep = Platform.select({ ios: `vnd.youtube://watch?id=${id}`, android: `vnd.youtube://watch?id=${id}`, default: web });
	try {
	  const can = await Linking.canOpenURL(deep);
	  if (can) return Linking.openURL(deep);
	} catch (e) {}
	Linking.openURL(web).catch(() => Alert.alert('Error', 'No se pudo abrir YouTube'));
  };

  const togglePlay = async () => {
	if (player?.videoUrl && videoRef.current) {
	  try {
		const status = await videoRef.current.getStatusAsync();
		if (!status.isLoaded) return;
		if (status.isPlaying) {
		  await videoRef.current.pauseAsync();
		  setIsPlayingVideo(false);
		} else {
		  await videoRef.current.playAsync();
		  setIsPlayingVideo(true);
		}
	  } catch (e) {
		console.warn(e);
	  }
	} else if (player?.youtubeId) {
	  setYtPlaying(p => !p);
	}
  };

  const toggleMute = async () => {
	if (player?.videoUrl && videoRef.current) {
	  try {
		const status = await videoRef.current.getStatusAsync();
		if (!status.isLoaded) return;
		await videoRef.current.setStatusAsync({ isMuted: !status.isMuted });
		setIsMutedVideo(m => !m);
	  } catch (e) {
		console.warn(e);
	  }
	} else if (player?.youtubeId) {
	  setYtMuted(m => !m);
	}
  };

  const onShare = async () => {
	try {
	  const url = player?.videoUrl ? player.videoUrl : player?.youtubeId ? `https://www.youtube.com/watch?v=${player.youtubeId}` : null;
	  if (!url) return Alert.alert('Error', 'No hay URL para compartir');
	  await Share.share({ message: url });
	} catch (e) {
	  console.warn('Share error', e);
	}
  };

  if (loading) return (
	<View style={styles.center}><ActivityIndicator /></View>
  );

  if (!player) return (
	<View style={styles.container}><Text style={styles.title}>Multimedia</Text><Text>No hay datos del jugador.</Text></View>
  );

  const hasVideoFile = !!player.videoUrl;

  return (
	<View style={styles.container}>
	  <Text style={styles.title}>{player.nombre ?? player.name ?? 'Video'}</Text>

	  <View style={styles.mediaArea}>
		{hasVideoFile ? (
		  <Video
			ref={videoRef}
			source={{ uri: player.videoUrl }}
			style={styles.video}
			resizeMode="contain"
			isLooping={false}
			useNativeControls={true}
		  />
		) : player.youtubeId ? (
		  <YoutubePlayer height={220} play={ytPlaying} videoId={player.youtubeId} mute={ytMuted} />
		) : (
		  <Button title="Abrir en YouTube" onPress={openExternal} />
		)}
	  </View>

	  <View style={styles.controlsRow}>
		<View style={styles.controlButton}><Button title="Play/Pausa" onPress={togglePlay} /></View>
		<View style={styles.controlButton}><Button title="Silencio" onPress={toggleMute} /></View>
		<View style={styles.controlButton}><Button title="Abrir en YouTube" onPress={openExternal} /></View>
		<View style={styles.controlButton}><Button title="Compartir" onPress={onShare} /></View>
	  </View>
	</View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12, color: '#111' },
  mediaArea: { marginBottom: 12 },
  video: { width: '100%', height: 220, backgroundColor: '#000' },
  controlsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  controlButton: { flex: 1, marginHorizontal: 6 },
});

