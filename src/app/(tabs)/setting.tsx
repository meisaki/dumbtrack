import { getActivities } from "@/storage/storage";
import { Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Setting() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Acitivity Page</Text>
      {/* <Button
        title="reset"
        onPress={async () => {
          await reset();
        }}
      /> */}
      <Button
        title="test"
        onPress={async () => {
          const acts = await getActivities();
          console.log(acts);
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
