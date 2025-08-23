import CustomDatePicker from "@/components/CustomDatePicker";
import { icons } from "@/constants/icons";
import useAuth from "@/hooks/useAuth";
import { add } from "@/state/expenses/expensesSlice";
import { RootState } from "@/state/store";
import { useRouter } from "expo-router";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";


export default function HomePage() {
  const { signOut } = useAuth();
  const router = useRouter();
  
  const expenses = useSelector((state: RootState) => state.expenses.expenses);

  const dispatch = useDispatch();

  const addExpense = () => dispatch(add({ id: new Date().getTime()}))

  const mappedExpenses = () => expenses.map((value, index: number) => <Text key={value.id} className="text-foreground text-3xl">{value.id}</Text>)

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/auth/login");
    } catch (err: any) {
      console.log("ERR");
    }
  };

  return (
    <View
      className="bg-background h-full items-center"
    >
      <View className="h-24 w-full flex-row justify-between border-b-2 border-border px-5 items-center">

        <TouchableOpacity className="flex-row justify-center items-center px-6 py-4 border-2 border-border rounded-3xl bg-input gap-5">
          <Text className="text-foreground font-bold">My Household</Text>
          <Image className="size-3" source={icons.arrow} tintColor="#e0e0e0" resizeMode={'contain'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Image source={icons.settings} tintColor="#ab9249" className="size-8" resizeMode={'contain'} />
        </TouchableOpacity>

      </View>
      <View className="py-4">
        <CustomDatePicker />
        <Button onPress={() => addExpense()} title="Add Expense" />
        {expenses.length ? mappedExpenses() : <Text>No expenses to display</Text>}
        <Text className="text-white"> Len: {expenses.length}</Text>
      </View>
    </View>
  );
}
