import { View, Text, StatusBar, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AbstractCircle from '../../components/AbstractCircle'
import { ScrollView } from 'react-native-gesture-handler'
import { BarChart } from "react-native-gifted-charts"
import { useSelector } from 'react-redux'
import { selectBalance } from '../../redux/accountSlice'



export default function AnalysisScreen() {
    const [valueTime, setValueTime] = useState("Thời gian")
    const balance=useSelector(selectBalance)
    const [valueTimeIncome, setValueTimeIncome] = useState("Thời gian")
    const [valueTimeExpense, setValueTimeExpense] = useState("Thời gian")
    const [hiddenTime, setHiddenTime] = useState(false)
    const { t } = useTranslation()
    const barData = [
        {
            value: 40,
            label: 'T1',
            spacing: 2,
            labelWidth: 15,
            labelTextStyle: { color: 'gray' },
            frontColor: '#22C55E',
        },
        { value: 20, frontColor: '#ED6665' },
        {
            value: 40,
            label: 'T2',
            spacing: 2,
            labelWidth: 16,
            labelTextStyle: { color: 'gray' },
            frontColor: '#22C55E',
        },
        { value: 20, frontColor: '#ED6665' },
        {
            value: 40,
            label: 'T3',
            spacing: 2,
            labelWidth: 17,
            labelTextStyle: { color: 'gray' },
            frontColor: '#22C55E',
        },
        { value: 20, frontColor: '#ED6665' },
        {
            value: 40,
            label: 'T4',
            spacing: 2,
            labelWidth: 15,
            labelTextStyle: { color: 'gray' },
            frontColor: '#22C55E',
        },
        { value: 20, frontColor: '#ED6665' },
        {
            value: 50,
            label: 'T5',
            spacing: 2,
            labelWidth: 18,
            labelTextStyle: { color: 'gray' },
            frontColor: '#22C55E',
        },
        { value: 40, frontColor: '#ED6665' },
        {
            value: 75,
            label: 'T6',
            spacing: 2,
            labelWidth: 16,
            labelTextStyle: { color: 'gray' },
            frontColor: '#22C55E',
        },
        { value: 25, frontColor: '#ED6665' },
        {
            value: 30,
            label: 'T7',
            spacing: 2,
            labelWidth: 15,
            labelTextStyle: { color: 'gray' },
            frontColor: '#22C55E',
        },
        { value: 20, frontColor: '#ED6665' },
        {
            value: 60,
            label: 'T8',
            spacing: 2,
            labelWidth: 17,
            labelTextStyle: { color: 'gray' },
            frontColor: '#22C55E',
        },
        { value: 40, frontColor: '#ED6665' },
        {
            value: 65,
            label: 'T9',
            spacing: 2,
            labelWidth: 16,
            labelTextStyle: { color: 'gray' },
            frontColor: '#22C55E',
        },
        { value: 30, frontColor: '#ED6665' },
        {
            value: 65,
            label: 'T10',
            spacing: 2,
            labelWidth: 23,
            labelTextStyle: { color: 'gray' },
            frontColor: '#22C55E',
        },
        { value: 30, frontColor: '#ED6665' },
        {
            value: 65,
            label: 'T11',
            spacing: 2,
            labelWidth: 20,
            labelTextStyle: { color: 'gray' },
            frontColor: '#22C55E',
        },
        { value: 30, frontColor: '#ED6665' },
        {
            value: 65,
            label: 'T12',
            spacing: 2,
            labelWidth: 22,
            labelTextStyle: { color: 'gray' },
            frontColor: '#22C55E',
        },
        { value: 30, frontColor: '#ED6665' },
    ]
    const dataIncome = [
        { value: 125, label: 'T1', frontColor: '#22C55E' },
        { value: 20, label: 'T2', frontColor: '#22C55E' },
        { value: 15, label: 'T3', frontColor: '#22C55E' },
        { value: 55, label: 'T4', frontColor: '#22C55E' },
        { value: 85, label: 'T5', frontColor: '#22C55E' },
        { value: 100, label: 'T6', frontColor: '#22C55E' },
        { value: 110, label: 'T7', frontColor: '#22C55E' },
        { value: 14, label: 'T8', frontColor: '#22C55E' },
        { value: 13, label: 'T9', frontColor: '#22C55E' },
        { value: 45, label: 'T10', frontColor: '#22C55E' },
        { value: 15, label: 'T11', frontColor: '#22C55E' },
        { value: 13, label: 'T12', frontColor: '#22C55E' },
    ]
    const dataExpense = [        
        { value: 125, label: 'T1', frontColor: '#EF4E4E' },
        { value: 20, label: 'T2', frontColor: '#EF4E4E' },
        { value: 15, label: 'T3', frontColor: '#EF4E4E' },
        { value: 55, label: 'T4', frontColor: '#EF4E4E' },
        { value: 85, label: 'T5', frontColor: '#EF4E4E' },
        { value: 100, label: 'T6', frontColor: '#EF4E4E' },
        { value: 110, label: 'T7', frontColor: '#EF4E4E' },
        { value: 14, label: 'T8', frontColor: '#EF4E4E' },
        { value: 13, label: 'T9', frontColor: '#EF4E4E' },
        { value: 45, label: 'T10', frontColor: '#EF4E4E' },
        { value: 15, label: 'T11', frontColor: '#EF4E4E' },
        { value: 13, label: 'T12', frontColor: '#EF4E4E' },]

    return (
        <View className="flex-1 ">
            <StatusBar
                barStyle="dark"
            />
            <AbstractCircle />
            <ScrollView>
                <Text className="mt-[80px] text-[22px] leading-[33px] font-[700] text-white text-center mb-[40px] ">Báo cáo</Text>
                <View className="w-full h-full bg-backGroundColor rounded-t-[36px] px-[20px] py-[25px]">
                    <View className="flex-row items-center gap-[15px]">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] ">Tổng số Tiền</Text>
                        <Text className="text-center text-[#1E1E1E]  text-[18px] font-[600] leading-[27px]">{balance.toLocaleString('vi-VN')} vnđ</Text>
                    </View>
                    <View className="flex-row items-center gap-[15px] mt-[0px]">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] ">Thu nhập trung thàng này</Text>
                        <Text className="text-center text-clickButton  text-[18px] font-[600] leading-[27px]">100.000.000 vnđ</Text>
                    </View>
                    <View className="flex-row items-center gap-[15px] mt-[0px]">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] ">Chi tiêu trung bình tháng này</Text>
                        <Text className="text-center text-warningColor  text-[18px] font-[600] leading-[27px]">100.000.000 vnđ</Text>
                    </View>
                    <View className="flex-row items-center justify-between gap-[15px] mt-[10px]">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] ">Tình hình thu chi</Text>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setHiddenTime(!hiddenTime)} className=" flex-row items-center gap-[5px] relative ">
                            <Text className="text-[#4B7BE5] font-[500] text-[15px] ">{valueTime}</Text>
                            <Icon name={"chevron-down"} size={18} color="#4B7BE5" />
                            {
                                hiddenTime && (
                                    <View className="absolute w-[100px] bg-[#f0eef1] rounded-[4px] top-[100%] px-[5px] ">
                                        <TouchableOpacity onPress={() => { setHiddenTime(false); setValueTime("Tháng này") }}><Text className="text-textColor font-[400] text-[14px] mt-[5px]">Tháng này</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={() => { setHiddenTime(false); setValueTime("Tháng trước") }}><Text className="text-textColor font-[400] text-[14px] my-[5px]">Tháng trước</Text></TouchableOpacity>
                                    </View>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                    <View className="mt-[20px] bg-white py-[14px] px-[8px] rounded-[8px] shadow-sm">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] mb-[10px]">Thông tin thu chi từng tháng năm 2024 </Text>
                        <View className="mb-[20px] w-full flex-row justify-center ">
                            <View className="flex-row items-center gap-[15px] ">
                                <View className="w-[15px] h-[15px] bg-[#22C55E] rounded-[100px]"></View>
                                <Text className="text-[#606C80]  text-[14px] font-[800] leading-[21px] ">Tiền thu</Text>
                            </View>
                            <View className="flex-row items-center gap-[15px] ml-[15px]">
                                <View className="w-[15px] h-[15px] bg-warningColor rounded-[100px]"></View>
                                <Text className="text-[#606C80]  text-[14px] font-[800] leading-[21px] ">Tiền chi</Text>
                            </View>
                        </View>
                        <BarChart
                            barWidth={8}
                            noOfSections={5}
                            barBorderRadius={4}
                            spacing={15}
                            frontColor="#666666"
                            data={barData}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            hideRules={true}
                        />
                    </View>
                    <View className="flex-row items-center justify-between gap-[15px] mt-[10px]">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] ">Chi tiêu trung bình từng tháng</Text>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setValueTimeIncome(!valueTimeIncome)} className=" flex-row items-center gap-[5px] relative ">
                            <Text className="text-[#4B7BE5] font-[500] text-[15px] ">{valueTime}</Text>
                            <Icon name={"chevron-down"} size={18} color="#4B7BE5" />
                            {
                                valueTimeIncome && (
                                    <View className="absolute w-[100px] bg-[#f0eef1] rounded-[4px] top-[100%] px-[5px] z-50">
                                        <TouchableOpacity onPress={() => { setValueTimeIncome(false); setValueTime("Tháng này") }}><Text className="text-textColor font-[400] text-[14px] mt-[5px]">Tháng này</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={() => { setValueTimeIncome(false); setValueTime("Tháng trước") }}><Text className="text-textColor font-[400] text-[14px] my-[5px]">Tháng trước</Text></TouchableOpacity>
                                    </View>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                    <View className="mt-[20px] bg-white py-[14px] px-[8px] rounded-[8px] shadow-sm">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] mb-[10px]">Thu nhập trung bình từng tháng</Text>
                        <View className="mb-[20px] w-full flex-row justify-center ">
                            <View className="flex-row items-center gap-[15px] ">
                                <View className="w-[15px] h-[15px] bg-[#22C55E] rounded-[100px]"></View>
                                <Text className="text-[#606C80]  text-[14px] font-[800] leading-[21px] ">Tiền thu</Text>
                            </View>
                        </View>
                        <BarChart
                            barWidth={8}
                            noOfSections={5}
                            barBorderRadius={4}
                            frontColor="#666666"
                            data={dataIncome}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            hideRules={true}
                        />
                    </View>
                    <View className="flex-row items-center justify-between gap-[15px] mt-[10px]">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] ">Chi tiêu trung bình từng tháng</Text>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setValueTimeIncome(!valueTimeIncome)} className=" flex-row items-center gap-[5px] relative ">
                            <Text className="text-[#4B7BE5] font-[500] text-[15px] ">{valueTime}</Text>
                            <Icon name={"chevron-down"} size={18} color="#4B7BE5" />
                            {
                                valueTimeIncome && (
                                    <View className="absolute w-[100px] bg-[#f0eef1] rounded-[4px] top-[100%] px-[5px] z-50">
                                        <TouchableOpacity onPress={() => { setValueTimeIncome(false); setValueTime("Tháng này") }}><Text className="text-textColor font-[400] text-[14px] mt-[5px]">Tháng này</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={() => { setValueTimeIncome(false); setValueTime("Tháng trước") }}><Text className="text-textColor font-[400] text-[14px] my-[5px]">Tháng trước</Text></TouchableOpacity>
                                    </View>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                    <View className="my-[20px]  bg-white py-[14px] px-[8px] rounded-[8px] shadow-sm">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] mb-[10px]">Chi tiêu trung bình từng tháng</Text>
                        <View className="mb-[20px] w-full flex-row justify-center ">
                            <View className="flex-row items-center gap-[15px] ">
                                <View className="w-[15px] h-[15px] bg-warningColor rounded-[100px]"></View>
                                <Text className="text-[#606C80]  text-[14px] font-[800] leading-[21px] ">Tiền chi</Text>
                            </View>
                        </View>
                        <BarChart
                            barWidth={8}
                            noOfSections={5}
                            barBorderRadius={4}
                            frontColor="#666666"
                            data={dataExpense}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            hideRules={true}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
