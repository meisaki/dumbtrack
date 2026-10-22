import { colors } from "@/logic/logic";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";

type ClockProp = {
  time: string;
  onPress: () => void;
  onPause?: () => void;
  onCancel?: () => void;
};

export default function Clock2({
  time,
  onPress,
  onPause,
  onCancel,
}: ClockProp) {
  const [hr, min, sec] = time.split(":");
  return (
    <View style={styles.container}>
      <View style={styles.clockContainer}>
        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>{hr}</Text>
          <Text style={styles.timeUnit}>HR</Text>
        </View>
        <Text style={styles.timeSeparator}>:</Text>
        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>{min}</Text>
          <Text style={styles.timeUnit}>MIN</Text>
        </View>
        <Text style={styles.timeSeparator}>:</Text>
        <View style={styles.timeBlock}>
          <Text style={styles.timeText}>{sec}</Text>
          <Text style={styles.timeUnit}>SEC</Text>
        </View>
      </View>

      <CustomButton
        onPress={onPress}
        buttonLabel={"Stop Tracking"}
        icon="□"
        bgColor={"#ff2200"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  clockContainer: {
    justifyContent: "space-evenly",
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 12,
    width: "100%",
    backgroundColor: colors.sandcream,
    paddingHorizontal: 12,
    paddingVertical: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  timeBlock: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 12,
    backgroundColor: "whitesmoke",
    alignItems: "center",
    padding: 12,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
  },
  timeText: {
    fontSize: 46,
    color: colors.orange,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  timeUnit: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  timeSeparator: {
    fontSize: 42,
    fontWeight: "600",
    color: colors.text,
    paddingBottom: 18,
    paddingHorizontal: 12,
  },
});
