import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SplashScreen = ({ onComplete }) => {
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(); 
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Box
      sx={{
        background: theme.palette.background.gradient, 
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: theme.palette.primary.contrastText, 
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Blockchain App
      </Typography>
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default SplashScreen;
