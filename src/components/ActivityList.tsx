import { colors } from "@/logic/logic";
import { ActivityGroup } from "@/storage/storage";
import { router } from "expo-router";
import { Pressable, SectionList, StyleSheet, Text, View } from "react-native";
import ActivityCard from "./ActivityCard";
import CustomButton from "./CustomButton";
import Heading from "./Heading";

type activityListProp = {
  data: ActivityGroup[];
  onItemPress: (item: { act_id: number; name: string }) => void;
};

export default function ActivityList({ data, onItemPress }: activityListProp) {
  return (
    <SectionList
      sections={data}
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
          onPress={() => onItemPress(item)}
          style={({ pressed }) => [pressed && { opacity: 0.8 }]}
        >
          <ActivityCard label={item.name} subtitle={"→"} padding={16} />
        </Pressable>
      )}
      ListHeaderComponent={
        <Heading
          header="Activities"
          subtitle="All your activies sorted by category"
        />
      }
      ListFooterComponent={
        <CustomButton
          buttonLabel="Create New Activity"
          onPress={() => router.push("/activity/newact")}
          bgColor={colors.darkblue}
          icon="⊕"
        />
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
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

  separator: {
    height: 12,
  },
});
