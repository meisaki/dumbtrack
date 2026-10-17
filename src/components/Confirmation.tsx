import { getSingleActivity } from "@/storage/storage";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const format = (d: Date) =>
  `${d.getFullYear()}/${String(d.getMonth() + 1)}/${String(
    d.getDate()
  ).padStart(2, "0")}`;

type ResetProp = {
  res: string;
  id: number;
  onPress?: () => void;
};

export default function Confirmation({ res, onPress, id }: ResetProp) {
  const date = new Date();
  const [act, setAct] = useState("");

  useEffect(() => {
    getSingleActivity(id).then(setAct);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{res}</Text>
      <Text style={styles.text}>{act}</Text>
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
