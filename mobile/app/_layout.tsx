import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./global.css"
import SafeScreenArea from "@/components/SafeScreenArea";
import { Provider, useDispatch, useSelector } from "react-redux"
import { RootState, store } from "@/state/store"

export default function RootLayout() {
  return (
    <>
      <Provider  store={store}>
        <StatusBar hidden={true} />
        <SafeScreenArea>
          <Stack>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SafeScreenArea>
      </Provider>
    </>
  )
}
