import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Box, MenuItem, TextField } from "@mui/material";
import { ethers } from "ethers";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import Loader from "../../Shared/Loader";
import {
  apiConnectorGetWithoutToken,
  apiConnectorPostWithdouToken,
} from "../../utils/APIConnector";
import { endpoint } from "../../utils/APIRoutes";
import { deCryptData, enCryptData } from "../../utils/Secret";
// const tokenABI = [
//   "function balanceOf(address) view returns (uint256)",
//   "function allowance(address owner, address spender) view returns (uint256)",
//   "function approve(address spender, uint256 amount) returns (bool)",
//   "function transfer(address to, uint256 amount) returns (bool)",
//   "event Transfer(address indexed from, address indexed to, uint256 value)",
// ];
const tokenABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
];
function ActivationWithFST() {
  const [walletAddress, setWalletAddress] = useState("");
  const [no_of_Tokne, setno_of_Tokne] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [receiptStatus, setReceiptStatus] = useState("");
  const [bnb, setBnb] = useState("");
  const [no_of_TokneFST, setno_of_TokneFST] = useState("");

  const [gasprice, setGasPrice] = useState("");
  const [loding, setLoding] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location?.search);
  const IdParam = params?.get("token");
  const base64String = IdParam?.trim();
  //  atob(IdParam);
  const { data: general_address } = useQuery(
    ["contract_address_api_activation"],
    () =>
      apiConnectorGetWithoutToken(
        endpoint?.general_contact_address_api,
        {},
        base64String
      ),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: true,
      refetchOnWindowFocus: true,
    }
  );
  const address = deCryptData(general_address?.data?.result)?.[0] || [];
  const fst_percent = Number(address?.fst_percent) / 100;
  const dollar_percent = Number(100 - Number(address?.fst_percent)) / 100;

  const fk = useFormik({
    initialValues: {
      inr_value: "",
      pack_id: "SelectPackage",
    },
  });
  async function requestAccount() {
    setLoding(true);

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }], // Chain ID for Binance Smart Chain Mainnet
        });
        const userAccount = accounts[0];
        setWalletAddress(userAccount);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const nativeBalance = await provider.getBalance(userAccount);
        setBnb(ethers.utils.formatEther(nativeBalance));
        const tokenContract = new ethers.Contract(
          "0x55d398326f99059fF775485246999027B3197955",
          tokenABI,
          provider
        );
        const tokenContractFST = new ethers.Contract(
          "0x8eCB084E633FC36F16e873A13CD9ae504F6c30b0",
          tokenABI,
          provider
        );
        const tokenBalance = await tokenContract.balanceOf(userAccount);
        setno_of_Tokne(ethers.utils.formatUnits(tokenBalance, 18));
        const tokenBalanceFST = await tokenContractFST.balanceOf(userAccount);
        setno_of_TokneFST(ethers.utils.formatUnits(tokenBalanceFST, 8));
      } catch (error) {
        console.log(error);
        toast("Error connecting...", error);
      }
    } else {
      toast("MetaMask not detected.");
    }
    setLoding(false);
  }

  async function sendTokenTransaction() {
    if (!window.ethereum) return toast("MetaMask not detected");
    if (fk.values.pack_id === "SelectPackage")
      return toast("Select your package.");
    if (!address?.receiving_key) return toast("Please add receiving address.");
    if (!address?.fst_percent) return toast("Invalid login percentage.");
    if (!address?.token_price) return toast("Invalid token price.");
    if (!address?.token_contract_add) return toast("Missing contract address.");
    if (!walletAddress) return toast("Please connect your wallet.");

    const packagee = res?.find((e) => e?.pack_id === Number(fk.values.pack_id));
    if (!packagee) return toast("Invalid package selected.");
    if (
      Number(
        Number(
          res?.find((e) => e?.pack_id === Number(fk.values.pack_id))
            ?.pack_amount
        ) * (Number(fk.values.pack_id) !== 11 ? dollar_percent : 0)
      ) > no_of_Tokne
    )
      return toast("Your USDT Wallet Amount is low.");
    if (
      Number(
        Number(
          res?.find((e) => e?.pack_id === Number(fk.values.pack_id))
            ?.pack_amount
        ) *
          (Number(fk.values.pack_id) !== 11 ? fst_percent : 1) *
          Number(address?.token_price || 0)
      ) > no_of_TokneFST
    )
      return toast("Your FST Wallet is low.");

    if (!address?.token_contract_add) {
      return toast("FST token contract address is missing.");
    }
    if (!address?.token_price) {
      return toast("FST Price is missing.");
    }
    try {
      setLoding(true);

      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }], // BSC Mainnet
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      const usdtDecimals = 18;
      const fstDecimals = 8;

      const fstAmount = Number(
        Number(packagee.pack_amount) *
          Number(fst_percent) *
          Number(address.token_price)
      )?.toFixed(5);

      if (fstAmount > no_of_TokneFST) {
        setLoding(false);
        return toast("Your FST Wallet is low.");
      }

      const usdAmount = Number(
        Number(
          res?.find((e) => e?.pack_id === Number(fk.values.pack_id))
            ?.pack_amount
        ) * (Number(fk.values.pack_id) !== 11 ? dollar_percent : 0)
      )?.toFixed(5);
      const dummyData = await PayinZpDummy();
      if (
        dummyData?.success == false ||
        !dummyData?.last_id ||
        dummyData?.last_id === null ||
        dummyData?.last_id === undefined ||
        Number(dummyData?.last_id) < 1
      ) {
        setLoding(false);
        return alert(dummyData?.message);
      }
      const last_id = Number(dummyData?.last_id);
      const usdtAmount = ethers.utils.parseUnits(
        String(usdAmount),
        usdtDecimals
      );
      const fstTokenAmount = ethers.utils.parseUnits(
        String(Number(fstAmount)?.toFixed(5)),
        fstDecimals
      );

      const usdtContract = new ethers.Contract(
        "0x55d398326f99059fF775485246999027B3197955", // USDT (BEP20)
        tokenABI,
        signer
      );

      const fstContract = new ethers.Contract(
        address.token_contract_add, // ✅ Use dynamic FST contract address
        tokenABI,
        signer
      );

      const mainContract = new ethers.Contract(
        "0x06A456D39bb156cdD6621f0A85ed3b84FBA8C59d", // Replace with your main contract
        ["function deposit(uint256,uint256) external"],
        signer
      );

      // 🔍 Balance Checks
      const [usdtBalance, fstBalance, bnbBalance] = await Promise.all([
        usdtContract.balanceOf(userAddress),
        fstContract.balanceOf(userAddress),
        provider.getBalance(userAddress),
      ]);

      if (usdtBalance.lt(usdtAmount)) {
        setLoding(false);
        return toast("Insufficient USDT balance.");
      }
      if (fstBalance.lt(fstTokenAmount)) {
        setLoding(false);
        return toast("Insufficient FST balance.");
      }

      // ✅ Allowance Check & Approve USDT
      const usdtAllowance = await usdtContract.allowance(
        userAddress,
        mainContract.address
      );
      if (usdtAllowance.lt(usdtAmount)) {
        const tx = await usdtContract.approve(mainContract.address, usdtAmount);
        await tx.wait();
      }

      // ✅ Allowance Check & Approve FST
      const fstAllowance = await fstContract.allowance(
        userAddress,
        mainContract.address
      );
      if (fstAllowance.lt(fstTokenAmount)) {
        const tx = await fstContract.approve(
          mainContract.address,
          fstTokenAmount
        );
        await tx.wait();
      }

      // ⛽ Estimate gas
      const gasEstimate = await mainContract.estimateGas.deposit(
        usdtAmount,
        fstTokenAmount
      );
      const gasPrice = await provider.getGasPrice();
      const gasCost = gasEstimate.mul(gasPrice);

      if (bnbBalance.lt(gasCost)) {
        setLoding(false);
        return toast(
          `Not enough BNB for gas. Need ~${ethers.utils.formatEther(
            gasCost
          )} BNB`
        );
      }

      // 🚀 Send deposit transaction
      const tx = await mainContract.deposit(usdtAmount, fstTokenAmount);
      const receipt = await tx.wait();

      setTransactionHash(tx.hash);
      setReceiptStatus(receipt.status === 1 ? "Success" : "Failure");

      if (receipt.status === 1) {
        toast("Transaction successful!");
      } else {
        toast("Transaction failed!");
      }

      const gasCostInEth = ethers.utils.formatEther(gasCost);
      await PayinZp(
        gasCostInEth,
        tx.hash,
        receipt.status === 1 ? 2 : 3,
        last_id
      );
    } catch (error) {
      if (error?.data?.message) {
        toast(error.data.message);
      } else if (error?.reason) {
        toast(error.reason);
      } else {
        toast("Token transaction failed.");
      }
    } finally {
      setLoding(false);
    }
  }
  async function PayinZp(gasPrice, tr_hash, status, id) {
    setLoding(true);

    const reqbody = {
      req_amount: Number(
        res?.find((e) => e?.pack_id === Number(fk.values.pack_id))?.pack_amount
      ),
      u_user_wallet_address: walletAddress,
      u_transaction_hash: tr_hash,
      u_trans_status: status,
      currentBNB: 0,
      currentZP: no_of_Tokne,
      gas_price: gasPrice,
      pkg_id: fk.values.pack_id,
      last_id: id,
    };
    try {
      const res = await apiConnectorPostWithdouToken(
        endpoint?.paying_api,
        {
          payload: enCryptData(reqbody),
        },
        base64String
      );
      toast(res?.data?.message);
      fk.handleReset();
    } catch (e) {
      console.log(e);
    }
    setLoding(false);
  }

  async function PayinZpDummy() {
    const reqbody = {
      req_amount: Number(
        res?.find((e) => e?.pack_id === Number(fk.values.pack_id))?.pack_amount
      ),
      u_user_wallet_address: walletAddress,
      u_transaction_hash: "xxxxxxxxxx",
      u_trans_status: 1,
      currentBNB: 0,
      currentZP: no_of_Tokne,
      gas_price: "",
      pkg_id: fk.values.pack_id,
      deposit_type: "Mlm",
    };

    try {
      const res = await apiConnectorPostWithdouToken(
        endpoint?.paying_dummy_api,
        {
          payload: enCryptData(reqbody),
        },
        base64String
      );
      return res?.data || {};
    } catch (e) {
      console.log(e);
    }
  }

  const { data: user } = useQuery(
    ["package_api"],
    () =>
      apiConnectorGetWithoutToken(endpoint?.package_list_api, {}, base64String),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  const res = user?.data?.result || [];

  return (
    <>
      <Loader isLoading={loding} />

      <div
        className="flex h-screen overflow-y-scroll flex-col justify-center items-center bg-custom-gradient p-3"
        // style={{ backgroundImage: `url(${crypto})` }}
      >
        <Box className="!cursor-pointer bg-custom-gradient  lg:!mt-10 !flex !flex-col !justify-center gap-2 lg:w-[30%] w-full p-2 border border-gold-color rounded-lg shadow-2xl">
          <div className="flex justify-center gap-[10%] items-center mt-1 p-2  w-full border border-gold-color rounded focus:ring-blue-500 focus:border-blue-500">
            <AccountBalanceIcon className="!text-gold-color !text-[80px]" />
          </div>
          <button
            className="!bg-gradient-to-tr  from-gold-color to-text-color rounded-full hover:bg-white hover:text-black  p-2 !text-background"
            onClick={requestAccount}
          >
            Connect Your Wallet
          </button>
          <div className="m-3 bg-glassy p-4">
            <div className="flex flex-wrap justify-start items-center">
              <span className="!font-bold text-gold-color">Address : </span>{" "}
              <span className="!text-sm">
                {walletAddress?.substring(0, 10)}...
                {walletAddress?.substring(
                  walletAddress?.length - 10,
                  walletAddress?.length
                )}
              </span>
            </div>
            <div className="flex flex-wrap justify-start items-center">
              <span className="!font-bold text-gold-color">User ID : </span>{" "}
              <span className="!text-sm text-gold-color"> {base64String}</span>
            </div>
            <p className="!font-bold mt-2 text-gold-color">Wallet Balance</p>
            <div className="flex flex-wrap justify-start items-center">
              <p className="!font-semibold text-gold-color">BNB : </p>{" "}
              <p className="!text-green-500">{bnb}</p>
            </div>
            <div className="flex flex-wrap  justify-between">
              <p className="!font-semibold flex text-gold-color">
                USDT(BEP20):{" "}
                <p className="!text-green-500">
                  {Number(no_of_Tokne || 0)?.toFixed(4)}
                </p>
              </p>
            </div>
            <div className="flex flex-wrap  justify-between">
              <p className="!font-semibold flex text-gold-color">
                FST:{" "}
                <p className="!text-green-500">
                  {Number(no_of_TokneFST || 0)?.toFixed(4)}
                </p>
              </p>
            </div>
          </div>
          <p className="my-2 font-bold text-gold-color">Select Your Package</p>
          <TextField
            select
            id="pack_id"
            name="pack_id"
            value={fk.values.pack_id}
            onChange={fk.handleChange}
            sx={{
              "& .MuiSelect-select": {
                color: "#60A5FA",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#60A5FA",
                },
                "&:hover fieldset": {
                  borderColor: "#60A5FA",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#60A5FA",
                },
              },
            }}
          >
            <MenuItem value="SelectPackage">Select Package</MenuItem>
            {res?.map((item) => (
              <MenuItem key={item?.pack_id} value={item?.pack_id}>
                {item?.pack_name}
              </MenuItem>
            ))}
          </TextField>
          {Number(fk.values.pack_id) !== 11 && (
            <>
              <p className=" font-bold text-gold-color">USD Count:</p>
              <TextField
                className="!bg-white !rounded-lg !text-gold-color "
                id="req_amount"
                name="req_amount"
                value={
                  Number(
                    Number(
                      res?.find((e) => e?.pack_id === Number(fk.values.pack_id))
                        ?.pack_amount
                    ) * (Number(fk.values.pack_id) !== 11 ? dollar_percent : 0)
                  )?.toFixed(4) // means 10%
                }
                // onChange={fk.handleChange}
              />
            </>
          )}
          <p className=" font-bold text-gold-color">FST Count:</p>
          <TextField
            className="!bg-white !rounded-lg !text-gold-color "
            id="req_amount"
            name="req_amount"
            value={
              Number(
                Number(
                  res?.find((e) => e?.pack_id === Number(fk.values.pack_id))
                    ?.pack_amount
                ) *
                  (Number(fk.values.pack_id) !== 11 ? fst_percent : 1) *
                  Number(address?.token_price || 0)
              )?.toFixed(4) // means 10%
            }
          />
          <button
            className="!bg-gold-color rounded-full hover:bg-white hover:text-black  p-2 !text-background"
            onClick={sendTokenTransaction}
          >
            Confirm
          </button>
          <div className="m-3 bg-glassy p-4">
            <div className=" flex flex-wrap justify-start items-center">
              <p className="text-gold-color">Transaction Hash : </p>{" "}
              <p className="!text-[9px] whitespace-break-spaces text-gold-color">
                {transactionHash}
              </p>
            </div>
            <div className="flex flex-wrap justify-start items-center !gap-4">
              <p className="text-gold-color">Gas Price : </p>{" "}
              <p className="!font-bold text-gold-color">{gasprice}</p>
            </div>
            <div className="flex flex-wrap justify-start items-center !gap-4">
              <p className="text-gold-color">Transaction Status : </p>{" "}
              <p className="!font-bold text-gold-color">{receiptStatus}</p>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
export default ActivationWithFST;
