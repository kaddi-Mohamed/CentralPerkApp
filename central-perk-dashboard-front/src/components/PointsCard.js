import React from 'react';
import { Card, Typography, Box, CircularProgress } from '@mui/material';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

const PointsCard = ({ title, points, color }) => {
  const displayValue = Math.min(points, 100);

  return (
    <Card
      style={{
        backgroundColor: '#FFF5E1',
        borderRadius: '20px',
        padding: '15px 25px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
        width: '100%',
        height: '145px',
        boxSizing: 'border-box',
      }}
    >
      <Box style={{ textAlign: 'left', flexGrow: 1 }}>
        <Typography
          variant="body2"
          style={{
            fontFamily: 'Georgia, serif',
            fontWeight: 'bold',
            color: color,
            fontSize: '20px',
            lineHeight: '1.4',
          }}
        >
          {title}{' '}
        </Typography>{' '}
      </Box>
      <Box position="relative" display="flex" alignItems="center">
        <CircularProgress
          variant="determinate"
          value={100}
          size={65}
          thickness={3}
          style={{ color: color, opacity: 0.1 }}
        />
        <CircularProgress
          variant="determinate"
          value={displayValue}
          size={65}
          thickness={5}
          style={{ color: color, position: 'absolute', top: 0, left: 0 }}
        />{' '}
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            color: color,
            textShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h6"
            style={{ fontWeight: 'bold', fontSize: '14px' }}
          >
            {points}{' '}
          </Typography>{' '}
          <LoyaltyIcon style={{ fontSize: '8px' }} />{' '}
        </Box>{' '}
      </Box>{' '}
    </Card>
  );
};

export default PointsCard;
