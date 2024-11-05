import React from 'react';
import { Card, CardMedia, Typography } from '@mui/material';

const CategoryCard = ({ title, image }) => {
  return (
    <Card
      sx={{
        width: { xs: '100%', sm: '100%', md: '280px', lg: '300px' },
        height: { xs: '130px', sm: '150px', md: '150px', lg: '150px' },
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardMedia component="img" height="100%" image={image} alt={title} />
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          color: 'white',
          textAlign: 'left',
          padding: '8px',
          fontWeight: 'bold',
        }}
      >
        {title}
      </Typography>
    </Card>
  );
};

export default CategoryCard;
