import ActivityCard from "@/components/ActivityCard";
import Heading from "@/components/Heading";
import { getActivities, getRecords2 } from "@/storage/storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { DonutChart } from "react-native-chart-kit/v2";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  colors,
  getRecordStats,
  getTimeFormat,
  recordStats,
  sumElapsed,
} from "../../logic/logic";

/**
 * Problems:
 * 5) show 24 hour info & only tracked info as separate thing. (just dont push untracked into data )
 * 6) multiple entries of the same activity count as separate entries
 *  */

// placeholder: use different color once settled on color palette
const colorList = [
  "#aaa",
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
  const [selectedIndex, setSelectedIndex] = useState(-1);
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
        setData([untracked, ...newRows]); // add untracked first so it will alawys have same color
      })();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Heading
          header={"Your Daily Report"}
          subtitle="See how you spent your day"
        />
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
          centerLabel={
            <View style={styles.centerLabelContainer}>
              <Text style={styles.centerLabelHeading}>
                {data[selectedIndex]?.act_name ?? "Tap"}
              </Text>
              <Text style={styles.centerLabelTime}>
                {getTimeFormat(data[selectedIndex]?.elapsed, false)}
              </Text>
              <Text style={styles.centerLabelDate}>
                {new Date().toLocaleDateString()}
              </Text>
            </View>
          }
          activeSlice={{ inactiveOpacity: 0.8, strokeWidth: 2 }}
          width={winWidth * 0.9}
          height={400}
          theme={{ background: colors.cream }}
          innerRadiusRatio={0.6}
          sliceSeparator={{ width: 3 }}
          legend={false}
        />
        <View style={styles.breakdownContainer}>
          <Heading header={"Activity Breakdown"} size={20} />
          <View style={styles.cardContainer}>
            {data.slice(1).map((item, index) => {
              return (
                <ActivityCard
                  key={item.rec_id}
                  label={item.act_name}
                  colorBall={colorList[index + 1]}
                  subtitle={getTimeFormat(item.elapsed, false)}
                  highlight={selectedIndex === index + 1}
                  padding={8}
                />
              );
            })}
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>
              Total Tracked:{" "}
              {getTimeFormat(
                data.slice(1).reduce((total, row) => total + row.elapsed, 0),
                false
              )}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    padding: 15,
    // borderWidth: 10,
  },

  centerLabelContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  centerLabelHeading: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.text,
  },

  centerLabelTime: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    letterSpacing: 1,
  },

  centerLabelDate: {
    fontSize: 16,
    fontWeight: "500",
    color: "grey",
  },

  breakdownContainer: {
    paddingHorizontal: 12,
    gap: 7,
  },
  cardContainer: {
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: colors.sandcream,
    minHeight: 40,
    gap: 7,
  },
  singleLabelContainer: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "lightgrey",
    backgroundColor: "white",

    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  colorBall: {
    borderRadius: 10,
    height: 10,
    width: 10,
  },
  labelName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
  },
  labelTime: {
    fontSize: 14,
    fontWeight: "700",
    color: "grey",
  },

  totalRow: {
    alignItems: "flex-end",
    // marginTop: 10,
    paddingHorizontal: 6,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
});
