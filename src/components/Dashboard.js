// pages/Dashboard.jsx
import React, { useState } from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import BottomNavigationBar from './Layout/BottomNavigation';
import GameCard from './GameCard';
import TopTabs from './Toptab';
import dd from "../assets/dd.png";


const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0); // 0: Games, 1: Social

  return (
    <Box sx={{ pb: 8 }}> {/* Padding for bottom nav */}
      <Container>
        <TopTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {selectedTab === 0 && (
          <>
            <Box mb={2}>
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
