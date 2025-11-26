import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ImageBackground, StyleSheet, View } from "react-native";
import { images } from "../assets/images/images";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <ImageBackground
        source={images.background}
        style={styles.background}
        resizeMode="cover"
      >
        <Stack />

      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
