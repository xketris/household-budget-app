import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import CustomInput from "@/components/CustomInput";
import useAuth from "@/hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { signIn } = useAuth();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await signIn({ email, password });
      if(res.user) {
        router.replace("/");
      }
      console.log(res);
    } catch (err: any) {
      console.log("ERR");
      setError(err?.message);
    }
  };

  return (
    <View className="bg-background flex-1 h-full w-full flex-col justify-center items-center px-16">
      <Text className="text-foreground text-5xl font-bold pb-12">
        Welcome Back
      </Text>
      <View className="flex-col w-full justify-around gap-5 pb-5">
        <CustomInput
          placeholder="Email"
          className="rounded-3xl"
          value={email}
          onChangeText={(newEmail: string) => setEmail(newEmail)}
        />
        <CustomInput
          placeholder="Password"
          className="rounded-3xl"
          value={password}
          secureTextEntry
          onChangeText={(newPassword: string) => setPassword(newPassword)}
        />
        <TouchableOpacity
          className="bg-primary w-full py-5 rounded-3xl"
          onPress={handleLogin}
          activeOpacity={1 }
        >
          <Text className="text-background font-bold text-center text-2xl">
            Login
          </Text>
        </TouchableOpacity>
        {error && (
          <Text className="text-[#e55] text-center text-sm font-bold">
            An Error Occurred: {error}
          </Text>
        )}
      </View>
      <TouchableOpacity
        className="flex-row gap-2"
        onPress={() => router.replace("/auth/register")}
      >
        <Text className="text-secondary text-center text-2xl">
          Don&apos;t have an account?
        </Text>
        <Text className="text-primary text-center text-2xl font-bold">
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;
