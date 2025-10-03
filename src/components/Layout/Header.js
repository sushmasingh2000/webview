import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
    setIsDrawerOpen(open);
  };

  const uid = localStorage.getItem("uid") || "Guest";
  const username = localStorage.getItem("username") || "Anonymous";

  return (
    <>
      {/* NAVBAR */}
      <div
        className="fixed top-0 w-full z-50"
        style={{
            backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex justify-between items-center px-6 lg:px-20 py-3 text-white select-none">
          {/* Brand Logo with gradient text */}
          <div
            className="text-2xl font-extrabold cursor-pointer"
            style={{
              background: "linear-gradient(90deg, #ff6f00, #ffb300)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              MozBackgroundClip: "text",
              MozTextFillColor: "transparent",
              fontWeight: "900",
            }}
            onClick={() => navigate("/")}
          >
            CryptoFit Mines
          </div>

          {/* Desktop Menu (uncomment if needed) */}
          {/* 
          <div className="hidden lg:flex gap-10 text-sm font-semibold">
            {[
              { label: "Dashboard", path: "/home" },
              { label: "Markets", path: "/markets" },
              { label: "About", path: "/about" },
              { label: "Contact", path: "/contact" },
            ].map((item) => (
              <p
                key={item.path}
                className="cursor-pointer hover:text-orange-400 transition-colors duration-300"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </p>
            ))}
          </div>
          */}

          {/* Desktop User Info (uncomment if needed) */}
          {/* 
          <div className="hidden lg:flex gap-8 text-xs text-gray-300 select-text">
            <p>UID: {uid}</p>
            <p>User: {username}</p>
          </div>
          */}

          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <IconButton
              onClick={toggleDrawer(true)}
              sx={{
                color: "white",
                "&:hover": { color: "#ff6f00" },
                transition: "color 0.3s",
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div
          style={{
            width: 280,
            height: "100%",
            background: "rgba(20, 20, 20, 0.95)",
            backdropFilter: "blur(20px)",
            color: "white",
            padding: "25px 20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={toggleDrawer(false)}
              sx={{
                color: "white",
                "&:hover": { color: "#ff6f00" },
                transition: "color 0.3s",
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>

          <List sx={{ flexGrow: 1, mt: 2 }}>
            {[
              { label: "Dashboard", path: "/home" },
              { label: "Markets", path: "/markets" },
              { label: "About", path: "/about" },
              { label: "Contact", path: "/contact" },
            ].map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setIsDrawerOpen(false);
                }}
                sx={{
                  borderRadius: "8px",
                  mb: 1,
                  "&:hover": {
                    backgroundColor: "rgba(255,111,0,0.15)",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: "#444", mb: 2 }} />

          <List>
            <ListItem>
              <ListItemText primary={`UID: ${uid}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`User: ${username}`} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
