import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="stats" options={{ title: "Stats" }} />
      <Tabs.Screen name="index" options={{ title: "Track" }} />
      <Tabs.Screen name="setting" options={{ title: "Activity" }} />
    </Tabs>
  );
}
