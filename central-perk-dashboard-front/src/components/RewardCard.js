import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const RewardCard = ({ reward, onEdit }) => {
  return (
    <Card
      sx={{
        width: { xs: '100%', sm: 180 },
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={reward.image}
        alt={reward.title}
      />{' '}
      <CardContent>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          {' '}
          {reward.title}{' '}
        </Typography>{' '}
      </CardContent>{' '}
      <IconButton
        onClick={onEdit}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'white',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        <SettingsIcon />
      </IconButton>{' '}
    </Card>
  );
};

export default RewardCard;
