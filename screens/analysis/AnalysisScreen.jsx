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
import CustomBarChart from '../../components/CustomBarChart'

const years=[
    "2022","2023","2024","2025","2026","2027"
]

export default function AnalysisScreen() {
    const user=useSelector(selectUser)
    const token=useSelector(selectToken)
    const refresh=useSelector(selectRefresh)
    const tranThisMonth=useSelector(selectTranThisMonth)
    const balance=useSelector(getBalance)
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [hiddenTime, setHiddenTime] = useState(false)
    const [sumMonthByYear,setSumMonthByYear]=useState([])
    const [avgMonthByYear,setAvgMonthByYear]=useState([])
    const { t } = useTranslation()
    console.log(user)
    const barData = sumMonthByYear.flatMap((data, index) => [
        {
            value: data.income,
            label: `T${data.month}`,
            spacing: 2,
            labelWidth: 25,
            labelTextStyle: { color: 'gray' },
            frontColor: '#22C55E'
        },
        {
            value: data.expense,
            frontColor: '#ED6665'
        }
    ])
    const formatData=(dataS,frontColor,typeData="")=>{
        return dataS.map((data,index)=>{
            return {
                value: typeData==="income"?data.averageIncome:data.averageExpense,
                label: `T${index+1}`,
                frontColor: frontColor,
                spacing: 23,
                labelWidth: 25,
                labelTextStyle: { color: 'gray' },
            }
        })
    }
    useEffect(() => {
        //spread All sum transactions by month by year
        const getSumTranByYear=async ()=>{
            try {
                const response = await getSumTranInYear(user?.slug_user,year,user?.id, {
                    headers: {
                        token: `bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    console.log(response.data)
                    setSumMonthByYear(response.data.monthlyAverages)
                }
            } catch (err) {
                console.log(err)
            }
        }
        //spread All avg transactions by month by year
        const getAvgTranByYear=async ()=>{
            try {
                const response = await getAvgTranInYear(user?.slug_user,year,user?.id, {
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
    }, [token, refresh,year])

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
                        <Text className="text-center text-clickButton  text-[18px] font-[600] leading-[27px]">{tranThisMonth.tranIncome.amount.toLocaleString('vi-VN')} vnđ</Text>
                    </View>
                    <View className="flex-row items-center gap-[15px] mt-[0px]">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] ">Tổng chi tiêu tháng này</Text>
                        <Text className="text-center text-warningColor  text-[18px] font-[600] leading-[27px]">{tranThisMonth.tranExpense.amount.toLocaleString('vi-VN')} vnđ</Text>
                    </View>
                    <View className="flex-row items-center justify-between gap-[15px] mt-[10px]">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] ">Tình hình thu chi</Text>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => setHiddenTime(!hiddenTime)} className=" flex-row items-center gap-[5px] relative ">
                            <Text className="text-[#4B7BE5] font-[500] text-[15px] ">Chọn năm</Text>
                            <Icon name={"chevron-down"} size={18} color="#4B7BE5" />
                            {
                                hiddenTime && (
                                    <View className="absolute w-[100px] bg-[#f0eef1] rounded-[4px] top-[100%] px-[5px] ">
                                        {
                                            years.map((year)=>{
                                                return (<TouchableOpacity key={year}  onPress={() => { setHiddenTime(false); setYear(year) }}><Text className="text-textColor font-[400] text-[14px] my-[5px]">{year}</Text></TouchableOpacity>)
                                            })
                                        }
                                    </View>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                    <View className="mt-[20px] bg-white py-[14px] px-[8px] rounded-[8px] shadow-sm z-[-1]">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] mb-[10px]">Thông tin thu chi từng tháng năm {year} </Text>
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
                        <CustomBarChart
                            data={barData}
                        />
                    </View>
                    <View className="flex-row items-center justify-between gap-[15px] mt-[10px]">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] ">Chi tiêu trung bình từng tháng của năm {year}</Text>
                    </View>
                    <View className="mt-[20px] bg-white py-[14px] px-[8px] rounded-[8px] shadow-sm z-[-1]">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] mb-[10px]">Thu nhập trung bình từng tháng</Text>
                        <View className="mb-[20px] w-full flex-row justify-center ">
                            <View className="flex-row items-center gap-[15px] ">
                                <View className="w-[15px] h-[15px] bg-[#22C55E] rounded-[100px]"></View>
                                <Text className="text-[#606C80]  text-[14px] font-[800] leading-[21px] ">Tiền thu</Text>
                            </View>
                        </View>
                        <CustomBarChart
                            data={formatData(avgMonthByYear,"#22C55E","income")}
                        />
                    </View>
                    <View className="flex-row items-center justify-between gap-[15px] mt-[10px]">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] ">Chi tiêu trung bình từng tháng của năm {year}</Text>
                    </View>
                    <View className="my-[20px]  bg-white py-[14px] px-[8px] rounded-[8px] shadow-sm z-[-1]">
                        <Text className="text-center text-textColor  text-[16px] font-[600] leading-[24px] mb-[10px]">Chi tiêu trung bình từng tháng</Text>
                        <View className="mb-[20px] w-full flex-row justify-center ">
                            <View className="flex-row items-center gap-[15px] ">
                                <View className="w-[15px] h-[15px] bg-warningColor rounded-[100px]"></View>
                                <Text className="text-[#606C80]  text-[14px] font-[800] leading-[21px] ">Tiền chi</Text>
                            </View>
                        </View>
                        <CustomBarChart
                            data={formatData(avgMonthByYear,"#EF4E4E","expense")}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
