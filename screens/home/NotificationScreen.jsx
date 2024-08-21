import { View, Text } from 'react-native'

import { useTranslation } from 'react-i18next'

export default function NotificationScreen() {
    const {t}=useTranslation()
    return (
        <View>
            <Text>NotificationScreen</Text>
        </View>
    )
}