import { View, Text, Image, StyleSheet, ScrollView, Modal, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getPlayers } from "../service/players";
import { useEffect, useState } from "react";

export default function Detail() {
    const { id } = useLocalSearchParams();
    const [player, setPlayer] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const load = async () => {
            const players = await getPlayers();
            const p = players.find((pl) => pl.id === id);
            setPlayer(p);
        };
        load();
    }, [id]);

    if (!player) return <Text style={styles.loading}>Cargando...</Text>;

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.card}>
                <TouchableOpacity onPress={() => {
                    setSelectedImage(player.multimedia[0]);
                    setModalVisible(true);
                }}>
                    <Image source={{ uri: player.multimedia[0] }} style={styles.image} />
                </TouchableOpacity>

                {/* Modal para mostrar la imagen ampliada */}
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Cerrar</Text>
                        </TouchableOpacity>
                        <Image
                            source={{ uri: selectedImage }}
                            style={styles.fullImage}
                            resizeMode="contain"
                        />
                    </View>
                </Modal>


                <Text style={styles.title}>
                    {player.nombre} {player.apellidos}
                </Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Edad:</Text>
                    <Text style={styles.value}>{player.edad}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Posición:</Text>
                    <Text style={styles.value}>{player.posicion}</Text>
                </View>

                <Text style={styles.label}>Información:</Text>
                <Text style={styles.info}>{player.info}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#0F2537",
        padding: 16,
    },
    card: {
        backgroundColor: "#FDFDFD",
        borderRadius: 16,
        padding: 20,
        width: "100%",
        maxWidth: 700,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 10,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 12,
        marginBottom: 20,
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#E44D26",
        marginBottom: 16,
    },

    row: {
        flexDirection: "row",
        marginBottom: 8,
    },

    label: {
        fontSize: 18,
        color: "#0F2537",
        fontWeight: "bold",
        marginBottom: 4,
    },

    value: {
        fontSize: 18,
        color: "#0F2537",
        marginLeft: 6,
    },

    info: {
        fontSize: 16,
        color: "#0F2537",
        lineHeight: 22,
        marginTop: 4,
    },

    loading: {
        textAlign: "center",
        color: "white",
        marginTop: 40,
        fontSize: 20,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        padding: 10,
    },
    closeText: {
        color: '#fff',
        fontSize: 16,
    },
    fullImage: {
        width: '90%',
        height: '80%',
        borderRadius: 10,
    },
});