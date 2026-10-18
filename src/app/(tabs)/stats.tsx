import { getActivities, getRecords2 } from "@/storage/storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { DonutChart } from "react-native-chart-kit/v2";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getRecordStats,
  getTimeFormat,
  recordStats,
  sumElapsed,
} from "../../logic/logic";

/**
 * Problems:
 * 5) show 24 hour info & only tracked info as separate thing. (just dont push untracked into data )
 * 6) multiple entries of the same activity count as separate entries
 * 7) with enough etnries, not all legeneds will be displayed - use scrollable view separately
 * 8) set preset colors based on color palette
 */

// placeholder: use different color once settled on color palette
const colorList = [
  "#3CB44B",
  "#4363D8",
  "#F58231",
  "#911EB4",
  "#42D4F4",
  "#F032E6",
  "#BFEF45",
  "#FABED4",
  "#E6194B",
];

export default function Stats() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setData] = useState<recordStats[]>([]);
  const { width: winWidth, height: winHeight } = useWindowDimensions();

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
        colors={colorList}
        selectedIndex={selectedIndex}
        interaction={{
          mode: "tap",
          onSelect: (event) => setSelectedIndex(event.index),
        }}
        // data[selectedIndex]? return undefined if indexing fails, ?? fallback on undefined
        centerLabel={data[selectedIndex]?.act_name ?? "Tap"}
        activeSlice={{ inactiveOpacity: 0.8, strokeWidth: 2 }}
        width={winWidth * 0.97}
        height={winHeight * 0.6}
        theme={{ background: "#f2f2f2" }}
        innerRadiusRatio={0.5}
        sliceSeparator={{ width: 3 }}
        legend={{
          itemGap: 3,
          maxItemWidth: "100%",
          reservedHeight: winHeight * 0.15,
          renderItem: ({ item }) => (
            <View style={styles.labelContainer}>
              <View
                style={[{ backgroundColor: item.color }, styles.colorBall]} // circular color key: bgcolor sets the color of activity
              />
              <Text numberOfLines={1} style={[styles.labelName]}>
                {item.label}
              </Text>
              <Text style={styles.labelPercentage}>
                {getTimeFormat(data[item.index].elapsed, false)}
              </Text>
            </View>
          ),
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  labelName: {
    // borderWidth: 1,
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
  },
  labelPercentage: {
    fontSize: 13,
    fontWeight: "700",
    color: "grey",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    // width: "100%",
    width: 300,
    // borderWidth: 1,
  },
  colorBall: {
    borderRadius: 10,
    height: 10,
    width: 10,
  },
});
