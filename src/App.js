import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./Routing";
import AuthContextProvider from "./contexts/authContext";
import Footer from "./components/Footer/Footer";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationRU from "./locales/ru/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    ru: {
      translation: translationRU,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routing />
        <Footer />
      </AuthContextProvider>
    </>
  );
};

export default App;
