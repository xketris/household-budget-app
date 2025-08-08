import { View, Text, TextInput } from 'react-native'
import React from 'react'

const CustomInput = ({placeholder, secureTextEntry}: any) => {
  return (
    <TextInput className='text-[#888] text-xl px-6 py-5 font-bold bg-input w-full rounded-full' secureTextEntry={secureTextEntry} placeholderTextColor="#444" placeholder={placeholder}></TextInput>
  )
}

export default CustomInput