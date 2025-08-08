import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import CustomInput from '@/components/CustomInput'

const LoginPage = () => {

  return (
    <View className='bg-background flex-1 h-full w-full flex-col justify-center items-center px-16'>
        <Text className='text-foreground text-5xl font-bold pb-12'>Welcome Back</Text>
        <View className='flex-col w-full justify-around items-center gap-5'>
            <CustomInput placeholder="Login" />
            <CustomInput placeholder="Password" secureTextEntry={true} />
            <TouchableOpacity className='bg-primary w-full py-5 rounded-full'>
                <Text className='text-background font-bold text-center text-2xl'>Login</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default LoginPage