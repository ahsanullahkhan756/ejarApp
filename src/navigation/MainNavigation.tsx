import React, { useEffect, useState } from "react";
import { navigationRef } from "./RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import Splash from "../containers/Splash";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import { AuthStackNavigator } from "./AuthStackNavigator";
import SignUp from "../screens/AuthScreen/SignUp";
import Uploads from "../components/molecules/SignUpMol/Uploads";
import MyBooking from "../screens/HomeScreen/MyBooking";
import Toast from "react-native-toast-message";
import { Loader } from "../components/atoms/loader";
import { getItem } from "../utils/storage";
import { getUserDetailApi } from "../api/auth";
import { setLoggedIn, setUserDetails } from "../redux/slice/user";
import { VARIABLES } from "../constants";
import SignUpOrg from "../components/organisms/SignUpOrg";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const [isloading, setIsLoadings] = useState(true);
  const { isLoggedIn, isLoading } = useSelector((state) => state?.user);
  const [userNotActive, setUserNotActive] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const token = await getItem(VARIABLES.USER_TOKEN);

      if (token) {
        const resp = await getUserDetailApi();
        if (resp) {
          if (resp?.IsActive) {
            dispatch(setLoggedIn(true));
            dispatch(setUserDetails(resp));
          } else {
            setUserNotActive(resp);
          }
        }
      }
    };
    getUser();
    const timer = setTimeout(() => {
      setIsLoadings(false);
    }, 3000);
    return () => clearTimeout(timer);
    1;
  }, []);

  if (userNotActive) {
    return <SignUpOrg isNotVerifiedStep={1} user={userNotActive} />;
  }

  return isloading ? (
    <Splash />
  ) : (
    <>
      <NavigationContainer ref={navigationRef}>
        {!isLoggedIn ? <AuthStackNavigator /> : <AppNavigator />}
        <Toast />
        {isLoading && <Loader />}
      </NavigationContainer>
    </>
  );
};

export default MainNavigation;
