import { setup } from "@/storage/storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  // get the storage ready
  useEffect(() => {
    setup()
      .then(() => setReady(true))
      .catch(console.error);
  }, []);

  if (!ready) return null;

  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="activity/newact" options={{ title: "Create New" }} />
      <Stack.Screen
        name="activity/activitypicker"
        options={{ title: "Choose an Acitivity" }}
      />
    </Stack>
  );
}
