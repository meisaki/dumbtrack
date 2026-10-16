import { getRecords2, getSingleActivity } from "@/storage/storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { DonutChart } from "react-native-chart-kit/v2";
import { SafeAreaView } from "react-native-safe-area-context";
import { addElapsed, recordElapsed, sumElapsed } from "../../logic/logic";

/**
 * Problems:
 * 1) no way to separate the records between dates. records cannot be gotten based on what was done in a day - done
 * 2) records do not contain info on elapsed time (must be done after receiving data back) - done
 * 3) records only contain activities, and chart does not display non-tracked hours - done
 * 4) 24 hours take too big of space if tracked hours are low - bug not a feature?
 */

export default function Stats() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setData] = useState<recordElapsed[]>([]);
  const [name, setName] = useState("Tap"); // default message

  useFocusEffect(
    useCallback(() => {
      const now = new Date();
      const dayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      ).getTime();
      const dayEnd = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1 // use + 1 to add exactly a day
      ).getTime();

      getRecords2(dayStart, dayEnd).then((rows) => {
        const newRows = addElapsed(rows, dayStart, dayEnd);
        const untracked = {
          activity_id: -1,
          end_time: -1,
          rec_id: -1,
          start_time: -1,
          // use dayEnd - dayStart instead of 24*60*60*1000 to avoid time change errors
          elapsed: Math.max(0, dayEnd - dayStart - sumElapsed(newRows)),
        };
        setData([...newRows, untracked]);
      });
    }, [])
  );

  useEffect(() => {
    if (data.length === 0) return;
    const id = data[selectedIndex].activity_id;

    if (id === -1) setName("Untracked");
    else getSingleActivity(id).then(setName);
  }, [selectedIndex]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Daily Activity</Text>
      <DonutChart
        data={data}
        valueKey="elapsed"
        labelKey="activity_id"
        selectedIndex={selectedIndex}
        interaction={{
          mode: "tap",
          onSelect: (event) => setSelectedIndex(event.index),
        }}
        centerLabel={name}
        activeSlice={{ inactiveOpacity: 0.8, strokeWidth: 2 }}
        width={400}
        height={460}
        theme={{ background: "whitesmoke" }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
    // backgroundColor: "white",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
