import ActivityList from "@/components/ActivityList";
import { colors } from "@/logic/logic";
import {
  ActivityGroup,
  getActivitiesByCategory,
  saveRecord,
} from "@/storage/storage";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function activitypicker() {
  const [groups, setGroups] = useState<ActivityGroup[]>([]);

  const { startTime, endTime, elapsed } = useLocalSearchParams<{
    startTime: string;
    endTime: string;
    elapsed: string;
  }>();

  const start = Number(startTime);
  const end = Number(endTime);

  useFocusEffect(
    useCallback(() => {
      getActivitiesByCategory().then(setGroups);
    }, [])
  );

  return (
    <View style={styles.container}>
      <ActivityList
        data={groups}
        onItemPress={(item) => {
          Alert.alert(
            "Confirmation",
            `Activity Name: ${item.name}` +
              `\nTime Tracked:  ${elapsed}` +
              `\nDate Added: ${new Date().toLocaleDateString()}`,
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Add",
                style: "default",
                onPress: async () => {
                  await saveRecord(item.act_id, start, end);
                  router.back();
                },
              },
            ]
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    padding: 20,
  },
});
