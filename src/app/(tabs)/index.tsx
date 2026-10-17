import { saveRecord } from "@/storage/storage";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Clock from "../../components/Clock";
import Confirmation from "../../components/Confirmation";
import Picker from "../../components/Picker";
import TimerButton from "../../components/TimerButton";
import { getTimeFormat } from "../../logic/logic";

type States = "idle" | "running" | "pick" | "done";

export default function Index() {
  const [state, setState] = useState<States>("idle");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [elapsed, setElapsed] = useState(getTimeFormat(0));
  const [pickedActID, setPickedActID] = useState(0);
  const [addRecord, setAddRecord] = useState(false);

  useEffect(() => {
    if (state !== "running") return;
    const id = setInterval(() => {
      const current = Date.now() - startTime;
      setElapsed(getTimeFormat(current));
    }, 50);
    return () => clearInterval(id);
  }, [state, startTime]);

  useEffect(() => {
    if (!addRecord) return;
    saveRecord(pickedActID, startTime, endTime).then(() => setAddRecord(false));
  }, [addRecord]);

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
      {state === "pick" && (
        <Picker
          onPress={() => setState("done")}
          onPick={(act_id) => {
            setPickedActID(act_id);
            setState("done");
          }}
        />
      )}
      {/* confirmation page */}
      {state === "done" && (
        <Confirmation
          res={getTimeFormat(endTime - startTime, false)}
          onPress={() => {
            setAddRecord(true);
            setState("idle");
            setElapsed(getTimeFormat(0));
          }}
          id={pickedActID}
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
