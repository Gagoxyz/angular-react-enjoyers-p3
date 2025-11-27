import { useLocalSearchParams } from "expo-router";
import { Detail } from "../components/Detail";
import { Media } from "../components/Media";
import { ScrollView, View } from "react-native";

export default function DetailPage() {
    const { id } = useLocalSearchParams();

    return (
        <ScrollView style={{ flex: 1 }}>
            <Detail id={id} />
            <Media id={id} />
        </ScrollView>
    );
}
