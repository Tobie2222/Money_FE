import Toast from 'react-native-toast-message'

export const showToastU = ( message ,setBackgroundColor,nameIcon,duration) => {
    Toast.show({
        type: 'custom_toast',
        position: 'top',
        text1: message,
        autoHide: true,
        topOffset: 60,
        visibilityTime: duration,
        props: {
            setBackgroundColor: setBackgroundColor,
            nameIcon: nameIcon
        }
    })
}
