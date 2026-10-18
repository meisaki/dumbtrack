import AddButton from "@/components/AddButton";
import Heading from "@/components/Heading";
import { colors } from "@/logic/logic";
import { saveActivity } from "@/storage/storage";
import { router, Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function newact() {
  const [actName, setActName] = useState("");
  const [actCat, setActCat] = useState("");

  const [touched, setTouched] = useState({ name: false, cat: false });
  const nameError = touched.name && !actName.trim();
  const catError = touched.cat && !actCat.trim();

  const disabled = actName.trim() === "" || actCat.trim() === "";

  // when user confirms entry, save it to the storage, then go back to previous screen
  const onSave = () => {
    saveActivity(actName, actCat).then(() => router.back());
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "" }} />
      <Heading
        header="New Activity"
        subtitle="Add a new activity you want to track!"
      />
      <View style={styles.formCard}>
        <Text style={styles.cardHeading}>Add Detail</Text>
        <Text style={styles.cardSubtitle}>
          Give your activity a name and category.
        </Text>
        <View style={styles.inputGroup}>
          <View style={styles.inputHeaderContainer}>
            <View
              style={[
                styles.inputColorBall,
                { backgroundColor: colors.lightblue },
              ]}
            />
            <Text style={styles.inputHeader}>Activity name</Text>
          </View>
          <TextInput
            style={[styles.input, nameError && styles.inputInvalid]}
            placeholder="Swimming"
            placeholderTextColor={"grey"}
            value={actName}
            onChangeText={setActName}
            onEndEditing={() => setTouched({ name: true, cat: touched.cat })}
          />
          {nameError && <Text style={styles.inputError}>Name Required</Text>}

          <Text style={styles.cardSubtitle}>
            Choose a short name that describe your activity.
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <View style={styles.inputHeaderContainer}>
            <View
              style={[
                styles.inputColorBall,
                { backgroundColor: colors.orange },
              ]}
            />
            <Text style={styles.inputHeader}>Category</Text>
          </View>
          <TextInput
            style={[styles.input, catError && styles.inputInvalid]}
            placeholder="Exercise"
            placeholderTextColor={"grey"}
            value={actCat}
            onChangeText={setActCat}
            onEndEditing={() => setTouched({ name: touched.name, cat: true })}
          />
          {catError && <Text style={styles.inputError}>Category required</Text>}

          <Text style={styles.cardSubtitle}>
            Choose a general category of your activity.
          </Text>
        </View>
      </View>
      <AddButton
        buttonLabel="Add This Activity"
        onPress={onSave}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: colors.cream,
  },

  formCard: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    borderColor: "lightgrey",
  },

  cardHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
  },

  cardSubtitle: {
    fontSize: 14,
    color: "#a5a5a5",
  },

  inputGroup: {
    paddingTop: 14,
  },

  inputHeaderContainer: {
    flexDirection: "row",
    gap: 12,
    paddingBottom: 8,
    alignItems: "center",
  },

  inputColorBall: {
    height: 10,
    width: 10,
    borderRadius: 10,
  },

  inputHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    // borderWidth: 1,
  },

  input: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "lightgrey",

    paddingHorizontal: 10,

    height: 40,
    fontSize: 18,
  },

  inputError: {
    textAlign: "right",
    color: "red",
    fontWeight: "500",
    fontSize: 14,
  },

  inputInvalid: {
    borderColor: "red",
    borderWidth: 2,
  },
});
