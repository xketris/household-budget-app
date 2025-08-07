import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SafeScreenArea = ({ children }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View className={`pt-[${insets.top}px] flex-1 bg-background `} style={{ paddingTop: insets.top, flex: 1 }}>
      { children }
    </View>
  )
}

export default SafeScreenArea