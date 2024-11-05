import React, { useEffect, useState, useCallback } from 'react';
import { Avatar, Typography, Box, Grid, CircularProgress } from '@mui/material';
import { getTop3Customers } from '../services/userService';

const LoyalCustomers = () => {
  const [loyalCustomers, setLoyalCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTop3Customers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const customers = await getTop3Customers();
      setLoyalCustomers(customers);
    } catch (err) {
      setError('Failed to fetch loyal customers.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTop3Customers();
  }, [fetchTop3Customers]);

  if (loading) {
    return (
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
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Typography color="error"> {error} </Typography>{' '}
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, ml: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
          Loyal Customers{' '}
        </Typography>{' '}
        <Typography
          variant="body2"
          sx={{ color: '#2E8B57', cursor: 'pointer', fontWeight: 'bold' }}
        >
          View all{' '}
        </Typography>{' '}
      </Box>{' '}
      <Grid container spacing={3} sx={{ justifyContent: 'flex-start' }}>
        {' '}
        {loyalCustomers.map(customer => (
          <Grid
            item
            xs={6}
            sm={3}
            md={2}
            key={customer.id}
            sx={{ textAlign: 'center' }}
          >
            <Box
              sx={{
                borderRadius: '50%',
                border: '2px solid #2E8B57',
                p: 0.5,
                display: 'inline-block',
              }}
            >
              <Avatar
                src={customer.imageUrl}
                alt={customer.name}
                sx={{ width: 70, height: 70 }}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = '/fallback-avatar.png';
                }}
              />{' '}
            </Box>{' '}
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 'bold', color: '#333', mt: 1 }}
            >
              {' '}
              {customer.name}{' '}
            </Typography>{' '}
          </Grid>
        ))}{' '}
      </Grid>{' '}
    </Box>
  );
};

export default LoyalCustomers;
