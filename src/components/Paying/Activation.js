import React from "react";
import { CopyAll } from "@mui/icons-material";
import toast from "react-hot-toast";
import BottomNavigationBar from "../Layout/BottomNavigation";
import Navbar from "../Layout/Header";
import { frontend } from "../../utils/APIRoutes";

// 🔥 Optional: Add a background image like in the dashboard
import bg from "../../assets/lock.png"; // <-- Replace with your actual image path

const ActivationLink = () => {
  const uid = localStorage.getItem("uid");
  const activationURL = `${frontend}/activation-link?token=${uid}`;

  const handleCopy = (url) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => toast.success("Link copied to clipboard!", { id: 1 }))
        .catch(() => toast.error("Failed to copy link.", { id: 1 }));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand("copy");
        successful
          ? toast.success("Link copied to clipboard!")
          : toast.error("Copy failed. Please try manually.");
      } catch (err) {
        toast.error("Clipboard not supported in this browser.");
      }

      document.body.removeChild(textArea);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-cover bg-center px-4 py-20 flex justify-center items-start"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-2xl w-full backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-4 text-orange-400">
            Activation Link
          </h1>

          <p className="text-sm text-white/90 mb-6">
            Use the link below to activate your package. You can share it or
            keep it for your own use. Click the copy button to copy it to your
            clipboard.
          </p>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-md border border-white/20 flex flex-col gap-4">
            <label className="text-sm text-white/70">
              Your Activation Link
            </label>
            <div className="bg-black/30 p-3 rounded-md border border-white/10 text-xs break-words text-white font-mono">
              {activationURL}
            </div>

            <button
              onClick={() => handleCopy(activationURL)}
              className="flex items-center gap-2 self-start bg-orange-500 hover:bg-orange-600 transition text-white px-4 py-2 text-sm rounded-md shadow-md"
            >
              <CopyAll fontSize="small" />
              Copy Link
            </button>
          </div>
        </div>
      </div>
      <BottomNavigationBar />
    </>
  );
};

export default ActivationLink;
