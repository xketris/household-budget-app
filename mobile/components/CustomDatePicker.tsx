import { View, Text, TouchableOpacity, Image, Button } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { icons } from '@/constants/icons'
import moment from "moment"
import MonthYearScrollPicker from './MonthYearScrollPicker'

const CustomDatePicker = () => {
  const [date, setDate] = useState(moment())
  const [selection, setSelection] = useState({ month: 8, year: 2025 });

  return (
    <>
        <View className="flex-row justify-between items-center border-2 border-border rounded-3xl bg-input gap-5 w-64">
          <TouchableOpacity className='pl-6 py-4 rounded-l-3xl h-full' onPress={() => setDate(date => moment(date).subtract(1, "M"))}> 
            <Image className="size-3 rotate-90" source={icons.arrow} tintColor="#e0e0e0" resizeMode={'contain'} />
          </TouchableOpacity>
          <TouchableOpacity className='' onPress={() => console.log("EEE")}> 
            <Text className="text-foreground font-bold">{ moment(date).format("MMMM YYYY") }</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className='pr-6 py-4 rounded-r-3xl  h-full' onPress={() => setDate(date => moment(date).add(1, "M"))}> 
            <Image className="size-3 -rotate-90" source={icons.arrow} tintColor="#e0e0e0" resizeMode={'contain'} />
           </TouchableOpacity>
        </View>
        <View style={{ padding: 20 }}>
        <MonthYearScrollPicker
          value={selection}
          onChange={setSelection}
          minYear={2000}
          maxYear={2035}
          locale="en-US"
          monthFormat="short"
        />
        <Text style={{ marginTop: 16 }}>
          Selected: {selection.month}/{selection.year}
        </Text>
      </View>
    </>
    
  )
}

export default CustomDatePicker