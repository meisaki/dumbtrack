import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Name() {
  const { name } = useLocalSearchParams<{ name: string }>();
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: name }} />

      <View style={styles.card}>
        <Text style={styles.header}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "grey",
    // borderWidth: 2,
  },

  header: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
