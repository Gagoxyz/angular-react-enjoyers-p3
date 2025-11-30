import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Player } from '../types/player';

interface PlayerCardProps {
  player: Player;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function PlayerCard({ player, onPress, onEdit, onDelete }: PlayerCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      
      <Image source={{ uri: player.multimedia[0] }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{player.nombre}</Text>
        <Text style={styles.position}>{player.posicion}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.edit}>✏️</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.delete}>🗑️</Text>
        </TouchableOpacity>
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#111',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: 160
  },
  info: {
    padding: 10
  },
  name: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700'
  },
  position: {
    color: '#ccc'
  },
  actions: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    gap: 12
  },
  edit: { fontSize: 20, color: 'orange' },
  delete: { fontSize: 20, color: 'red' }
});