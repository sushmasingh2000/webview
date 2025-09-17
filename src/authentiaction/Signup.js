import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grow
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import HowToRegIcon from '@mui/icons-material/HowToReg';

function Signup() {
  const [checked, setChecked] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <Box
      sx={{
        background: theme.palette.background.gradient,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Grow in={checked} timeout={800}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, width: '100%', maxWidth: 360 }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <HowToRegIcon sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 1 }} />
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Create Account
            </Typography>

            <TextField
              margin="normal"
              fullWidth
              label="Name"
              variant="outlined"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{
                mt: 2,
                py: 1,
                fontWeight: 'bold',
                borderRadius: 2,
                boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#6a1b9a', // darker purple (optional)
                },
              }}
            >
              Sign Up
            </Button>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Already have an account? <Link to="/">Login</Link>
            </Typography>
          </Box>
        </Paper>
      </Grow>
    </Box>
  );
}

export default Signup;
