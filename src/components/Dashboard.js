import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  CopyAll,
  Diamond,
} from "@mui/icons-material";
import { BsTrophyFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import moment from "moment";
import Navbar from "./Layout/Header";
import BottomNavigationBar from "./Layout/BottomNavigation";
import Loader from "../Shared/Loader";
import { apiConnectorGet, getTimeLeft } from "../utils/ApiConnector";
import { endpoint, telegram_url } from "../utils/APIRoutes";
import bg from "../assets/lock.png";

const glassCardStyle = {
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(12px)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  color: "#fff",
};

const Dashboard = () => {
  const [timeLeft, setTimeLeft] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const { isLoading, data: dashboard } = useQuery(
    ["dashboard_api"],
    () => apiConnectorGet(endpoint?.user_dashboard_api)
  );

  const { isLoading: profileLoading, data: profile_data } = useQuery(
    ["profile_api"],
    () => apiConnectorGet(endpoint?.profile_api)
  );

  const data = dashboard?.data?.result || [];
  const profile = profile_data?.data?.result?.[0] || {};

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!profile?.jnr_remaining_time) return;

    const targetTime = moment(profile.jnr_remaining_time).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [profile?.jnr_remaining_time]);

  return (
    <>
      <Navbar />
      <Loader isLoading={isLoading || profileLoading} />
      <Box
        className="bg-gray-900 min-h-screen p-4 md:p-8 my-14"
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        {/* Header Section */}
        <Box className="mb-8 text-center" sx={{ color: "rgba(255,255,255,0.85)" }}>
          <Typography variant="h5" className="font-bold mb-1" sx={{ fontWeight: 700 }}>
            Welcome, {profile?.username || "User"}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            Time Left: {timeLeft || "Calculating..."}
          </Typography>
        </Box>

        {/* Topup & Balance Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={glassCardStyle}>
              <CardContent>
                <Box className="flex justify-between items-center mb-2">
                  <Typography variant="subtitle1" sx={{ color: "#b0bec5", fontWeight: 500 }}>
                    Topup Amount
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: "#ff6f00",
                      color: "#ff6f00",
                      "&:hover": { borderColor: "#ffa040", color: "#ffa040" },
                    }}
                    onClick={() => navigate("/activation")}
                  >
                    Deposit
                  </Button>
                </Box>
                <Typography variant="h6" sx={{ color: "#42a5f5", fontWeight: 600 }}>
                  $
                  {Number(profile?.jnr_topup_wallet || 0) -
                    Number(profile?.jnr_collapse_pkg || 0)}{" "}
                  USD
                </Typography>
                <Typography variant="body2" sx={{ color: "#90a4ae", mt: 1 }}>
                  Purchase your package to boost your rank.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={glassCardStyle}>
              <CardContent>
                <Box className="flex justify-between items-center mb-2">
                  <Typography variant="subtitle1" sx={{ color: "#b0bec5", fontWeight: 500 }}>
                    Balance
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#ff6f00",
                      "&:hover": { backgroundColor: "#ffa040" },
                    }}
                  >
                    Withdraw
                  </Button>
                </Box>
                <Typography variant="h6" sx={{ color: "#d81b60", fontWeight: 600 }}>
                  ${Number(profile?.jnr_curr_wallet || 0)?.toFixed(2)} USD
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={glassCardStyle}>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom sx={{ color: "#b0bec5" }}>
                  Withdrawal Amount
                </Typography>
                <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                  ${Number(profile?.withdrawal_amount || 0)?.toFixed(2)} USD
                </Typography>
                <Typography variant="body2" sx={{ color: "#90a4ae", mt: 1 }}>
                  User ID: <strong>{profile?.lgn_cust_id}</strong>
                  <br />
                  Rank: <strong>{profile?.rank_name?.toUpperCase()}</strong>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Stats Section */}
        <Grid container spacing={4} className="mt-8">
          <Grid item xs={12} md={4}>
            <Card elevation={0} sx={glassCardStyle}>
              <CardContent>
                <Box className="flex justify-between items-center">
                  <Typography sx={{ fontWeight: 600 }}>👥 Direct Team</Typography>
                  <Typography fontWeight="bold">{profile?.jnr_direct_team || 0}</Typography>
                </Box>
                <Box className="flex justify-between items-center mt-2">
                  <Typography sx={{ fontWeight: 600 }}>💰 Total Income</Typography>
                  <Typography fontWeight="bold" color="limegreen">
                    ${Number(profile?.total_income || 0)?.toFixed(2)}
                  </Typography>
                </Box>
                <Box className="flex justify-between items-center mt-2">
                  <Typography sx={{ fontWeight: 600 }}>📈 Today Income</Typography>
                  <Typography fontWeight="bold" color="limegreen">
                    ${Number(profile?.today_income || 0)?.toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Invitation Link */}
          <Grid item xs={12} md={8}>
            <Card elevation={0} sx={glassCardStyle}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Your Invite Link
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#42a5f5",
                    mt: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {telegram_url + `startapp=${profile?.lgn_cust_id}`}
                </Typography>
                <Tooltip title="Copy Link">
                  <IconButton
                    onClick={() =>
                      handleCopy(telegram_url + `startapp=${profile?.lgn_cust_id}`)
                    }
                    sx={{ color: "#42a5f5" }}
                  >
                    <CopyAll />
                  </IconButton>
                </Tooltip>
                {copied && (
                  <Typography variant="caption" color="limegreen">
                    Copied to clipboard!
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Rewards Section */}
        <Box className="mt-12">
          <Typography
            variant="h6"
            sx={{ color: "#fff", mb: 4, display: "flex", alignItems: "center", gap: 8 }}
          >
            <BsTrophyFill className="text-yellow-400" />
            Royalties & Rewards
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                title: "Level Income",
                value: Number(data?.[0]?.level || 0)?.toFixed(2),
                // url: "/level_income",
              },
              {
                title: "Direct Income",
                value: Number(data?.[0]?.direct || 0)?.toFixed(2),
                // url: "/roi_income",
              },
              {
                title: "Rank Income",
                value: Number(data?.[0]?.rank_income || 0)?.toFixed(2),
                // url: "/award-reward",
              },
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    ...glassCardStyle,
                    cursor: "pointer",
                    transition: "box-shadow 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 12px 48px 0 rgba(255,111,0,0.6)",
                    },
                  }}
                  onClick={() => item.url && navigate(item.url)}
                >
                  <CardContent>
                    <Box className="flex justify-between items-center">
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="h6" sx={{ color: "#42a5f5", mt: 1 }}>
                          ${item.value}
                        </Typography>
                      </Box>
                      <Diamond sx={{ fontSize: 40, color: "#ffb300" }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <BottomNavigationBar />
    </>
  );
};

export default Dashboard;
