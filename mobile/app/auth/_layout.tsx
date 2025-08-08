import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "../global.css";
import SafeScreenArea from "@/components/SafeScreenArea";

export default function AuthLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <SafeScreenArea>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
      </SafeScreenArea>
    </>
  );
}
