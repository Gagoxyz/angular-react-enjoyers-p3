import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import PlayerCard from '../components/PlayerCard';
import PlayerModal from '../components/PlayerModal';
import { Player } from '../types/player';

export default function PlayersScreen() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // =========================
  //    CARGAR JUGADORES
  // =========================
  const loadPlayers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'players'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Player[];

      setPlayers(data);
    } catch (error) {
      console.error("Error cargando jugadores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  // =========================
  //        BORRAR
  // =========================
  const handleDelete = (id: string) => {
    Alert.alert(
      "Eliminar jugador",
      "¿Seguro que quieres eliminar este jugador?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive",
          onPress: async () => {
            await deleteDoc(doc(db, "players", id));
            loadPlayers(); // recargar
          }
        }
      ]
    );
  };

  // =========================
  //        EDITAR
  // =========================
  const handleEdit = (player: Player) => {
    Alert.alert("Editar", "Aquí abriremos el formulario de edición");
    // Próximo paso: crear EditPlayerScreen.tsx
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={players}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <PlayerCard
            player={item}
            onPress={() => {
              setSelectedPlayer(item);
              setModalVisible(true);
            }}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />

      <PlayerModal
        visible={modalVisible}
        player={selectedPlayer}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  }
});