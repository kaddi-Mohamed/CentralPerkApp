import React, { useEffect, useState, useCallback } from 'react';
import { Card, Typography, Box, Grid, CircularProgress } from '@mui/material';
import {
  getTop5RewardsByPoints,
  getAllProducts,
} from '../services/rewardService';

const PopularRewards = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTop5Rewards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const topRewards = await getTop5RewardsByPoints();
      setRewards(topRewards);
    } catch (err) {
      setError('Failed to fetch rewards.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllRewards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const allRewards = await getAllProducts();
      setRewards(allRewards);
    } catch (err) {
      setError('Failed to fetch all rewards.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTop5Rewards();
  }, [fetchTop5Rewards]);

  return (
    <Box style={{ marginTop: '20px' }}>
      {' '}
      {/* Header Section */}{' '}
      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: '10px',
          marginLeft: '30px',
          gap: '8px',
        }}
      >
        <Typography
          variant="h6"
          style={{
            fontWeight: 'bold',
            color: '#333',
            marginRight: '5px',
          }}
        >
          Popular Rewards{' '}
        </Typography>{' '}
        <Typography
          variant="body2"
          style={{
            color: '#2E8B57',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={fetchAllRewards}
        >
          View all{' '}
        </Typography>{' '}
      </Box>{' '}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
          {' '}
          {error}{' '}
        </Typography>
      ) : (
        // Rewards Cards
        <Grid
          container
          spacing={3}
          style={{ justifyContent: 'flex-start', marginLeft: '-5px' }}
        >
          {rewards.map(reward => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={reward.id}>
              <Card
                style={{
                  backgroundColor: '#FFF5E1',
                  borderRadius: '15px',

                  textAlign: 'center',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #FFDAB9',
                  height: '220px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <img
                  src={reward.imageUrl}
                  alt={reward.name}
                  style={{
                    width: '100%',
                    height: '190px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    padding: '10px',
                  }}
                />{' '}
                <Typography
                  variant="subtitle2"
                  style={{ fontWeight: 'bold', color: '#333' }}
                >
                  {reward.name}{' '}
                </Typography>{' '}
              </Card>{' '}
            </Grid>
          ))}{' '}
        </Grid>
      )}{' '}
    </Box>
  );
};

export default PopularRewards;
