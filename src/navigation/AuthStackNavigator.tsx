import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants";
import Login from "../screens/AuthScreen/Login";
import OnBoarding from "../screens/AuthScreen/OnBoarding";
import SelectLanguage from "../screens/AuthScreen/SelectLanguage";


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
    <Stack.Navigator initialRouteName="Login" screenOptions={screenOptionStyle}>
      <Stack.Screen name={SCREENS.LOGIN} component={Login} />
      <Stack.Screen name={SCREENS.ONBOARDING} component={OnBoarding} />
      <Stack.Screen name={SCREENS.SELECT_LANGUAGE} component={SelectLanguage} />
      {/* <Stack.Screen name={SCREENS.SIGNUP} component={SignUp} />
      <Stack.Screen name={SCREENS.FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={SCREENS.RESET_PASS} component={ResetPassword} /> */}
    </Stack.Navigator>
  );
};

