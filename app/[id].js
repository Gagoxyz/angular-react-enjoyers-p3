import { Text, View, StyleSheet, Image } from "react-native";
import { images } from "../assets/images/images";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from "expo-router";

export default function Detail() {
    const insets = useSafeAreaInsets();
    return (
        <View>
            <View style={{ flex: 1 }}>
                {/* HEADER */}
                <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                    <Image source={images.logo} style={styles.logo} />
                    <Text style={styles.title}>Equipo Basket</Text>
                    <Link href="/about" style={{ color: "white", marginTop: 10 }}>
                        Ir al About
                    </Link>
                </View>
            </View>
            <Text>Detalle del jugador</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#E44D26",
        width: "100%",
        paddingBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 8,
        elevation: 8,
    },
    logo: {
        width: 90,
        height: 90,
        resizeMode: "contain",
        marginBottom: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFFFFF",
        letterSpacing: 2,
        textTransform: "uppercase",
    },
});