import { colors } from "@/logic/logic";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ColorBall from "./ColorBall";

type inputGroup = {
  onChangeText: (text: string) => void;
  onEndEditing: () => void;
  header?: string;
  subtitle?: string;
  placeholder?: string;
  error: boolean;
  ballColor?: string;
  value: string;
  readOnly?: boolean;
};

export default function InputGroup({
  header = "",
  subtitle = "",
  error,
  placeholder = "",
  onChangeText,
  onEndEditing,
  ballColor = "",
  value,
  readOnly = false,
}: inputGroup) {
  return (
    <View style={styles.inputGroup}>
      {header && (
        <View style={styles.inputHeaderContainer}>
          <ColorBall color={ballColor} />
          <Text style={styles.inputHeader}>{header}</Text>
        </View>
      )}
      <TextInput
        readOnly={readOnly}
        style={[styles.input, error && styles.inputInvalid]}
        placeholder={placeholder}
        placeholderTextColor={"grey"}
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        value={value}
      />
      {error && <Text style={styles.inputError}>{header} required</Text>}

      {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    // paddingTop: 14,
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
  cardSubtitle: {
    fontSize: 14,
    color: "#a5a5a5",
  },
});
