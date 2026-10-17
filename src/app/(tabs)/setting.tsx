import { ActivityGroup, getActivitiesByCategory } from "@/storage/storage";
import { Link, router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Button, SectionList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Setting() {
  const [groups, setGroups] = useState<ActivityGroup[]>([]);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getActivitiesByCategory()
        .then(setGroups)
        .then(() => {
          setLoaded(true);
        });
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      {loaded && (
        <SectionList
          sections={groups}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Link href={`/activity/${item.name}`} style={styles.text}>
                {item.name}
              </Link>
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
  card: {
    // textAlign: "center",
    // fontSize: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
  sectionHeader: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
