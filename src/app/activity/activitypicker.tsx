import Confirmation from "@/components/Confirmation";
import {
  ActivityGroup,
  getActivitiesByCategory,
  saveRecord,
} from "@/storage/storage";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Button, SectionList, StyleSheet, Text, View } from "react-native";

export default function activitypicker() {
  const [visible, setVisible] = useState(false);
  const [groups, setGroups] = useState<ActivityGroup[]>([]);
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
      <SectionList
        sections={groups}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Button title={item.name} onPress={() => setVisible(true)} />
            <Confirmation
              result={end - start}
              act_name={item.name}
              visibility={visible}
              pressConfirm={async () => {
                await saveRecord(item.act_id, start, end);
                setVisible(false);
                router.back();
              }}
              pressCancel={() => setVisible(false)}
            />
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item) => `${item.act_id}`}
        ListFooterComponent={
          <View style={styles.card}>
            <Button
              title="add new"
              onPress={() => router.push("/activity/newact")}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    // gap: 30,
  },
  text: {
    fontSize: 32,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    fontSize: 18,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 10,
  },
});
