import { StyleSheet, FlatList, ImageBackground, View, TouchableOpacity, Image, TextInput, Text, Modal } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { Player } from '../../components/Player'; 
import { images } from '../../assets/images/images';
import { getPlayers } from '../../service/players';

export default function HomeScreen({ navigation }) { // Recibimos 'navigation'
  const [players, setPlayers] = useState([]);
  const [nameQuery, setNameQuery] = useState('');
  const [minHeight, setMinHeight] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('Todas');
  const [showPosModal, setShowPosModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getPlayers();
      setPlayers(data);
    };
    load();
  }, []);

  // derive unique positions
  const positions = useMemo(() => {
    const set = new Set();
    players.forEach(p => { if (p.posicion) set.add(p.posicion); });
    return ['Todas', ...Array.from(set)];
  }, [players]);

  const filtered = useMemo(() => {
    return players.filter(p => {
      if (nameQuery && !`${p.nombre} ${p.apellidos}`.toLowerCase().includes(nameQuery.toLowerCase())) return false;
      if (minHeight) {
        const h = Number(minHeight);
        if (!isNaN(h) && (Number(p.altura) < h)) return false;
      }
      if (selectedPosition && selectedPosition !== 'Todas' && p.posicion !== selectedPosition) return false;
      return true;
    });
  }, [players, nameQuery, minHeight, selectedPosition]);

 return (
    <ImageBackground source={images.background} style={styles.background} resizeMode="cover">
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detail', { player: item })}>
            <Player item={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
        ListHeaderComponent={(
          <View>
            <View style={styles.header}>
              <Image source={images.logo} style={styles.logo} resizeMode="contain" />
              <Text style={styles.appTitle}>EQUIPO BASKET</Text>
            </View>

            <View style={styles.filtersContainer}>
              <View style={styles.filterRow}>
                <TextInput
                  placeholder="Buscar por nombre"
                  value={nameQuery}
                  onChangeText={setNameQuery}
                  style={[styles.input, styles.inputHalf, { marginRight: 8 }]}
                />
                <TextInput
                  placeholder="Altura mínima (cm)"
                  value={minHeight}
                  onChangeText={setMinHeight}
                  keyboardType="numeric"
                  style={[styles.input, styles.inputHalf]}
                />
              </View>

              <TouchableOpacity style={styles.posSelector} onPress={() => setShowPosModal(true)}>
                <Text style={styles.posSelectorText}>{selectedPosition || 'Seleccionar posición'}</Text>
                <Text style={styles.posSelectorArrow}>▾</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={showPosModal} transparent animationType="fade" onRequestClose={() => setShowPosModal(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowPosModal(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filtrar por posición</Text>
            <FlatList
              data={positions}
              keyExtractor={(i) => i}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.modalItem, item === selectedPosition && styles.modalItemActive]}
                  onPress={() => {
                    setSelectedPosition(item);
                    setShowPosModal(false);
                  }}
                >
                  <Text style={[styles.modalItemText, item === selectedPosition && styles.modalItemTextActive]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  appTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  filtersContainer: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputHalf: {
    flex: 1,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  posSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
  },
  posSelectorText: {
    color: '#333',
    fontWeight: '600',
  },
  posSelectorArrow: {
    color: '#333',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: '70%'
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  modalItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
  },
  modalItemActive: {
    backgroundColor: '#1FB28A'
  },
  modalItemText: {
    color: '#333'
  },
  modalItemTextActive: {
    color: '#fff'
  },
});
