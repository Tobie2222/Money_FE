import i18n from "i18next"
import {initReactI18next} from "react-i18next"
import en from "../locales/en.json"
import vi from "../locales/vi.json"

const resources={
    en: {
        //name space
        translation: en
    },
    vi: {
        //name space
        translation: vi
    }
}

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    //default
    lng: 'en',
    fallbackLng: 'vi',
    interpolation: {
        escapeValue: false // react already safes from xss
    }
})
export default i18n