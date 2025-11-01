import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translational.json';
import translationSI from './locales/si/translational.json';

const resources = {
  en: {
    translation: translationEN
  },
  si: {
    translation: translationSI
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'si', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;