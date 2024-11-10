import Toast, { ToastPosition, ToastType } from "react-native-toast-message";
import { theme } from "../constants";

interface ToastConfig {
  type: ToastType;
  position: ToastPosition;
  text1?: string;
  text2?: string;
  text1Style?: {
    color: string;
    fontWeight: string;
  };
  text2Style?: {
    color: string;
    fontWeight: string;
    fontSize: number;
  };
}

interface ShowToastParams {
  title: string;
  message?: string;
  isError?: boolean;
}

export const showToast = ({
  title,
  message,
  isError = true,
}: ShowToastParams): void => {
  const toastConfig: ToastConfig = {
    type: isError ? "error" : "success",
    position: "top",
  };

  if (title.length <= 40) {
    toastConfig.text1 = title;
    toastConfig.text1Style = {
      color: isError ? theme.color.red : theme.color.black,
      fontWeight: "bold",
    };
  } else {
    toastConfig.text2 = title;
    toastConfig.text2Style = {
      color: isError ? theme.color.red : theme.color.black,
      fontWeight: "bold",
      fontSize: 12,
    };
  }

  Toast.show(toastConfig);
};
