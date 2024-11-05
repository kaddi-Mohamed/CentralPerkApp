import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import PopularRewards from '../components/PopularRewards';
import LoyalCustomers from '../components/LoyalCustomers';
import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Dashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        padding: isSmallScreen ? '10px' : '20px',
        backgroundColor: '#FFFFFF',
        marginLeft: isSmallScreen ? 0 : '250px',
        transition: 'margin-left 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <DashboardHeader />
      <PopularRewards />
      <LoyalCustomers />
    </Box>
  );
};

export default Dashboard;
