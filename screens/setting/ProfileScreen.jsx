import { View, Text } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ProfileScreen() {
  const {t}=useTranslation()
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  )
}