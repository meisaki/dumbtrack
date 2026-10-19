import { Button, Modal, StyleSheet, Text, View } from "react-native";

type confirmProp = {
  pressConfirm: () => void;
  pressCancel: () => void;
  result: string;
  act_name: string;
  visibility: boolean;
};
export default function Confirmation2({
  pressConfirm,
  pressCancel,
  result,
  act_name,
  visibility,
}: confirmProp) {
  return (
    <Modal
      visible={visibility}
      animationType="slide"
      presentationStyle="formSheet"
    >
      <View style={styles.modalContainer}>
        <Text style={styles.textHeader}>TRACKED:</Text>
        <Text numberOfLines={1} style={styles.text}>
          {result}
        </Text>
        <Text style={styles.text}>{act_name}</Text>
        <Text style={styles.text}>{new Date().toLocaleDateString()}</Text>
        <View style={styles.sideway}>
          <Button title="cancel" onPress={pressCancel} />
          <Button title="confirm" onPress={pressConfirm} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    borderWidth: 3,
    // justifyContent: "flex",
    alignItems: "center",
    paddingTop: 100,
  },
  sideway: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 58,
    color: "grey",
    fontWeight: "500",
  },
  textHeader: {
    fontSize: 60,
    fontWeight: "600",
  },
});
