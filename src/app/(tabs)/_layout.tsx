import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="stats"
        options={{ title: "Stats", headerShown: true }}
      />
      <Tabs.Screen
        name="index"
        options={{ title: "Track", headerShown: false }}
      />
      <Tabs.Screen
        name="setting"
        options={{ title: "Activity", headerShown: true }}
      />
    </Tabs>
  );
}
