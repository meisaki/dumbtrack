import ActivityList from "@/components/ActivityList";
import { colors } from "@/logic/logic";
import { ActivityGroup, getActivitiesByCategory } from "@/storage/storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Setting() {
  const [groups, setGroups] = useState<ActivityGroup[]>([]);
  // const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // setLoaded(false);
      getActivitiesByCategory()
        .then(setGroups)
        .then(() => {
          // setLoaded(true);
        });
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ActivityList
        data={groups}
        onItemPress={(item) => router.push(`../activity/${item.act_id}`)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    padding: 20,
  },
});
