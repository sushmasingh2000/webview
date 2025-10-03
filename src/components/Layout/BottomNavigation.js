import React, { useEffect, useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);

  // Update active tab based on current path
  useEffect(() => {
    switch (location.pathname) {
      case '/home':
        setValue(0);
        break;
      case '/wallet':
        setValue(1);
        break;
      case '/game':
        setValue(2);
        break;
      case '/profile':
        setValue(3);
        break;
      default:
        setValue(0);
    }
  }, [location.pathname]);

  // Handle navigation
  const handleNavigation = (newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/home');
        break;
      case 1:
        navigate('/wallet');
        break;
      case 2:
        navigate('/game');
        break;
      case 3:
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      elevation={10}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => handleNavigation(newValue)}
        showLabels
        sx={{
          backgroundColor: 'transparent',
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          sx={{
            color: value === 0 ? '#ff6f00' : '#fff',
          }}
        />
        <BottomNavigationAction
          label="Wallet"
          icon={<AccountBalanceWalletIcon />}
          sx={{
            color: value === 1 ? '#ff6f00' : '#fff',
          }}
        />
        <BottomNavigationAction
          label="Charge"
          icon={<FlashOnIcon />}
          sx={{
            color: value === 2 ? '#ff6f00' : '#fff',
          }}
        />
        <BottomNavigationAction
          label="Profile"
          icon={<PersonIcon />}
          sx={{
            color: value === 3 ? '#ff6f00' : '#fff',
          }}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavigationBar;
