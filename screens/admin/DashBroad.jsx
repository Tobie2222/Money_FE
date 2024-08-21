import { View, Text } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function DashBroad() {
  const {t}=useTranslation()
  return (
    <View>
      <Text>DashBroad</Text>
    </View>
  )
}