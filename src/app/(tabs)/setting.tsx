import { ActivityGroup, getActivitiesByCategory } from "@/storage/storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, SectionList, StyleSheet, Text, View } from "react-native";

/*
 * Blogger — colourlovers.com
 * Palette by plamenj, 2007
 * https://www.colourlovers.com/palette/185999/Blogger
 * Colors named by Xpeder, jspencer, rrradio
 * Licence: CC-BY-NC-SA — http://creativecommons.org/licenses/by-nc-sa/3.0/
 */
const colors = {
  orange: "#FF6600",
  darkblue: "#104386",
  lightblue: "#6699FF",
  cream: "#F5EDE3",
  sandcream: "#E1D4C0",
  text: "#333333",
};

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
        ListHeaderComponent={
          <View style={styles.listHeaderContainer}>
            <Text style={styles.listHeaderText}>Activities</Text>
            <Text style={styles.listHeaderSubtitle}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              accusamus impedit tenetur.
            </Text>
          </View>
        }
        ListFooterComponent={
          <Pressable
            style={({ pressed }) => [
              styles.addNewContainer,
              pressed && { opacity: 0.8 },
            ]}
            onPress={(pressed) => router.push("/activity/newact")}
          >
            <Text style={styles.addNewPlus}>⊕</Text>
            <Text style={styles.addNewText}>Add New Activity</Text>
          </Pressable>
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

  listHeaderContainer: {
    marginBottom: 24,
  },

  listHeaderText: {
    fontSize: 34,
    fontWeight: "bold",
    color: colors.text,
  },

  listHeaderSubtitle: {
    fontSize: 16,
    color: "grey",
    lineHeight: 22,
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

  addNewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkblue,

    gap: 16,
    padding: 16,

    marginTop: 16,
    borderRadius: 16,
  },

  addNewText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },

  addNewPlus: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },

  separator: {
    height: 12,
  },
});
