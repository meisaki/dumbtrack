import ColorBall from "@/components/ColorBall";
import CustomButton from "@/components/CustomButton";
import Heading from "@/components/Heading";
import InputGroup from "@/components/InputGroup";
import { colors, getTimeFormat } from "@/logic/logic";
import {
  Activity,
  deleteActivity,
  getActivityInfo,
  getSingleActivity,
} from "@/storage/storage";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const activityDelete = (name: string, id: number) =>
  Alert.alert("Confirmation", `Are you sure you want to delete the  ${name}?`, [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "Confirm",
      style: "destructive",
      onPress: async () => {
        try {
          await deleteActivity(id);
          router.back();
          Alert.alert(`${name} has been deleted`);
        } catch (err) {
          Alert.alert(
            `${name} could not be deleted. \n\nOnly activities that has not been tracked can be deleted.`
          );
        }
      },
    },
  ]);

export default function Id() {
  const { id, name } = useLocalSearchParams<{
    id: string;
    name: string;
  }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [countTime, setCountTime] = useState<{
    counts: number;
    totalTime: number;
  }>();

  useEffect(() => {
    // console.log(id);
    getSingleActivity(Number(id)).then(setActivity);
    getActivityInfo(Number(id)).then(setCountTime);
  }, [id]);
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: name }} />
      <Heading
        header={name}
        subtitle={"Lorem ipsum dolor sit amet consectetur, adipisicing elit."}
      />
      <View style={styles.formCard}>
        <Heading header={"Activity Detail"} size={22} />
        <InputGroup
          onChangeText={() => {}}
          onEndEditing={() => {}}
          error={false}
          header="Activity name"
          ballColor={colors.lightblue}
          value={name}
          readOnly={true}
        />

        <InputGroup
          onChangeText={() => {}}
          onEndEditing={() => {}}
          error={false}
          header="Category"
          ballColor={colors.orange}
          value={activity?.category ?? ""}
          readOnly={true}
        />

        <View style={{ gap: 4 }}>
          <View style={styles.infoContainer}>
            <ColorBall color="black" />
            <Text style={styles.infoText}>Number of times tracked:</Text>
            <Text style={[styles.infoText, { flex: 0 }]}>
              {countTime?.counts}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <ColorBall color="green" />
            <Text style={styles.infoText}>Total time tracked:{" \t"}</Text>
            <Text style={[styles.infoText, { flex: 0 }]}>
              {getTimeFormat(countTime?.totalTime ?? 0, false)}
            </Text>
          </View>
        </View>
      </View>
      <CustomButton
        onPress={() => activityDelete(name, Number(id))}
        buttonLabel={"DELETE ACTIVITY"}
        bgColor={"red"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
    padding: 18,
  },

  deleteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",

    gap: 16,
    padding: 16,

    marginTop: 16,
    borderRadius: 16,
  },
  deleteText: {
    fontSize: 24,
    color: "white",
  },

  formCard: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    borderColor: "lightgrey",
    gap: 8,
  },

  infoContainer: {
    flexDirection: "row",
    gap: 12,
    paddingBottom: 8,
    alignItems: "center",
  },

  infoText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    flex: 1,
  },
});
