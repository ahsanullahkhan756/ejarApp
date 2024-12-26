import { setIsLoading } from "../redux/slice/user";
import { store } from "../redux/store";
import { get, post, put } from "../services/axios";
import { showToast } from "../utils/toast";

export const getHomeApi = async () => {
  store.dispatch(setIsLoading(false));
  try {
    const res = await get({
      url: "cars/getcarsData",
    });
    return res;
  } catch (error) {
    console.log(error?.message);
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
export const getBookingsListApi = async (activeTab) => {
  store.dispatch(setIsLoading(true));
  try {
    console.log( `booking?status=${activeTab?.toLowerCase()}`);
    
    const res = await get({
      url: `booking?status=${activeTab?.toLowerCase()}`,
    });
    return res;
  } catch (error) {
    console.log(error?.message);
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
export const topRatedCar = async () => {
  store.dispatch(setIsLoading(false));
  try {
    const res = await get({
      url: "cars",
      // url: "cars/toprated",
    });
    console.log("top Rated res", res);
    return res;
  } catch (error) {
    console.log(error?.message);
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
// export const filterApi = async () => {
//   store.dispatch(setIsLoading(false));
//   try {
//     const res = await get({
//       url: "cars?StartDate=2024-12-21&EndDate=2024-12-22&Status=true&Sort=true&fromKM=2&toKM=3&fromPrice=22&toPrice=22&fromYear=2020&toYear=2023&fuelType=Diesel",
//     });
//     return res;
//   } catch (error) {
//     console.log(error?.message);
//   } finally {
//     store.dispatch(setIsLoading(false));
//   }
// };

export const getAllConditions = async (id) => {
  store.dispatch(setIsLoading(false));
  try {
    const res = await get({
      url: `condition/${id}`,
    });
    return res;
  } catch (error) {
    console.log(error?.message);
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
export const getContractByOwnerId = async (id) => {
  store.dispatch(setIsLoading(false));
  try {
    const res = await get({
      url: `contract/owner/${id}/`,
    });
    return res;
  } catch (error) {
    console.log(error?.message);
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
export const confirmBooking = async (data) => {
  // store.dispatch(setIsLoading(false));
  try {
    const res = await post({
      url: `payment/payment-intent`,
      data: data,
    });
    return res;
  } catch (error) {
    console.log(error?.message);
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
export const giveRating = async (data) => {
  store.dispatch(setIsLoading(true));
  try {
    const res = await post({
      url: `review`,
      data: data,
    });
    return res;
  } catch (error) {
    console.log(error?.message);
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
export const getBookedDatesFunction = async (id) => {
  try {
    const res = await get({
      url: `booking/carbookingdates/${id}`,
    });
    console.log("top Rated res", res);
    return res;
  } catch (error) {
    console.log(error?.message);
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
export const filterApi = async (params) => {
  console.log("params", params);
  store.dispatch(setIsLoading(false));

  const queryString = new URLSearchParams(params).toString();
  const url = `cars?${queryString}`;
  console.log(url);
  try {
    const res = await get({
      url: url,
    });
    return res;
  } catch (error) {
    console.error("API Error:", error.message);
  } finally {
    store.dispatch(setIsLoading(false));
  }
};

export const searchCompaniesApi = async () => {
  store.dispatch(setIsLoading(false));
  try {
    const res = await get({
      url: "user/company",
    });
    console.log("Search Company ", res);

    return res;
  } catch (error) {
    console.log(error?.message);
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
export const notificationApi = async () => {
  store.dispatch(setIsLoading(false));
  try {
    const res = await get({
      url: "notification",
    });
    console.log("Notification api", res);
    return res;
  } catch (error) {
    console.log(error?.message);
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
export const changePassword = async (data) => {
  store.dispatch(setIsLoading(false));
  try {
    const res = await post({
      url: `auth/change-password`,
      data: data,
    });
    return res;
  } catch (error) {
    console.log(error?.message);
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
export const myAdressApi = async (data) => {
  store.dispatch(setIsLoading(false));
  try {
    const res = await put({
      url: `user/profile`,
      data: data,
    });
    return res;
  } catch (error) {
    console.log(error?.message);
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
