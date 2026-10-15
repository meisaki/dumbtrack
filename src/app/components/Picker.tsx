import { ActivityGroup, getActivitiesByCategory } from "@/storage/storage";
import { useEffect, useState } from "react";
import { Button, SectionList, StyleSheet, Text, View } from "react-native";

type PickerProp = {
  onPress?: () => void;
  onPick: (id: number) => void;
};

export default function Picker({ onPress, onPick }: PickerProp) {
  const [groups, setGroups] = useState<ActivityGroup[]>([]);

  useEffect(() => {
    getActivitiesByCategory().then(setGroups);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Picker</Text>
      <Button title="next" onPress={onPress} />
      <SectionList
        sections={groups}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Button title={item.name} onPress={() => onPick(item.act_id)} />
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item) => `${item.act_id}`}
        ListFooterComponent={
          <View style={styles.card}>
            <Button title="add new" />
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
