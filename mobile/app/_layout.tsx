import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./global.css"
import SafeScreenArea from "@/components/SafeScreenArea";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <SafeScreenArea>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeScreenArea>
    </>
  )
}
