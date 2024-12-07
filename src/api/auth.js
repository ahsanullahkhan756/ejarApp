import { setIsLoading } from "../redux/slice/user";
import { store } from "../redux/store";
import { get, post, put } from "../services/axios";
import { showToast } from "../utils/toast";


export const loginApi = async ({ data }) => {
  try {
    store.dispatch(setIsLoading(true));
    const response = await post({
      url: "auth/login",
      data: data,
      includeToken: false,
    });
    if (response) {
      console.log('response',response?.token);
      return response;
    }
    return null;
  } catch (error) {
    console.log("error",error?.message);
    showToast({ title: error?.message });
  }finally{
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
    console.log('err',error?.message);
    showToast({ title: error?.message });
  }finally{
    store.dispatch(setIsLoading(false));

  }
};
export const updateProfile = async ({ data }) => {
  console.log('data',data);
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
    console.log('err',error?.message);
    showToast({ title: error?.message });
  }finally{
    store.dispatch(setIsLoading(false));

  }
};

export const forgotApi = async ({ data }) => {
  console.log('data',data);
  try {
    const res = await post({
      url: "request-code",
      data: data,
      includeToken: false,
    });
    return res;
  } catch (error) {
  console.log('error',error);
    showToast({ title: error?.messages[0] });
  }
};
export const otpApi = async ({ data }) => {
  console.log('data',data);
  try {
    const res = await post({
      url: "verify-code",
      data: data,
      includeToken: false,
    });
    return res;
  } catch (error) {
  console.log('error',error);
  showToast({ title: error?.message });
  }
};
export const resetPassword = async ({ data }) => {
  console.log('data',data);
  try {
    const res = await post({
      url: "reset-password",
      data: data,
      includeToken: false,
    });
    return res;
  } catch (error) {
    console.log('error',error);
    showToast({ title: error?.message });
  }
};

export const getUserDetailApi = async () => {
  try {
    const res = await get({
      url: "user/profile",
    });
    return res;
  } catch (error) {
    console.log(error?.message);
  }
};
