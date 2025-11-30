import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { Player } from "../types/player";

export default function AddPlayerScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [posicion, setPosicion] = useState("");
  const [edad, setEdad] = useState("");
  const [altura, setAltura] = useState("");
  const [info, setInfo] = useState("");
  const [multimedia, setMultimedia] = useState<string[]>([]);

  const handleSave = async () => {
    const newPlayer: Player = {
      id: "",
      nombre,
      apellidos,
      posicion,
      edad: Number(edad),
      altura: Number(altura),
      multimedia,
      youtubeId: "",
      info
    };

    await addDoc(collection(db, "players"), newPlayer);

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Añadir Jugador</Text>

      <TextInput style={styles.input} placeholder="Nombre" onChangeText={setNombre} />
      <TextInput style={styles.input} placeholder="Apellidos" onChangeText={setApellidos} />
      <TextInput style={styles.input} placeholder="Posición" onChangeText={setPosicion} />
      <TextInput style={styles.input} placeholder="Edad" keyboardType="numeric" onChangeText={setEdad} />
      <TextInput style={styles.input} placeholder="Altura" keyboardType="numeric" onChangeText={setAltura} />
      <TextInput style={styles.textArea} placeholder="Información" multiline onChangeText={setInfo} />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 20 },
  input: { backgroundColor: "#222", color: "white", padding: 12, borderRadius: 8, marginBottom: 12 },
  textArea: { backgroundColor: "#222", color: "white", padding: 12, borderRadius: 8, height: 120, marginBottom: 12 },
  button: { backgroundColor: "#4CAF50", padding: 14, borderRadius: 8, marginTop: 10 },
  buttonText: { color: "white", textAlign: "center", fontSize: 18 }
});