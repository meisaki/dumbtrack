import ActivityList from "@/components/ActivityList";
import Confirmation from "@/components/Confirmation";
import { colors } from "@/logic/logic";
import {
  ActivityGroup,
  getActivitiesByCategory,
  saveRecord,
} from "@/storage/storage";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function activitypicker() {
  const [groups, setGroups] = useState<ActivityGroup[]>([]);

  // store the item selected from the list
  const [selected, setSelected] = useState<{
    act_id: number;
    name: string;
  } | null>(null);

  const { startTime, endTime } = useLocalSearchParams<{
    startTime: string;
    endTime: string;
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
      <ActivityList data={groups} onItemPress={setSelected} />
      {selected && (
        <Confirmation
          result={end - start}
          act_name={selected.name}
          visibility={true}
          pressConfirm={async () => {
            await saveRecord(selected.act_id, start, end);
            setSelected(null);
            router.back();
          }}
          pressCancel={() => setSelected(null)}
        />
      )}
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
