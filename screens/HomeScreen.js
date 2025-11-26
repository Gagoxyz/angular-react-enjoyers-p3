import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";


export default function HomeScreen({ navigation }) {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    const fetchJugadores = async () => {
      const querySnapshot = await getDocs(collection(db, "players"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJugadores(data);
    };
    fetchJugadores();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Jugadores de Basket 🏀</Text>
      <FlatList
        data={jugadores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detalle', { jugador: item })}>
            <Image
              source={{ uri: item.multimedia[0] }}
              style={{ width: '100%', height: 200, marginBottom: 10, borderRadius: 10 }}
            />
            <Text style={{ fontSize: 18, textAlign: 'center' }}>{item.nombre} {item.apellidos}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
