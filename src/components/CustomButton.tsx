import { Pressable, StyleSheet, Text } from "react-native";

type addButtonProp = {
  onPress: () => void;
  buttonLabel: string;
  disabled?: boolean;
  bgColor: string;
  icon?: string;
};

export default function CustomButton({
  onPress,
  buttonLabel,
  disabled = false,
  bgColor,
  icon = "",
}: addButtonProp) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.addNewContainer,
        { backgroundColor: bgColor },
        pressed && { opacity: 0.8 },
        disabled && { opacity: 0.5 },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {icon && <Text style={styles.addNewPlus}>{icon}</Text>}
      <Text style={styles.addNewText}>{buttonLabel}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addNewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 16,
    padding: 16,

    marginTop: 16,
    borderRadius: 16,
  },

  addNewText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },

  addNewPlus: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
});
