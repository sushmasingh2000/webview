import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PersonIcon from '@mui/icons-material/Person';

const BottomNavigationBar = () => {
    const [value, setValue] = useState(0);

    return (
        <Paper
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                backgroundColor: 'black',
            }}
            elevation={3}
        >
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                sx={{
                    backgroundColor: 'black',
                }}
            >
                <BottomNavigationAction
                    label="Block"
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
