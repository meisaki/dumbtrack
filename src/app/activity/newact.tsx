import { saveActivity } from "@/storage/storage";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function newact() {
  const [actName, setActName] = useState("");
  const [actCat, setActCat] = useState("");

  // when user confirms entry, save it to the storage, then go back to activity tab
  const onSave = () => {
    if (!actName || !actCat) return;
    saveActivity(actName, actCat).then(() => router.back());
  };

  useEffect(() => {});
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "New Activity" }} />
      <View style={styles.card}>
        <Text>Acitivy Name</Text>
        <TextInput
          style={styles.inputcontainer}
          placeholder="enter activity name"
          placeholderTextColor={"grey"}
          value={actName}
          onChangeText={setActName}
        />
        <Text>Category:</Text>
        <TextInput
          style={styles.inputcontainer}
          placeholder="enter category name"
          placeholderTextColor={"grey"}
          value={actCat}
          onChangeText={setActCat}
        />
        <Button title="Add" onPress={onSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {},
  sectionheader: {},
  inputcontainer: {
    borderWidth: 1,
  },
});
