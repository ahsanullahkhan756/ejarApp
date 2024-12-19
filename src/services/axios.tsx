import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { setIsUserLoggedIn } from "../redux/slice/appSettings";
import { store } from "../redux/store";
import { VARIABLES } from "../constants";
import { getItem, removeMultipleItem } from "../utils/storage";

interface RequestOptions {
  url: string;
  data?: object;
  config?: AxiosRequestConfig;
  includeToken?: boolean;
}

interface ErrorResponse {
  error?: {
    messages: string[];
  };
  errors?: string | string[];
  message?: string;
}
const axiosInstance = axios.create({
  // baseURL: 'https://backend.carejar.net/v1/',
  baseURL: "http://10.55.62.101:4000/v1/",
  timeout: 15000,
  headers: {
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Accept: "application/json",
  },
});

const setAuthToken = async () => {
  try {
    const USER_TOKEN = await getItem(VARIABLES.USER_TOKEN);
    if (USER_TOKEN) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${USER_TOKEN}`;
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error("Error setting auth token:", error);
  }
};

class HttpError extends Error {
  status: number;
  errors?: string[] | string;
  constructor(
    message: string | undefined,
    status: number,
    errors?: string[] | string
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

class NetworkError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class SocketError extends Error {
  constructor(message: string) {
    super(message);
  }
}

const checkUnAuth = async (error?: string) => {
  if (error === "Unauthenticated") {
    store.dispatch(setIsUserLoggedIn(false));
    await removeMultipleItem([
      VARIABLES.IS_USER_LOGGED_IN,
      VARIABLES.USER_TOKEN,
    ]);
  }
};

const handleRequestError = (error: AxiosError<ErrorResponse>) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      // Check for network error or socket timeout
      if (error.code === "ECONNABORTED") {
        throw new SocketError(
          "Socket timeout: The request took too long to complete."
        );
      }
      throw new NetworkError("No Internet Connection");
    }
    const status: number = error.response.status;
    if (status) {
      const responseData = error.response.data;
      if (responseData.error) {
        checkUnAuth(responseData.error.messages[0]);
        throw new HttpError(responseData.error.messages[0], status);
      } else if (responseData.errors || responseData.message) {
        checkUnAuth(responseData.message);
        throw new HttpError(responseData.message, status, responseData.errors);
      } else {
        throw new HttpError(error.response.statusText, status);
      }
    }
  }
  throw error;
};

const makeHttpRequest = async (
  config: AxiosRequestConfig,
  includeToken = true
) => {
  try {
    if (includeToken) {
      await setAuthToken();
    }

    const response = await axiosInstance(config);
    if (response?.data?.response) {
      return response?.data?.response;
    } else {
      return response?.data;
    }
  } catch (error) {
    if (error?.response?.data?.error?.type === "card_error") {
      throw new HttpError(
        error?.response?.data?.error?.message,
        error?.response?.data?.error?.code
      );
    } else {
      handleRequestError(error as AxiosError<ErrorResponse>);
    }
  }
};

const get = async ({
  url,
  config = {},
  includeToken = true,
}: RequestOptions) => {
  return makeHttpRequest({ method: "GET", url, ...config }, includeToken);
};

const post = async ({
  url,
  data,
  config = {},
  includeToken = true,
}: RequestOptions) => {
  return makeHttpRequest(
    { method: "POST", url, data, ...config },
    includeToken
  );
};

const put = async ({
  url,
  data,
  config = {},
  includeToken = true,
}: RequestOptions) => {
  return makeHttpRequest({ method: "PUT", url, data, ...config }, includeToken);
};

const patch = async ({
  url,
  data,
  config = {},
  includeToken = true,
}: RequestOptions) => {
  return makeHttpRequest(
    { method: "PATCH", url, data, ...config },
    includeToken
  );
};

// const remove = async (url, config={}, includeToken = true) => {
//   return makeHttpRequest({ method: 'DELETE', url, ...config }, includeToken);
// };

const remove = async ({
  url,
  data = {},
  config = {},
  includeToken = true,
}: RequestOptions) => {
  const headers = {
    "Content-Type": "application/json", // Set the appropriate content type
    ...(config.headers || {}),
  };

  const requestOptions = {
    method: "DELETE",
    url,
    headers,
    data: JSON.stringify(data), // Convert data to JSON string
    ...config,
  };

  return makeHttpRequest(requestOptions, includeToken);
};

const postWithSingleFile = async ({
  url,
  data,
  config = {},
  includeToken = true,
}: RequestOptions) => {
  const formData = new FormData();
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  return makeHttpRequest(
    {
      method: "POST",
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    },
    includeToken
  );
};

const patchWithSingleFile = async ({
  url,
  data,
  config = {},
  includeToken = true,
}: RequestOptions) => {
  const formData = new FormData();
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("_method", "PATCH");
  }
  return makeHttpRequest(
    {
      method: "POST",
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    },
    includeToken
  );
};

export {
  setAuthToken,
  get,
  post,
  put,
  patch,
  remove,
  postWithSingleFile,
  patchWithSingleFile,
};
