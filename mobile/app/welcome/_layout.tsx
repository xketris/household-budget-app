import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "../global.css";
import SafeScreenArea from "@/components/SafeScreenArea";

export default function WelcomeLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <SafeScreenArea>
        <Stack screenOptions={{ headerShown: false }}></Stack>
      </SafeScreenArea>
    </>
  );
}
