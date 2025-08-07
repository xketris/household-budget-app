import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";
import "../global.css";

const TabIcon = ({ focused, icon, title }: any) => {
  return (
    <View className="flex flex-col w-full flex-1 min-w-[126px] min-h-14 justify-center items-center size-full justify-center items-center mt-8 rounded-full">
      <Image className="size-7" tintColor={focused ? "#ffd600" : "#ab9249"} source={icon}></Image>
      <Text className={`${focused ? "text-primary" : "text-secondary"} text-base font-semibold`}>{title}</Text>
    </View>
  )
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarShowLabel: false, 
      tabBarItemStyle: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
      },
      tabBarStyle: {
        backgroundColor: "#121212",
        height: 82,
        position: "absolute",
        overflow: "hidden",
      }
    }}>
      <Tabs.Screen name="index" options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} icon={icons.home} title="Home" />
        )
      }} />
      <Tabs.Screen name="expenses" options={{
        title: "Expenses",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} icon={icons.transaction} title="Expenses" />
        )
      }} />
      <Tabs.Screen name="reports" options={{
        title: "Reports",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View>
            <TabIcon focused={focused} icon={icons.report} title="Reports" />
          </View>
        )
      }} />
      <Tabs.Screen name="profile" options={{
        title: "Profile",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} icon={icons.profile} title="Profile" />
        )
      }} />
    </Tabs>
  );
}
