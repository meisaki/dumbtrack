import AddButton from "@/components/AddButton";
import Heading from "@/components/Heading";
import { colors } from "@/logic/logic";
import { ActivityGroup, getActivitiesByCategory } from "@/storage/storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, SectionList, StyleSheet, Text, View } from "react-native";

export default function Setting() {
  const [groups, setGroups] = useState<ActivityGroup[]>([]);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setLoaded(false);
      getActivitiesByCategory()
        .then(setGroups)
        .then(() => {
          setLoaded(true);
        });
    }, [])
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={groups}
        keyExtractor={(item) => `${item.act_id}`}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeaderContainer}>
            <View style={styles.sectionHeaderComponent} />
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              router.push(`/activity/${item.act_id}`);
            }}
            style={({ pressed }) => [
              styles.listItemContainer,
              pressed && { opacity: 0.8 },
            ]}
          >
            <Text numberOfLines={1} style={styles.listItemText}>
              {item.name}
            </Text>

            <Text style={styles.listItemArrow}>→</Text>
          </Pressable>
        )}
        ListHeaderComponent={<Heading header="Activities" />}
        ListFooterComponent={
          <AddButton
            buttonLabel="Create New Activity"
            onPress={() => router.push("/activity/newact")}
          />
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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

  sectionHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
  },

  sectionHeaderComponent: {
    backgroundColor: colors.orange,
    width: 10,
    height: 10,
    borderRadius: 999,
  },

  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },

  listItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "white",

    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 16,

    padding: 16,
  },

  listItemText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
  },

  listItemArrow: {
    color: "lightgrey",
    fontWeight: "800",
    fontSize: 24,
  },

  text: {
    textAlign: "center",
    fontSize: 20,
    color: colors.text,
    fontWeight: "500",
  },

  separator: {
    height: 12,
  },
});
