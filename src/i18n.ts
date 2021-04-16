import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import common_en from './translations/en/common.json'
import common_fr from './translations/fr/common.json'
// https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-react-app-with-react-i18next
const resources = {
  en: common_en,
  fr: common_fr,
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    keySeparator: '.',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
