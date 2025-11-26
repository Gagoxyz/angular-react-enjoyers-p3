import { StyleSheet, Text, Image, Pressable } from "react-native";

export function Player({ item }) {
  return (
    <Pressable
      key={item.id}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image 
        source={{ uri: item.multimedia[0] }} 
        style={styles.image} 
      />

      <Text style={styles.name}>
        {item.nombre} {item.apellidos}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E44D26",
    borderRadius: 14,
    marginVertical: 10,
    marginHorizontal: 18,
    paddingBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 3,
    borderColor: "#E44D26",
  },

  cardPressed: {
    transform: [{ translateY: -3 }],
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 10,
    padding: 4,
    backgroundColor: "#F4B042",
  },

  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    resizeMode: "cover",
    backgroundColor: "#00000033",
  },

  name: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
