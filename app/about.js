import { ScrollView, Text } from "react-native";
import { Link } from "expo-router";

export default function About() {
    return (
        <ScrollView>
            <Text>About</Text>
            <Link href="/" style={{ color: "white", marginTop: 10 }}>
                Ir al inicio
            </Link>
        </ScrollView>
    )
}