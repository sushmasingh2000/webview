import axios from "axios";
import toast from "react-hot-toast";
// import { frontend, telegram_url } from "./APIRoutes";
// import { fron_end_main_domain } from "./urls";
// import toast from "react-hot-toast";

export const apiConnectorGet = async (endpoint, params) => {
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: params, // ✅ Correct place for params
    });
    if (response?.data?.msg === "Invalid Token.") {
      toast("Login in another device ", { id: 1 });
      localStorage.clear();
      // window.location.href = `${telegram_url}`;
      return;
    }
    return response;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};

// if (response?.data?.msg === "Invalid Token.") {
//   toast("Login in another device ", { id: 1 });
//   localStorage.clear();
//   window.location.href = `${telegram_url}`;
//   return;
// }

export const apiConnectorGetHome = async (endpoint, params, token) => {
  try {
    const response = await axios?.get(
      endpoint,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      {
        params: params,
      }
    );
    if (response?.data?.msg === "Invalid Token.") {
      toast("Login in another device ", { id: 1 });
      // localStorage.clear();
      // window.location.href = `${telegram_url}`;
      return;
    }
    return response;
  } catch (e) {
    return {
      msg: e?.message,
    };
  }
};
export const apiConnectorGetWithoutToken = async (endpoint, params, token) => {
  try {
    const response = await axios?.get(
      endpoint,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      {
        params: params,
      }
    );
    // if (response?.data?.msg === "Invalid logindataen.") {
    //   toast("Login in another device ", { id: 1 });
    //   localStorage.clear();
    //   window.location.href = `${frontend}`;
    //   return;
    // }
    return response;
  } catch (e) {
    return {
      msg: e?.message,
    };
  }
};
export const apiConnectorPost = async (endpoint, reqBody) => {
  try {
    const response = await axios?.post(endpoint, reqBody, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // if (response?.data?.msg === "Invalid logindataen.") {
    //   toast("Login in another device ", { id: 1 });
    //   localStorage.clear();
    //   window.location.href = `${frontend}`;
    //   return;
    // }
    return response;
  } catch (e) {
    return {
      msg: e?.message,
    };
  }
};
export const apiConnectorPostWithdouToken = async (
  endpoint,
  reqBody,
  token
) => {
  try {
    const response = await axios?.post(endpoint, reqBody, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // if (response?.data?.msg === "Invalid logindataen.") {
    //   toast("Login in another device ", { id: 1 });
    //   localStorage.clear();
    //   window.location.href = `${frontend}`;
    //   return;
    // }
    return response;
  } catch (e) {
    return {
      msg: e?.message,
    };
  }
};

export const usequeryBoolean = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false
}