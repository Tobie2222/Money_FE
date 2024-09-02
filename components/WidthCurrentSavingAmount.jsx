import { View } from "react-native"

export default WidthCurrentSavingAmount=({goal_amount=0,current_amount=0,styleParent,styleChildren})=>{
    const percentage = Math.min((current_amount / goal_amount) * 100, 100)
    return (
        <View className={`${styleParent} bg-borderColor rounded-[6px]`}>
            <View 
                className={`${styleChildren}  bg-clickButton rounded-[6px]`}
                style={{ width: `${percentage}%` }}
            >
            </View>
        </View>
    )
}
