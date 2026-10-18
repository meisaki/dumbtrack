import { colors } from "@/logic/logic";
import { StyleSheet, Text, View } from "react-native";

type headingProp = {
  header: string;
  subtitle?: string;
};

export default function Heading({
  header,
  subtitle = "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
}: headingProp) {
  return (
    <View style={styles.listHeaderContainer}>
      <Text style={styles.listHeaderText}>{header}</Text>
      <Text style={styles.listHeaderSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listHeaderContainer: {
    marginBottom: 24,
  },

  listHeaderText: {
    fontSize: 34,
    fontWeight: "bold",
    color: colors.text,
  },

  listHeaderSubtitle: {
    fontSize: 16,
    color: "grey",
    lineHeight: 22,
  },
});
