import React from 'react';
import { Modal, View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { Player } from '../types/player';

interface Props {
  visible: boolean;
  player: Player | null;
  onClose: () => void;
}

export default function PlayerModal({ visible, player, onClose }: Props) {
  if (!player) return null;

  const youtubeUrl = `https://www.youtube.com/embed/${player.youtubeId}`;

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          
          {/* Cerrar */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>✖</Text>
          </TouchableOpacity>

          <ScrollView>

            {/* Nombre */}
            <Text style={styles.title}>
              {player.nombre} {player.apellidos}
            </Text>

            {/* Imagen principal */}
            <Image 
              source={{ uri: player.multimedia?.[0] }}
              style={styles.mainImage}
            />

            {/* INFO */}
            <View style={styles.dataBox}>
              <Text style={styles.label}>Posición: <Text style={styles.value}>{player.posicion}</Text></Text>
              <Text style={styles.label}>Edad: <Text style={styles.value}>{player.edad} años</Text></Text>
              <Text style={styles.label}>Altura: <Text style={styles.value}>{player.altura} cm</Text></Text>
            </View>

            {/* Descripción */}
            <Text style={styles.info}>{player.info}</Text>

            {/* VIDEO */}
            <View style={{ height: 220, marginTop: 20 }}>
              <WebView
                javaScriptEnabled
                domStorageEnabled
                source={{ uri: youtubeUrl }}
              />
            </View>

          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 15
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 20
  },
  closeText: {
    fontSize: 24,
    fontWeight: '800'
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8
  },
  mainImage: {
    width: '100%',
    height: 260,
    borderRadius: 12,
    marginBottom: 12
  },
  dataBox: {
    marginBottom: 10
  },
  label: {
    fontWeight: '800',
    fontSize: 16
  },
  value: {
    fontWeight: '400'
  },
  info: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20
  }
});