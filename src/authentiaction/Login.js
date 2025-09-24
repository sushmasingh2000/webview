import React from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grow
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { useTheme } from '@mui/material/styles';
import loginBg from "../assets/login.png";

function Login() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url(${loginBg})`, // ✅ Set background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Grow in={true} timeout={800}>
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
            <LoginIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Welcome Back
            </Typography>

            <TextField
              margin="normal"
              fullWidth
              label="Email"
              variant="outlined"
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{
                style: { color: '#fff' },
              }}
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

            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{
                style: { color: '#fff' },
              }}
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
                  backgroundColor: '#e65100',
                },
              }}
           onClick={()=>navigate('/dashboard')} >
              Login
            </Button>

            <Typography variant="body2" sx={{ mt: 2, color: '#ccc' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: theme.palette.primary.light }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Grow>
    </Box>
  );
}

export default Login;
