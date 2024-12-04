import { get, post } from "../services/axios";
import { showToast } from "../utils/toast";

export const loginApi = async ({ data }) => {
  try {
    const res = await post({
      url: "auth/login",
      data: data,
      includeToken: false,
    });

    console.log({res})
    return res;
  } catch (error) {
    console.log(error)
    showToast({ title: error?.message });
  }
};

export const signUpApi = async ({ data }) => {
  try {
    const response = await post({
      url: "register",
      data: data,
      includeToken: false,
    });
    if (response?.data) {
      return response?.data;
    }
    return null;
  } catch (error) {
    showToast({ title: error?.message });
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
