import { getActivities, getRecords2 } from "@/storage/storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { DonutChart } from "react-native-chart-kit/v2";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRecordStats, recordStats, sumElapsed } from "../../logic/logic";

/**
 * Problems:
 * 4) 24 hours take too big of space if tracked hours are low - feature not a bug?
 * 5) show 24 hour info & only tracked info
 * 6) multiple entries of the same activity count as separate entries
 */

export default function Stats() {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [data, setData] = useState<recordStats[]>([]);

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

      (async () => {
        const rows = await getRecords2(dayStart, dayEnd);
        const activities = await getActivities();
        const newRows = getRecordStats(rows, dayStart, dayEnd, activities);

        const untracked = {
          activity_id: -1,
          end_time: -1,
          rec_id: -1,
          start_time: -1,
          // use dayEnd - dayStart instead of 24*60*60*1000 to avoid time change errors
          elapsed: Math.max(0, dayEnd - dayStart - sumElapsed(newRows)),
          act_name: "Untracked",
        };
        setData([...newRows, untracked]);
      })();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Daily Activity</Text>
      <DonutChart
        data={data}
        valueKey="elapsed"
        labelKey="act_name"
        selectedIndex={selectedIndex}
        interaction={{
          mode: "tap",
          onSelect: (event) => setSelectedIndex(event.index),
        }}
        // data[selectedIndex]? return undefined if indexing fails, ?? fallback on undefined
        centerLabel={data[selectedIndex]?.act_name ?? "Tap"}
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
