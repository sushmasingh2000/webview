import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import welcome from "../src/assets/welcome.png";

const SplashScreen = ({ onComplete }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <>
      {/* Global style fix to remove scroll and padding */}
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            height: 100%;
            width: 100%;
          }

          @keyframes fillLine {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
      </style>

      <Box
        sx={{
          position: 'fixed',
          inset: 0, // full screen
          backgroundImage: `url(${welcome})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          zIndex: 9999,
        }}
      >
        {/* Centered Loader */}
        <CircularProgress sx={{ color: '#fff' }} />

        {/* Fixed Bottom Bar */}
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            height: '6px',
            width: '0%',
            backgroundColor: '#032a68',
            animation: 'fillLine 5.5s linear forwards',
            zIndex: 10000,
          }}
        />
      </Box>
    </>
  );
};

export default SplashScreen;
