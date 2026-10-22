import CustomButton from "@/components/CustomButton";
import Heading from "@/components/Heading";
import InputGroup from "@/components/InputGroup";
import { colors } from "@/logic/logic";
import { saveActivity } from "@/storage/storage";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

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
      <Heading
        header="New Activity"
        subtitle="Add a new activity you want to track!"
      />
      <View style={styles.formCard}>
        <Heading
          header={"Add Detail"}
          subtitle="Give your activity a name and category."
          size={22}
        />
        <InputGroup
          header="Activity name"
          ballColor={colors.lightblue}
          subtitle="Choose a short name that describe your activity."
          placeholder={"Swimming"}
          error={nameError}
          value={actName}
          onChangeText={setActName}
          onEndEditing={() => setTouched({ name: true, cat: touched.cat })}
        />
        <InputGroup
          onChangeText={setActCat}
          onEndEditing={() => setTouched({ name: touched.name, cat: true })}
          placeholder={"Exercise"}
          error={catError}
          value={actCat}
          header="Category"
          subtitle="Choose a general category of your activity"
          ballColor={colors.orange}
        />
      </View>
      <CustomButton
        buttonLabel="Add Activity"
        onPress={() => router.push("/activity/newact")}
        bgColor={colors.darkblue}
        icon="⊕"
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
    marginTop: 12,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    borderColor: "lightgrey",

    gap: 6,
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
