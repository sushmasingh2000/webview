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
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useTheme } from '@mui/material/styles';
import loginBg from '../assets/login.png'; // Use the same background as Login

function Signup() {
  const [checked, setChecked] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Grow in={checked} timeout={800}>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            width: '100%',
            maxWidth: 380,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: '#fff',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <HowToRegIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Create Account
            </Typography>

            {/* Name Field */}
            <TextField
              margin="normal"
              fullWidth
              label="Name"
              variant="outlined"
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: '#fff' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ff6f00',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff6f00',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fff',
                  },
                },
              }}
            />

            {/* Email Field */}
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: '#fff' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ff6f00',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff6f00',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fff',
                  },
                },
              }}
            />

            {/* Password Field */}
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: '#fff' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ff6f00',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ff6f00',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fff',
                  },
                },
              }}
            />

            {/* Sign Up Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                fontWeight: 'bold',
                borderRadius: 2,
                backgroundColor: theme.palette.primary.main,
                boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
                '&:hover': {
                  backgroundColor: '#e65100', // darker purple
                },
              }}
            >
              Sign Up
            </Button>

            {/* Link to Login */}
            <Typography variant="body2" sx={{ mt: 2, color: '#ccc' }}>
              Already have an account?{' '}
              <Link to="/" style={{ color: theme.palette.primary.light }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grow>
    </Box>
  );
}

export default Signup;
