import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Clock from "../../components/Clock";
import TimerButton from "../../components/TimerButton";
import { colors, getTimeFormat } from "../../logic/logic";

type States = "idle" | "running";

export default function Index() {
  const [state, setState] = useState<States>("idle");
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(getTimeFormat(0));

  // clock
  useEffect(() => {
    if (state !== "running") return;
    const id = setInterval(() => {
      const current = Date.now() - startTime;
      setElapsed(getTimeFormat(current));
    }, 50);
    return () => clearInterval(id);
  }, [state, startTime]);

  return (
    <SafeAreaView style={styles.container}>
      {state === "idle" && (
        <TimerButton
          onPress={() => {
            setStartTime(Date.now());
            setState("running");
          }}
        />
      )}

      {state === "running" && (
        <Clock
          time={elapsed}
          onPress={() => {
            const end = Date.now();

            router.push({
              pathname: "/activity/activitypicker",
              params: {
                startTime: startTime.toString(),
                endTime: end.toString(),
                elapsed: elapsed,
              },
            });

            setElapsed(getTimeFormat(0));
            setState("idle");
          }}
          onCancel={() => {
            setState("idle");
          }}
          onPause={() => {}}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cream,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
