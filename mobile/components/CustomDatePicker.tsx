import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { icons } from '@/constants/icons'
import MonthPicker from "react-native-month-year-picker"

const CustomDatePicker = () => {
     const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const showPicker = useCallback((value: any) => setShow(value), []);

    const onValueChange = useCallback(
        (event: any, newDate: any) => {
        const selectedDate = newDate || date;

        showPicker(false);
        setDate(selectedDate);
        },
        [date, showPicker],
    );

  return (
    <>
        <TouchableOpacity className="flex-row justify-center items-center px-6 py-4 border-2 border-border rounded-3xl bg-input gap-5">
            <Image className="size-3 rotate-90" source={icons.arrow} tintColor="#e0e0e0" resizeMode={'contain'} />
            <Text className="text-foreground font-bold">August 2025</Text>
            <Image className="size-3 -rotate-90" source={icons.arrow} tintColor="#e0e0e0" resizeMode={'contain'} />
        </TouchableOpacity>

         <TouchableOpacity onPress={() => showPicker(true)}>
            <Text>OPEN</Text>
        </TouchableOpacity>
        {show && (
            <MonthPicker
            onChange={onValueChange}
            value={date}
            minimumDate={new Date()}
            maximumDate={new Date(2025, 5)}
            locale="ko"
            />
        )}
    </>
    
  )
}

export default CustomDatePicker