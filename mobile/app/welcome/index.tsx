import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '@/constants/icons'
import { Button } from '@react-navigation/elements'
import { Link, Redirect, useRouter } from 'expo-router'
import useAuth from '@/hooks/useAuth'

const HomePage = () => {
  const { isAuthenticated, newUser } = useAuth();

  if(isAuthenticated) {
    return <Redirect href={"/"} />
  } else if (!newUser) {
    return <Redirect href={"/auth/login"} />
  }

  return (
    <View className='bg-background flex-1 h-full w-full flex-col justify-center items-center px-16'>
      <Image source={icons.wallet} tintColor="#ffd600" />
      <View className='py-8 '>
        <Text className='text-4xl text-foreground font-bold text-center py-2'>Welcome to</Text>
        <Text className='text-6xl text-primary font-bold text-center'>Expense Tracker</Text>
      </View>
      <Text className='text-2xl text-center text-secondary pb-8'>Your personal assistant for simplifying expense tracking and managing your household budget with ease.</Text>
      <Link href={"/auth/login"} asChild>
        <TouchableOpacity className='bg-primary w-full py-5 rounded-full'>
          <Text className='text-background font-bold text-center text-2xl'>Get Started</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

export default HomePage