import { LANGUAGES } from "../hooks/useTranslation";
import i18n from "../i18n";

type Values = {
  [key: string]: string | number;
};

const arabicNumeralsMap: { [key: string]: string } = {
  "0": "٠",
  "1": "١",
  "2": "٢",
  "3": "٣",
  "4": "٤",
  "5": "٥",
  "6": "٦",
  "7": "٧",
  "8": "٨",
  "9": "٩",
};

const convertToArabicNumerals = (str: string): string => {
  return str.replace(/\d/g, (digit) => arabicNumeralsMap[digit]);
};

export const getArabicNumbers = (value: any): string => {
  if (i18n.language == LANGUAGES.ARABIC) {
    return convertToArabicNumerals(value);
  } else {
    return value;
  }
};
