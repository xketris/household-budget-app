import { View, Text, TextInput } from 'react-native'
import React from 'react'

const CustomInput = ({placeholder, secureTextEntry, className}: any) => {
  return (
    <TextInput className={`text-[#888] text-xl px-6 py-5 font-bold bg-input rounded-3xl ${className}`} secureTextEntry={secureTextEntry} placeholderTextColor="#444" placeholder={placeholder}></TextInput>
  )
}

export default CustomInput