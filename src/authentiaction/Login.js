import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import body from "../assets/body-bg.png";
// import logo from "../assets/favicon.png";
import Loader from "../Shared/Loader";
import { useDispatch, useSelector } from "react-redux";
import { endpoint } from "../utils/APIRoutes";
import { saveToken, saveUid, saveUserCP, saveUsername } from "../redux/slices/counterSlice";
const Login = () => {
  const params = window?.Telegram?.WebApp?.initDataUnsafe?.start_param;
  const datatele = window?.Telegram?.WebApp?.initDataUnsafe?.user;

  // const datatele = {
  //   id: "1840589027",
  // };

  const navigate = useNavigate();
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { logindataen, uid } = useSelector((state) => state.aviator);

  const loginFn = async (reqBody) => {
    setLoading(true);
    const reqBodyy = {
      mobile: String(datatele?.id),
      email: String(datatele?.id),
      full_name: String(datatele?.username || "N/A"),
      referral_id: String(params),
      username: String(reqBody.id),
      password: String(reqBody.id),
    };
    // const reqBodyy = {
    //   mobile: String("1840589027"),
    //   email: String("1840589027"),
    //   full_name: String(datatele?.username),
    //   referral_id: String("1234567890"),
    //   username: String("1840589027"),
    //   password: String("1840589027"),
    // };

    try {
      const response = await axios.post(endpoint?.login_api, reqBodyy, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      // console.log(response?.data);
      // toast(response?.data?.message);
      setLoading(false);
      if (response?.data?.message === "Credential not found in our record") {
        setOpenDialogBox(true);
        return;
      }
      if (response?.data?.message === "Login Successfully") {
        dispatch(saveUid(reqBodyy?.mobile));
        dispatch(saveToken(response?.data?.result?.[0]?.token));
        dispatch(saveUsername(datatele?.username));
        dispatch(saveUserCP(response?.data?.result?.[0]?.isCP));
        localStorage.setItem("logindataen", response?.data?.result?.[0]?.token);
        localStorage.setItem("uid", reqBodyy?.mobile);
        localStorage.setItem("username", datatele?.username);
        localStorage.setItem("isCP", response?.data?.result?.[0]?.isCP);
        navigate("/home");
        // window.location.reload();
      }
    } catch (error) {
      toast.error("Error during login.");
      setLoading(false);
    }
  };
  useEffect(() => {
    // const bo = "1840589027";
    // // const token =
    // //   "xLToI3ZzIsfc6qyEgPXRgZ8fzc5xJmYzPirhqEvrERvmYDd3TnME3wpu7JVbt1o3hqAFvl7JTn1p9r43Lyd3EbHm0UbUTwrPNdEG";
    // const token =
    //   "PJ0Kl3CFFvN5EHlKyvqJVe1ltnV2kKKf5tkGrPTukXPUWo9BMDlg6MaQDsYcbcRiu4PtXAIqRUyGDfc76Z3iPx8NFezUNVnZgvFI";
    // dispatch(saveUid(bo));
    // dispatch(saveToken(token));
    // localStorage.setItem("logindataen", token);
    // localStorage.setItem("uid", bo);
    // navigate("/home");
    // alert("ID: " + bo);
    if (datatele?.id) {
      alert("ID: " + datatele?.id);
      if (datatele?.id && (!logindataen || !uid)) {
        loginFn({
          id: String(datatele?.id),
        });
      } else if (uid == datatele?.id) {
        navigate("/home");
      } else {
        loginFn({
          id: String(datatele?.id),
        });
      }
    }
  }, [datatele]);


  return (
    <>
      <Loader isLoading={loading} />
      <div
        className="flex justify-center items-center min-h-screen bg-black"
        style={{
          backgroundImage: `url(${"body"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-lg lg:p-6 p-4 border-border-color-green border rounded-xl shadow-2xl">
          <div className="flex justify-center my-2">
            <img src={"logo"} alt="Logo" className="h-20  " />
          </div>
          <h2 className="text-xl font-bold text-center text-white mb-6">
            Login to Your Account
          </h2>
        
          <div className="">
            <p
              className="text-white text-sm text-right py-2 mx-4 hover:underline cursor-pointer"
            >
              Forget Password ?
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">
              Don't have an account?{" "}
              <span
                className="text-white cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
