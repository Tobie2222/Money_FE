import { View, Text, StatusBar, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AbstractCircle from '../../components/AbstractCircle'
import { ScrollView } from 'react-native-gesture-handler'
import { BarChart } from "react-native-gifted-charts"
import { useSelector } from 'react-redux'
import { getBalance } from '../../redux/accountSelector'
import { selectRefresh, selectTranThisMonth } from '../../redux/accountSlice'
import { selectToken, selectUser } from '../../redux/authSlice'
import { getAvgTranInYear, getSumTranInYear } from '../../data/Api'



export default function AnalysisScreen() {
    const user=useSelector(selectUser)
    const token=useSelector(selectToken)
    const refresh=useSelector(selectRefresh)
    const tranThisMonth=useSelector(selectTranThisMonth)
    const [valueTime, setValueTime] = useState("Thời gian")
    const balance=useSelector(getBalance)
    const [valueTimeIncome, setValueTimeIncome] = useState("Thời gian")
    const [valueTimeExpense, setValueTimeExpense] = useState("Thời gian")
    const [hiddenTime, setHiddenTime] = useState(false)
    const [hiddenTimeIncome, setHiddenTimeIncome] = useState(false)
    const [hiddenTimeExpense, setHiddenTimeExpense] = useState(false)
    const [sumMonthByYear,setSumMonthByYear]=useState([])
    const [avgMonthByYear,setAvgMonthByYear]=useState([])
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
    const formatData=(dataS,frontColor,typeData="")=>{
        return dataS.map((data,index)=>{
            return {
                value: typeData==="income"?data.averageIncome:data.averageExpense,
                label: `T${index+1}`,
                frontColor: frontColor
            }
        })
    }
        useEffect(() => {
            //spread All sum transactions by month by year
            const getSumTranByYear=async ()=>{
                try {
                    const date=new Date() 
                    const year = date.getFullYear().toString()
                    const response = await getSumTranInYear(year,user?.id, {
                        headers: {
                            token: `bearer ${token}`
                        }
                    })
                    if (response.status === 200) {
                        setSumMonthByYear(response.data.monthlyAverages)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
            //spread All avg transactions by month by year
            const getAvgTranByYear=async ()=>{
                try {
                    const date=new Date() 
                    const year = date.getFullYear().toString()
                    const response = await getAvgTranInYear(year,user?.id, {
                        headers: {
                            token: `bearer ${token}`
                        }
                    })
                    if (response.status === 200) {
                        setAvgMonthByYear(response.data.monthlyAverages)
                    }
                } catch (err) {
                    console.log(err)
                }
            }
            if (token) {
                getSumTranByYear()
                getAvgTranByYear()
            }
        }, [token, refresh])
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
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] ">Tổng thu nhập tháng này</Text>
                        <Text className="text-center text-clickButton  text-[18px] font-[600] leading-[27px]">{tranThisMonth.tranIncome.toLocaleString('vi-VN')} vnđ</Text>
                    </View>
                    <View className="flex-row items-center gap-[15px] mt-[0px]">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] ">Tổng chi tiêu tháng này</Text>
                        <Text className="text-center text-warningColor  text-[18px] font-[600] leading-[27px]">{tranThisMonth.tranExpense.toLocaleString('vi-VN')} vnđ</Text>
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
                    <View className="mt-[20px] bg-white py-[14px] px-[8px] rounded-[8px] shadow-sm z-[-1]">
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
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setHiddenTimeIncome(!hiddenTimeIncome)} className=" flex-row items-center gap-[5px] relative ">
                            <Text className="text-[#4B7BE5] font-[500] text-[15px] ">{valueTimeIncome}</Text>
                            <Icon name={"chevron-down"} size={18} color="#4B7BE5" />
                            {
                                hiddenTimeIncome && (
                                    <View className="absolute w-[100px] bg-[#f0eef1] rounded-[4px] top-[100%] px-[5px] z-50">
                                        <TouchableOpacity onPress={() => { setHiddenTimeIncome(false); setValueTimeIncome("Tháng này") }}><Text className="text-textColor font-[400] text-[14px] mt-[5px]">Tháng này</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={() => { setHiddenTimeIncome(false); setValueTimeIncome("Tháng trước") }}><Text className="text-textColor font-[400] text-[14px] my-[5px]">Tháng trước</Text></TouchableOpacity>
                                    </View>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                    <View className="mt-[20px] bg-white py-[14px] px-[8px] rounded-[8px] shadow-sm z-[-1]">
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
                            data={formatData(avgMonthByYear,"#22C55E","income")}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            hideRules={true}
                        />
                    </View>
                    <View className="flex-row items-center justify-between gap-[15px] mt-[10px]">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] ">Chi tiêu trung bình từng tháng</Text>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setHiddenTimeExpense(!hiddenTimeExpense)} className=" flex-row items-center gap-[5px] relative ">
                            <Text className="text-[#4B7BE5] font-[500] text-[15px] ">{valueTimeExpense}</Text>
                            <Icon name={"chevron-down"} size={18} color="#4B7BE5" />
                            {
                                hiddenTimeExpense && (
                                    <View className="absolute w-[100px] bg-[#f0eef1] rounded-[4px] top-[100%] px-[5px] z-50">
                                        <TouchableOpacity onPress={() => { setHiddenTimeExpense(false); setValueTimeExpense("Tháng này") }}><Text className="text-textColor font-[400] text-[14px] mt-[5px]">Tháng này</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={() => { setHiddenTimeExpense(false); setValueTimeExpense("Tháng trước") }}><Text className="text-textColor font-[400] text-[14px] my-[5px]">Tháng trước</Text></TouchableOpacity>
                                    </View>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                    <View className="my-[20px]  bg-white py-[14px] px-[8px] rounded-[8px] shadow-sm z-[-1]">
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
                            data={formatData(avgMonthByYear,"#EF4E4E","expense")}
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
