import { getRecords } from "@/storage/storage";
import { Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Setting() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Acitivity Page</Text>
      <Button
        title="test"
        onPress={() => {
          // getActivities().then((acts) => {
          //   console.log(acts);
          // });

          getRecords().then((recs) => {
            console.log(recs);
          });
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
