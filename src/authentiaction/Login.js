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
import LoginIcon from '@mui/icons-material/Login';
import { useTheme } from '@mui/material/styles';

function Login() {
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
            <LoginIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Welcome Back
            </Typography>

            <TextField
              margin="normal"
              fullWidth
              label="Email"
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
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                py: 1,
                fontWeight: 'bold',
                borderRadius: 2,
                boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#e65100', // optionally from theme too
                },
              }}
            >
              Login
            </Button>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </Box>
        </Paper>
      </Grow>
    </Box>
  );
}

export default Login;
