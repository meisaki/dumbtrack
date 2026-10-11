import { Pressable, StyleSheet, Text, View } from "react-native";

type TimerProp = {
  onPress?: () => void;
};

export default function TimerButton({ onPress }: TimerProp) {
  return (
    <View>
      <Pressable style={styles.container} onPress={onPress}>
        <Text style={styles.timerText}>Timer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",

    borderWidth: 2,
    borderColor: "black",
    borderRadius: 999,

    width: 200,
    height: 200,

    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    color: "white",
    fontSize: 32,
  },
});
