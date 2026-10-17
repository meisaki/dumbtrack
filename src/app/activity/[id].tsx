import { Activity, deleteActivity, getSingleActivity } from "@/storage/storage";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function Id() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    // console.log(id);
    getSingleActivity(Number(id)).then(setActivity);
  }, [id]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: activity?.name }} />

      <View style={styles.card}>
        <Text style={styles.header}>{activity?.name}</Text>
        <Button
          title="delete"
          onPress={() => {
            Alert.alert(
              "Confirmation",
              `Are you sure you want to delete the  ${activity?.name}?`,
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Confirm",
                  style: "destructive",
                  onPress: async () => {
                    const name = activity?.name;
                    try {
                      await deleteActivity(Number(id));
                      router.back();
                      Alert.alert(`${name} has been deleted`);
                    } catch (err) {
                      Alert.alert(
                        `${name} could not be deleted. \n\nOnly activities that has not been tracked can be deleted.`
                      );
                    }
                  },
                },
              ]
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "grey",
    // borderWidth: 2,
  },

  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
  },
});
