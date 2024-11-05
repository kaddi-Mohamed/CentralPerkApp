import React, { useEffect, useState } from 'react';
import PointsCard from './PointsCard';
import SalesChart from './SalesChart';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
  Grid,
} from '@mui/material';
import {
  getWeeklyRewardedPoints,
  getWeeklyRedeemedPoints,
} from '../services/transactionService';

const DashboardHeader = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [rewardedPoints, setRewardedPoints] = useState(null);
  const [redeemedPoints, setRedeemedPoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPointsData = async () => {
      setLoading(true);
      try {
        const [rewarded, redeemed] = await Promise.all([
          getWeeklyRewardedPoints(),
          getWeeklyRedeemedPoints(),
        ]);
        setRewardedPoints(rewarded);
        setRedeemedPoints(redeemed);
      } catch (err) {
        setError('Failed to load points data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPointsData();
  }, []);

  const renderLoading = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
      }}
    >
      <CircularProgress />
    </Box>
  );

  const renderError = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
      }}
    >
      <Typography color="error">{error}</Typography>
    </Box>
  );

  const renderContent = () => (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
          margin: 0,
          width: '100%',
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              height: '100%',
              width: '100%',
            }}
          >
            <PointsCard
              title="Redeem Points this week"
              points={redeemedPoints}
              color="#2E8B57"
            />
            <PointsCard
              title="Rewarded Points this week"
              points={rewardedPoints}
              color="#FF5151"
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            width: '100%',
          }}
        >
          <Box
            sx={{
              height: '300px',
              backgroundColor: '#FFF5E1',
              borderRadius: '15px',
              padding: '15px',
              boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
              width: '100%',
              '& > *': {
                width: '100% !important',
                height: '100% !important',
              },
            }}
          >
            <SalesChart />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  if (loading) return renderLoading();
  if (error) return renderError();
  return renderContent();
};

export default DashboardHeader;
