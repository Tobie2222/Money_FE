import { View} from 'react-native'
import React, { useRef,useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import BottomSheet from '@gorhom/bottom-sheet'

export default function BottomSheetCom({children,onCloseBottomSheet}) {
    const onCloseBottomSheetCom=onCloseBottomSheet || (()=>{})
    const { t } = useTranslation()
    const bottomSheetRef = useRef(null)
    const snapPoints = useMemo(() => ['25%'], [])
    return (
        <BottomSheet
        ref={bottomSheetRef}
        onChange={()=>{}}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={onCloseBottomSheetCom}
      >
        <View className="flex-1 ">
            {children}
        </View>
      </BottomSheet>
    )
}