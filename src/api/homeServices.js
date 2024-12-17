import { setIsLoading } from "../redux/slice/user";
import { store } from "../redux/store";
import { get, post } from "../services/axios";
import { showToast } from "../utils/toast";

export const getHomeApi = async () => {
  store.dispatch(setIsLoading(false));
  try {
    const res = await get({
      url: "cars",
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
    });
    console.log("top Rated res", res);
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
