import { colors } from "@/logic/logic";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ClockProp = {
  time: string;
  onPress?: () => void;
  onPause: () => void;
  onCancel: () => void;
};

export default function Clock({ time, onPress, onPause, onCancel }: ClockProp) {
  return (
    <View style={styles.container}>
      <View style={styles.clockContainer}>
        <View style={styles.clockScreen}>
          <Text style={styles.clockText}>{time.toString()}</Text>
          <Text style={styles.clockSubtitle}>HH : MM : SS . MS</Text>
        </View>
        {/* <View style={styles.clockButtonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.clockButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={onPause}
          >
            <Text style={styles.clockButtonText}>Pause</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.clockButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={onCancel}
          >
            <Text style={styles.clockButtonText}>Cancel</Text>
          </Pressable>
        </View> */}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.stopContainer,
          pressed && { opacity: 0.8 },
        ]}
        onPress={onPress}
      >
        <Text style={styles.stopText}>□ Stop Activity</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    width: "100%",
    alignItems: "center",
  },

  clockContainer: {
    // borderWidth: 1,
    borderRadius: 16,
    width: "100%",
    backgroundColor: colors.lightblue,
    padding: 16,

    marginBottom: 12,
    alignItems: "center",
    // paddingVertical: 30,
    // paddingHorizontal: 20,
  },

  clockScreen: {
    // borderWidth: 1,
    borderRadius: 16,
    width: "100%",
    backgroundColor: colors.darkblue,

    padding: 20,
    // paddingVertical: 24,
    // paddingHorizontal: 12,

    alignItems: "center",
    // justifyContent: "center",

    gap: 10,
  },

  clockText: {
    // borderWidth: 1,
    color: colors.orange,
    fontSize: 46,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
    letterSpacing: 2,
  },

  clockSubtitle: {
    color: colors.lightblue,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 2,
  },

  clockButtonContainer: {
    // borderWidth: 1,
    flexDirection: "row",
    width: "100%",
    marginTop: 12,
    // justifyContent: "space-between",
    gap: 12,
  },

  clockButton: {
    borderWidth: 1,
    flex: 1,
    alignItems: "center",
    borderRadius: 12,
    padding: 10,
    backgroundColor: colors.darkblue,
  },

  clockButtonText: {
    color: colors.orange,
    fontSize: 16,
    fontWeight: "700",
  },

  stopContainer: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: colors.orange,
    alignItems: "center",
    // paddingHorizontal: 24,
    paddingVertical: 12,
  },

  stopText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
});
