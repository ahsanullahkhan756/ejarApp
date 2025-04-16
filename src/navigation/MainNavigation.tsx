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
import { useTranslation } from "../hooks/useTranslation";
import { setAppLanguage } from "../redux/slice/appSettings";
import SignUpOrg from "../components/organisms/SignUpOrg";
import { requestNotificationPermission } from "../utils/notifications";

// const MainNavigation = () => {
//   const dispatch = useDispatch();
//   const [isloading, setIsLoadings] = useState(true);
//   const { isLoggedIn, isLoading } = useSelector((state) => state?.user);
//   const { changeLanguage } = useTranslation();
//   const [userNotActive, setUserNotActive] = useState(null);

//   useEffect(() => {
//     const getUser = async () => {
//       console.log('================>');
      
//       const userSelectedLanguage = await getItem(VARIABLES.LANGUAGE);
//       if (userSelectedLanguage) {
//         changeLanguage(userSelectedLanguage);
//         dispatch(setAppLanguage(userSelectedLanguage));
//       }
//       requestNotificationPermission();
//       const token = await getItem(VARIABLES.USER_TOKEN);

//       if (token) {
//         const resp = await getUserDetailApi();
//         if (resp) {
//           if (resp?.IsActive) {
//             dispatch(setLoggedIn(true));
//             dispatch(setUserDetails(resp));
//           } else {
//             dispatch(setLoggedIn(true));
//             setUserNotActive(resp);
//             dispatch(setUserDetails(resp));
//           }
//         }
//       } else {
//         setUserNotActive(null);
//       }
//     };
//     getUser();
//     const timer = setTimeout(() => {
//       setIsLoadings(false);
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, [isLoggedIn]);

//   const checkVerificationStatus = () => {
//     console.log('------++++++++++>>>>>>>>>');
    
//     if (userNotActive) {
//       if (
//         userNotActive?.idcardPicture &&
//         userNotActive?.idcardPictureBack &&
//         userNotActive?.gender
//       ) {
//         if (
//           userNotActive?.licensePicture &&
//           userNotActive?.licenseNumberExpDate
//         ) {
//           if (
//             userNotActive?.passportNumber &&
//             userNotActive?.passportNumberExpDate
//           ) {
//             if (userNotActive?.profilePicture) {
//               setUserNotActive(null);
//               dispatch(setLoggedIn(true));
//               return;
//             } else {
//               return 4;
//             }
//           } else {
//             return 3;
//           }
//         } else {
//           return 2;
//         }
//       } else {
//         return 1;
//       }
//     }
//   };

//   if (userNotActive) {
//     return (
//       <SignUpOrg
//         isNotVerifiedStep={checkVerificationStatus()}
//         user={userNotActive}
//       />
//     );
//   }

//   return isloading ? (
//     <Splash setIsLoadings={setIsLoadings} />
//   ) : (
//     <>
//       <NavigationContainer ref={navigationRef}>
//         {!isLoggedIn ? <AuthStackNavigator /> : <AppNavigator />}
//         <Toast />
//         {isLoading && <Loader />}
//       </NavigationContainer>
//     </>
//   );
// };

const MainNavigation = () => {
  const dispatch = useDispatch();
  const [isloading, setIsLoadings] = useState(true);
  const { isLoggedIn, isLoading, userDetails } = useSelector((state) => state?.user);
  const { changeLanguage } = useTranslation();
  const [userNotActive, setUserNotActive] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const userSelectedLanguage = await getItem(VARIABLES.LANGUAGE);
        if (userSelectedLanguage) {
          changeLanguage(userSelectedLanguage);
          dispatch(setAppLanguage(userSelectedLanguage));
        }

        await requestNotificationPermission();
        const token = await getItem(VARIABLES.USER_TOKEN);

        if (token) {
          const resp = await getUserDetailApi();
          if (resp) {
            if (resp?.IsActive) {
              dispatch(setLoggedIn(true));
              dispatch(setUserDetails(resp));
            } else {
              dispatch(setLoggedIn(true));
              setUserNotActive(resp);
              dispatch(setUserDetails(resp));
            }
          }
        }
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setIsReady(true);
        setIsLoadings(false);
      }
    };

    initializeApp();
  }, []);

  const checkVerificationStatus = () => {
    if (!userDetails) return null;
    
    if (!userDetails?.idcardPicture || !userDetails?.idcardPictureBack || !userDetails?.gender) {
      return 1;
    }
    if (!userDetails?.licensePicture || !userDetails?.licenseNumberExpDate) {
      return 2;
    }
    if (!userDetails?.passportNumber || !userDetails?.passportNumberExpDate) {
      return 3;
    }
    if (!userDetails?.profilePicture) {
      return 4;
    }
    return null;
  };

  // if (!isReady) {
  //   return <Splash setIsLoadings={setIsLoadings} />;
  // }

  if (userDetails && !userDetails?.IsActive) {
    const verificationStep = checkVerificationStatus();
    if (verificationStep !== null) {
      return (
        <SignUpOrg
          isNotVerifiedStep={verificationStep}
          user={userDetails}
        />
      );
    }
  }
  return isloading ? (
    <Splash setIsLoadings={setIsLoadings} />
  ) : (
    <>
      <NavigationContainer ref={navigationRef}>
        {!isLoggedIn ? <AuthStackNavigator /> : <AppNavigator />}
        <Toast />
        {isLoading && <Loader />}
      </NavigationContainer>
    </>
  );
  // return (
  //   <>
  //     <NavigationContainer ref={navigationRef}>
  //       {!isLoggedIn ? <AuthStackNavigator /> : <AppNavigator />}
  //       <Toast />
  //       {isLoading && <Loader />}
  //     </NavigationContainer>
  //   </>
  // );
};

export default MainNavigation;
