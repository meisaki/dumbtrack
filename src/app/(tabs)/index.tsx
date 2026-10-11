import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Clock from "../components/Clock";
import Picker from "../components/Picker";
import Reset from "../components/Reset";
import TimerButton from "../components/TimerButton";

type States = "idle" | "running" | "pick" | "done";

const getTimeFormat = (s: number, miliSec = true) => {
  const inSec = Math.floor(s / 1000);

  const hr = Math.floor(inSec / 3600);
  const min = Math.floor((inSec % 3600) / 60);
  const sec = inSec % 60;
  const ms = Math.floor((s % 1000) / 10);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    `${pad(hr)}:${pad(min)}:${pad(sec)}` + `${miliSec ? "." + pad(ms) : ""}`
  );
};

export default function Index() {
  const [state, setState] = useState<States>("idle");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [elapsed, setElapsed] = useState(getTimeFormat(0));

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
            setEndTime(Date.now());
            setState("pick");
          }}
        />
      )}
      {state === "pick" && <Picker onPress={() => setState("done")} />}
      {state === "done" && (
        <Reset
          res={getTimeFormat(endTime - startTime, false)}
          onPress={() => {
            setState("idle");
            // setStartTime(0);
            // setEndTime(0);
            setElapsed(getTimeFormat(0));
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
