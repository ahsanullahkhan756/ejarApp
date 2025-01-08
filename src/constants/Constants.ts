import { ReactNode } from "react";
import { Dimensions } from "react-native";
import { SCREENS } from "./ScreenNames";
import { navigate } from "../navigation/RootNavigation";
import { IMAGES } from ".";
interface Tab {
  key: number;
  title: string;
  navigateTo: string;
  image: ReactNode;
  imageActive: ReactNode;
  vector: string;
}
const { height, width } = Dimensions.get("screen");

export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;
export const STRIPE_KEY =
  "pk_test_51QAfZAL6ZMRqMg2dDhexLvmFPD96cz871kzYCv9gT7ERRgARYdtkOUXlIaO8HRVxAzbKpGh7J6nb9F78asrmmsPE001X8jr0xi";

const fontRegularName = "Poppins";

export const theme = {
  font: {
    regular: fontRegularName + "-Regular",
    semibold: fontRegularName + "-SemiBold",
    bold: fontRegularName + "-Bold",
    medium: fontRegularName + "-Medium",
  },
  fontSize: {
    tiny: 8,
    extraVSmall: 10,
    extraSmall12: 12,
    extraSmall: 13,
    small: 14,
    medium: 15,
    regular: 16,
    large: 18,
    large20: 20,
    headingSize: 22,
    large24: 24,
    large26: 26,
    extraLarge: 28,
  },
  color: {
    primary: "#FBAE17",
    disable: "#FFE6BE",
    disableTextColor: "#E1AE5F",
    tgray: "#999B9F",
    facebook: "#3A589B",
    apple: "#2E2E2E",
    divider: "#E6E8EE",
    black: "#000",
    white: "#fff",
    messageColor: "#CCFFF0",
    callColor: "#9DE4F6",
    halfWhite: "#F9F9FC",
    descColor: "#8C8C8C",
    danger: "#FB344F",
    blue: "#112C69",
    orange: "#FBAE17",
    red: "red",
  },
};

export const CheckIfValid = (
  index: number,
  isValid: boolean,
  state: boolean[],
  setState: React.Dispatch<React.SetStateAction<boolean[]>>
) => {
  const copy = [...state];
  copy[index] = isValid;
  setState(copy);
};

export const VARIABLES = {
  //Common
  GRANTED: "granted",
  CUSTOM: "Custom",
  UPCOMING: "Upcoming",
  COMPLETED: "Completed",
  CANCEL: "Cancel",
  ACTIVE: "Active",

  USER_TOKEN: "token",
  LANGUAGE: "user selected language",
  IS_USER_LOGGED_IN: "Is user logged in?",
  IS_USER_VISITED_THE_APP:
    "Is user visited the app so don't show onboarding screen.",

  // Booleans
  TRUE: true,
  FALSE: false,

  // Numbers
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  // Add more numbers as needed

  // Strings
  EMPTY_STRING: "",
  SPACE: " ",
  COMMA: ",",
  QUESTION_MARK: "?",
  DOT: ".",
  UNDERSCORE: "_",
  DASH: "-",
  // Add more strings as needed

  DONE: "done",
  NEXT: "next",
  // Commonly used values
  NULL: null,
  UNDEFINED: undefined,
  NAN: NaN,

  // HTTP status codes
  STATUS_OK: 200,
  STATUS_BAD_REQUEST: 400,
  STATUS_UNAUTHORIZED: 401,
  STATUS_FORBIDDEN: 403,
  STATUS_NOT_FOUND: 404,
  STATUS_SERVER_ERROR: 500,

  // Common HTTP methods
  HTTP_GET: "GET",
  HTTP_POST: "POST",
  HTTP_PUT: "PUT",
  HTTP_DELETE: "DELETE",

  // Time units
  MILLISECONDS_IN_SECOND: 1000,
  SECONDS_IN_MINUTE: 60,
  MINUTES_IN_HOUR: 60,
  HOURS_IN_DAY: 24,
  DAYS_IN_WEEK: 7,
  // Add more time units as needed

  // Common configurations
  DEFAULT_PAGE_SIZE: 20,
  MAX_RETRIES: 3,
  // Add more configurations as needed
};
