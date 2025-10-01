// pages/Dashboard.jsx
import React, { useState } from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import BottomNavigationBar from './Layout/BottomNavigation';
import GameCard from './GameCard';
import TopTabs from './Toptab';
import dd from "../assets/dd.png";
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0); 
  const navigate = useNavigate()

  return (
    <Box sx={{ pb: 8 }}> 
      <Container>
        <TopTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {selectedTab === 0 && (
          <>
            <Box mb={2}  onClick={()=>navigate('/welcome')}>
              <GameCard 
                title=" GameDev Heroes"
                image={dd}
              />
            </Box>
          </>
        )}

        {selectedTab === 1 && (
          <Typography variant="h6">Social Media section coming soon...</Typography>
        )}
      </Container>

      <BottomNavigationBar />
    </Box>
  );
};

export default Dashboard;
