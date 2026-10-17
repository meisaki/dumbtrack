import { saveActivity } from "@/storage/storage";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function newact() {
  const [actName, setActName] = useState("");
  const [actCat, setActCat] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const nameError =
    nameTouched && actName.trim() === "" ? "Name Required" : null;
  const [catTouched, setCatTouched] = useState(false);
  const catError =
    catTouched && actCat.trim() === "" ? "Category Required" : null;

  // when user confirms entry, save it to the storage, then go back to activity tab
  const onSave = () => {
    if (!actName || !actCat) return;
    if (nameError !== null || catError !== null) return;
    saveActivity(actName, actCat).then(() => router.back());
  };

  useEffect(() => {});
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "New Activity" }} />
      <View style={styles.card}>
        <Text>Acitivy Name</Text>
        <TextInput
          style={[styles.inputcontainer, nameError && styles.invalid]}
          placeholder="enter activity name"
          placeholderTextColor={"grey"}
          value={actName}
          onChangeText={setActName}
          onEndEditing={() => setNameTouched(true)}
        />
        {nameError && <Text style={styles.errorText}>{nameError}</Text>}
        <Text>Category:</Text>
        <TextInput
          style={[styles.inputcontainer, catError && styles.invalid]}
          placeholder="enter category name"
          placeholderTextColor={"grey"}
          value={actCat}
          onChangeText={setActCat}
          onEndEditing={() => setCatTouched(true)}
        />
        {catError && <Text style={styles.errorText}>{catError}</Text>}
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
  errorText: {
    color: "red",
  },
  invalid: { borderColor: "red", borderWidth: 1 },
});
