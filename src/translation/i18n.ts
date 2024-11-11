import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locals/en.json';
import mm from '../locals/mm.json';
import ch from '../locals/ch.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    mm: { translation: mm },
    ch: { translation: ch },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
