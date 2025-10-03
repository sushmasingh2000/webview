import axios from "axios";

export const apiConnectorGet = async (endpoint, params) => {
  try {
    const response = await axios?.get(
      endpoint,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("logindataen")}`,
        },
      },
      {
        params: params,
      }
    );
    // if (response?.data?.msg === "Invalid Token.") {
    //   toast("Login in another device ", { id: 1 });
    //   localStorage.clear();
    //   window.location.href = `${telegram_url}`;
    //   return;
    // }
    return response;
  } catch (e) {
    return {
      msg: e?.message,
    };
  }
};
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
    // if (response?.data?.msg === "Invalid Token.") {
    //   toast("Login in another device ", { id: 1 });
    //   // localStorage.clear();
    //   // window.location.href = `${telegram_url}`;
    //   return;
    // }
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
        Authorization: `Bearer ${localStorage.getItem("logindataen")}`,
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
export const getTimeLeft = (targetDateTime) => {
  const now = new Date();
  const target = new Date(targetDateTime);
  const diff = target - now; // milliseconds

  if (diff <= 0) return "00:00:00";

  const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(
    Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0");
  const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(
    2,
    "0"
  );

  return `${hours}:${minutes}:${seconds}`;
};
