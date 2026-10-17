import { Pressable, StyleSheet, Text, View } from "react-native";

type ClockProp = {
  time: string;
  onPress?: () => void;
};

export default function Clock({ time, onPress }: ClockProp) {
  return (
    <View style={styles.container}>
      <View style={styles.clockContainer}>
        <Text style={styles.clockText}>{time.toString()}</Text>
      </View>
      <Pressable style={styles.stopContainer} onPress={onPress}>
        <Text style={styles.clockText}>Stop</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  clockContainer: {
    borderWidth: 1,
    backgroundColor: "grey",

    width: 400,
    height: 400,
    marginBottom: 10,

    alignItems: "center",
    padding: 40,
    justifyContent: "center",
  },
  clockText: {
    color: "whitesmoke",
    fontSize: 32,
    fontVariant: ["tabular-nums"],
  },
  stopContainer: {
    borderWidth: 1,
    borderRadius: 80,
    backgroundColor: "grey",

    width: 300,
    height: 100,

    alignItems: "center",
    justifyContent: "center",
  },
});
