import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "../../public/locales/eng.json";
import Vietnamese from "../../public/locales/vie.json";


const resources = {
  eng: {
    translation: English,
  },
  vie: {
    translation: Vietnamese,
  },
};

// Get the language from localStorage, default to 'eng' if not found
let language = JSON.parse(localStorage.getItem("language") || '"eng"');

if (!['eng', 'vie'].includes(language)) {
  language = 'eng';
  localStorage.setItem("language", '"eng"'); 
}

i18n.use(initReactI18next).init({
  resources,
  lng: language, 
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
