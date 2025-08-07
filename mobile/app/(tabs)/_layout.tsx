import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";
import "../global.css";

const TabIcon = ({ focused, icon, title }: any) => {
  return (
    <ImageBackground className="flex flex-col w-full flex-1 min-w-[126px] min-h-16 justify-center items-center rounded-full overflow-hidden">
      <Image className="size-7" tintColor={focused ? "#ffd600" : "#ab9249"} source={icon}></Image>
      <Text className={`${focused ? "text-primary" : "text-secondary"} text-base font-semibold`}>{title}</Text>
    </ImageBackground>
  )
}

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarShowLabel: false,
      tabBarItemStyle: {
        width: "100%",
        height: "100%",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
      },
      tabBarStyle: {
        backgroundColor: "#121212",
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
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
