import { View, StyleSheet, Image, Text, StatusBar, ScrollView, TouchableOpacity, Modal } from 'react-native'
import { useTranslation } from 'react-i18next'
import Loading from '../../components/Loading'
import { Formik } from 'formik'
import * as Yup from 'yup'

export default function ProfileScreen() {
    const {t}=useTranslation()
    return (
        <View>
            <Text>ProfileScreen</Text>
        </View>
    )
}