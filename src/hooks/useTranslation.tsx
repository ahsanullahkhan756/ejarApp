import { useTranslation as useI18nTranslation } from "react-i18next";

export const LANGUAGES = {
  ENGLISH: "english",
  SPANISH: "spanish",
  DUTCH: "dutch",
  ARABIC: "arabic",
  GERMAN: "german",
  PORTUGUESE: "portuguese",
};

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();
  const isLangRTL = i18n.language === LANGUAGES.ARABIC;

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return { t, i18n, isLangRTL, changeLanguage };
};
