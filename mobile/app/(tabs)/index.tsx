import CustomDatePicker from "@/components/CustomDatePicker";
import { icons } from "@/constants/icons";
import { Image, Text, TouchableOpacity, View } from "react-native";


export default function HomePage() {
  return (
    <View
      className="bg-background h-full items-center"
    >
      <View className="h-24 w-full flex-row justify-between border-b-2 border-border px-5 items-center">

        <TouchableOpacity className="flex-row justify-center items-center px-6 py-4 border-2 border-border rounded-3xl bg-input gap-5">
          <Text className="text-foreground font-bold">My Household</Text>
          <Image className="size-3" source={icons.arrow} tintColor="#e0e0e0" resizeMode={'contain'} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={icons.settings} tintColor="#ab9249" className="size-8" resizeMode={'contain'} />
        </TouchableOpacity>

      </View>
      <View className="py-4">
        <CustomDatePicker />
        <Text>A</Text>
      </View>
    </View>
  );
}
