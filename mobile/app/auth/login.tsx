import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import CustomInput from '@/components/CustomInput'
import { login } from '@/service/auth'

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    setError(false);
    try {
      const response = await login({ email, password });
      console.log(response?.data)
    } catch(err) {
      console.log("ERR")
      setError(true);
    }
  }

  return (
    <View className='bg-background flex-1 h-full w-full flex-col justify-center items-center px-16'>
        <Text className='text-foreground text-5xl font-bold pb-12'>Welcome Back</Text>
        <View className='flex-col w-full justify-around gap-5'>
            { error && <Text className='text-foreground text-2xl font-bold'>An Error Occurred</Text> }
            <CustomInput placeholder="Email" className="rounded-3xl" value={email} onChangeText={(newEmail: string) => setEmail(newEmail)} />
            <CustomInput placeholder="Password" className="rounded-3xl" value={password} secureTextEntry onChangeText={(newPassword: string) => setPassword(newPassword)}  />
            <TouchableOpacity className='bg-primary w-full py-5 rounded-3xl' onPress={handleLogin}>
                <Text className='text-background font-bold text-center text-2xl'>Login</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default LoginPage