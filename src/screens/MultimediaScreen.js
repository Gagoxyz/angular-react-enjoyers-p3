import { View, Text, StyleSheet } from 'react-native';

export default function MultimediaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aquí irá el reproductor Multimedia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 }
});