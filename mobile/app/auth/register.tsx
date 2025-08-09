import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomInput from '@/components/CustomInput'

const RegisterPage = () => {
  return (
    <View className='bg-background flex-1 h-full w-full flex-col justify-center items-center px-16'>
        <Text className='text-foreground text-5xl font-bold pb-12'>Create Account</Text>
        <View className='flex-col w-full justify-around gap-5'>
            <View className='flex-row space-x-2'>
                <CustomInput placeholder="First Name" className="flex-1 mr-3" />
                <CustomInput placeholder="Last Name" className="flex-1 ml-3" />
            </View>
            <CustomInput placeholder="Email" />
            <CustomInput placeholder="Password" secureTextEntry />
            <CustomInput placeholder="Repeat Password" secureTextEntry />
            <TouchableOpacity className='bg-primary py-5 rounded-3xl'>
                <Text className='text-background font-bold text-center text-2xl'>Login</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default RegisterPage