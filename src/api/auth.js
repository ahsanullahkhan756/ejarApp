import { setIsLoading } from "../redux/slice/user";
import { store } from "../redux/store";
import { get, post, put, remove } from "../services/axios";
import { showToast } from "../utils/toast";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import messaging from "@react-native-firebase/messaging";
// import {
//   APPLE_CLIENT_ID_FOR_ANDROID,
//   APPLE_REDIRECT_URL,
//   GOOGLE_ANDROID_CLIENT_ID,
//   GOOGLE_IOS_CLIENT_ID,
//   GOOGLE_OFFLINE_ACCESS,
//   GOOGLE_WEB_CLIENT_ID,
//   ZENDESK_ANDROID,
//   ZENDESK_IOS,
// } from './constant';
import appleAuth, {
  AppleCredentialState,
  appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";
import {
  getBrand,
  getSystemVersion,
  getUniqueId,
  getVersion,
} from "react-native-device-info";
import { Platform } from "react-native";
import { VARIABLES } from "../constants";

import { requestNotificationPermission } from "../utils/notifications";
import { setItem } from "../utils/storage";

export const loginApi = async ({ data }) => {
  try {
    store.dispatch(setIsLoading(true));
    const response = await post({
      url: "auth/login",
      data: data,
      includeToken: false,
    });

    if (response) {
      return response;
    }
    return null;
  } catch (error) {
    console.log("error", error?.message);
    showToast({ title: error?.message });
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
export const signUpApi = async ({ data }) => {
  try {
    store.dispatch(setIsLoading(true));
    const response = await post({
      url: "auth/register",
      data: data,
      includeToken: false,
    });

    if (response) {
      return response;
    }
    return null;
  } catch (error) {
    console.log("err", error?.message);
    showToast({ title: error?.message });
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
export const updateProfile = async ({ data }) => {
  console.log("data", data);
  try {
    store.dispatch(setIsLoading(true));
    const response = await put({
      url: "user/profile",
      data: data,
    });

    if (response) {
      return response;
    }
    return null;
  } catch (error) {
    console.log("err", error?.message);
    showToast({ title: error?.message });
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
export const forgotApi = async ({ data }) => {
  try {
    const res = await get({
      url: `auth/forgot-password?email=${data?.email}`,
    });
    return res;
  } catch (error) {
    showToast({ title: error?.message });
  }
};
export const otpApi = async ({ data }) => {
  console.log("data", data);
  try {
    const res = await post({
      url: "auth/verify-otp",
      data: data,
    });
    return res;
  } catch (error) {
    console.log('err', error);
    showToast({ title: error?.message });
  }
};
export const resetPassword = async ({ data }) => {
  console.log("data", data);
  try {
    const res = await post({
      url: "auth/reset-password",
      data: data,
    });
    return res;
  } catch (error) {
    console.log("error", error);
    showToast({ title: error?.message });
  }
};

export const getUserDetailApi = async () => {
  try {
    const res = await get({
      url: "auth/me",
    });
    return res;
  } catch (error) {
    console.log(error?.message);
  }
};

export const getPrivacyApi = async () => {
  try {
    const res = await get({
      url: "privacy-policy",
    });
    return res;
  } catch (error) {
    console.log("API error:", error?.message);
    throw error;
  }
};

export const UserGoogleLoginFunction = async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response = await GoogleSignUp();
    const user = response?.data?.user;
    if (user) {
      const token = await getFCMToken();
      const data = {
        name: user?.name ?? user?.givenName + " " + user?.familyName,
        email: user?.email,
        username: user?.givenName + new Date().getUTCMilliseconds(),
        social_id: user?.id,
        fcm_token: token,
        device_type: deviceType(),
        udid: await deviceUDID(),
        picture: user?.photo,
      };
      const url = API_URL.LOGIN + "/google";
      const responseData = await post({ url, data, includeToken: false });
      if (responseData?.data) {
        await setItem(VARIABLES.USER_TOKEN, responseData?.data?.token);
        requestNotificationPermission();
        return responseData?.data;
      }
      return null;
    }
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      console.log(error?.message);

      showToast({ title: error?.message });
    }
  } finally {
    dispatch(setIsLoading(false));
    signOutGoogle();
  }
};

export const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    return token;
  } catch (e) {
    console.log(e);
  }
};

export const UserAppleLoginFunction = async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const user = await AppleSignUp();
    if (user.id) {
      const token = await getFCMToken();
      const data = user?.email
        ? {
          name: user?.name ?? user?.email?.split("@")[0],
          email: user?.email,
          username: user?.name
            ? user?.name + new Date().getUTCMilliseconds()
            : user?.email?.split("@")[0] + new Date().getUTCMilliseconds(),
          social_id: user?.id,
          // fcm_token: token,
          udid: await getUniqueId(),
          device_token: await getFCMToken(),
          device_type: Platform.OS,
          device_brand: getBrand(),
          device_os: getSystemVersion(),
          app_version: getVersion(),

          picture: user?.picture,
        }
        : {
          social_id: user?.id,
          fcm_token: token,
          device_type: Platform.OS,
          udid: await getUniqueId(),
        };
      const url = API_URL.LOGIN + "/apple";
      const responseData = await post({
        url,
        data,
        includeToken: false,
      });
      if (responseData?.data) {
        await setItem(VARIABLES.USER_TOKEN, responseData?.data?.token);
        // await setItem(VARIABLES.LOGGED_IN, VARIABLES.TRUE);
        requestNotificationPermission();
        return responseData?.data;
      }
      return null;
    }
  } catch (error) {
    console.log(error?.message);
    if (appleAuth.Error.CANCELED || appleAuthAndroid.Error.SIGNIN_CANCELLED) {
    } else if (
      appleAuth.Error.NOT_HANDLED ||
      appleAuthAndroid.Error.NOT_CONFIGURED
    ) {
      showToast(error?.message, "", true);
    } else {
      showToast(error?.message, "", true);
    }
  } finally {
    dispatch(setIsLoading(false));
    signOutApple();
  }
};

export const GoogleSignUp = async () => {
  GoogleSignin.configure({
    // androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    webClientId:
      "431283448970-n1d4p6993s3bh02d10eb7dr7jeolp5os.apps.googleusercontent.com",
    iosClientId:
      "431283448970-uru88khu33v4rhacujsa1fe33hum0ldd.apps.googleusercontent.com",
    // offlineAccess: true,
    scopes: ["profile", "email"],
  });

  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};

export const AppleSignUp = async () => {
  const userData = {
    id: null,
    name: null,
    email: null,
    username: null,
    picture: null,
  };
  if (Platform.OS == "ios") {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );
    if (credentialState === appleAuth.State.AUTHORIZED) {
      Object.assign(userData, {
        id: appleAuthRequestResponse?.user,
        name: appleAuthRequestResponse?.fullName?.givenName
          ? appleAuthRequestResponse?.fullName?.givenName +
          " " +
          appleAuthRequestResponse?.fullName?.familyName
          : null,
        email: appleAuthRequestResponse?.email,
      });

      console.log(userData);

      return userData;
    }
    console.log(userData);
    return userData;
    // } else {
    //   appleAuthAndroid.configure({
    //     clientId: APPLE_CLIENT_ID_FOR_ANDROID,
    //     redirectUri: APPLE_REDIRECT_URL,
    //     responseType: appleAuthAndroid.ResponseType.ALL,
    //     scope: appleAuthAndroid.Scope.ALL,
    //   });
    //   const response = await appleAuthAndroid.signIn();
    //   const decodedIdToken = JSON.parse(atob(response.id_token.split(".")[1]));
    //   const appleId = decodedIdToken.sub;
    //   const appleEmail = decodedIdToken.email;
    //   Object.assign(userData, {
    //     id: appleId,
    //     email: appleEmail,
    //   });
    //   return userData;
  }
};

export const signOutGoogle = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const signOutApple = async () => {
  try {
    await appleAuth.Operation.LOGOUT;
  } catch (error) {
    console.error(error);
  }
};

export const logoutApi = async () => {
  try {
    const response = await remove({ url: "auth/logout" });
    if (response) {
      return response;
    } else {
      showToast({ title: "Logout failed" });
    }
  } catch (error) {
    showToast({ title: error?.message });
  }
};