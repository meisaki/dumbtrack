import { Button, StyleSheet, Text, View } from "react-native";

const format = (d: Date) =>
  `${d.getFullYear()}/${String(d.getMonth() + 1)}/${String(
    d.getDate()
  ).padStart(2, "0")}`;

type ResetProp = {
  res: string;
  onPress?: () => void;
};

export default function Reset({ res, onPress }: ResetProp) {
  const date = new Date();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{res}</Text>
      <Text style={styles.text}>--ACTIVITY--</Text>
      <Text style={styles.text}>{format(date)}</Text>
      <Button title="Done!" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 15,
    height: 300,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 32,
    color: "grey",
  },
});
