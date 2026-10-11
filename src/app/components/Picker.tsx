import { Button, StyleSheet, Text, View } from "react-native";

type PickerProp = {
  onPress?: () => void;
};

export default function Picker({ onPress }: PickerProp) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Picker</Text>
      <Button title="next" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // borderWidth: 1,
    // justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  text: {
    fontSize: 32,
  },
});
