import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants";
import Login from "../screens/AuthScreen/Login";
import OnBoarding from "../screens/AuthScreen/OnBoarding";
import SelectLanguage from "../screens/AuthScreen/SelectLanguage";
import SignUp from "../screens/AuthScreen/SignUp";
import ForgotPass from "../screens/AuthScreen/ForgotPass";
import OTPScreen from "../screens/AuthScreen/OTPScreen";
import ResetPassword from "../screens/AuthScreen/ResetPassword";
import Privacy from "../screens/AuthScreen/Privacy";

const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerShown: false,
  animation: "fade",
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SelectLanguage" screenOptions={screenOptionStyle}>
      <Stack.Screen name={SCREENS.LOGIN} component={Login} />
      <Stack.Screen name={SCREENS.ONBOARDING} component={OnBoarding} />
      <Stack.Screen name={SCREENS.SELECT_LANGUAGE} component={SelectLanguage} />
      <Stack.Screen name={SCREENS.SIGNUP} component={SignUp} />
      <Stack.Screen name={SCREENS.FORGOT_PASS} component={ForgotPass} />
      <Stack.Screen name={SCREENS.OTP} component={OTPScreen} />
      <Stack.Screen name={SCREENS.RESET_PASS} component={ResetPassword} />
      <Stack.Screen name={SCREENS.PRIVACY} component={Privacy} />
    </Stack.Navigator>
  );
};

