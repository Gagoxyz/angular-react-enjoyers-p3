import { View, StyleSheet, Text, Image } from "react-native";

export function Player({ item }) {
    return (
        <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.multimedia[0] }} style={styles.image} />

            <Text style={styles.name}>
                {item.nombre} {item.apellidos}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
        alignItems: "center"
    },
    image: {
        width: 200,
        height: 200,
        backgroundColor: "#eee"
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#333"
    },
});

export default styles;
