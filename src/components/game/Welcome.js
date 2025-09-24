import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import welcome from "../../assets/game.png";
import { useNavigate } from 'react-router-dom';

const Welcome = ({ onComplete }) => {
    const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete(); 
      navigate('/game'); 
    }, 5500);

    return () => clearTimeout(timer);
  }, [navigate, onComplete]);

    return (
        <>
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

                {/* Centered Progress Line (slightly above bottom) */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '100px', // You can adjust this value to move it higher or lower
                        height: '6px',
                        width: '60%', // progress bar width
                        backgroundColor: 'transparent',
                        borderRadius: '4px',
                        overflow: 'hidden',
                    }}
                >
                    {/* Animated Yellow Bar inside */}
                    <Box
                        sx={{
                            height: '100%',
                            width: '0%',
                            backgroundColor: '#FFD700', // Yellow color
                            animation: 'fillLine 5.5s linear forwards',
                        }}
                    />
                </Box>
            </Box>
        </>
    );
};

export default Welcome;
