import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import RedeemIcon from '@mui/icons-material/Redeem';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import guntherImage from '../assets/images/gunther_image.jpg';
import centralPerkLogo from '../assets/images/central_perk_logo.png';

const Sidebar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const sidebarContent = (
    <Box
      sx={{
        width: 250,
        backgroundColor: '#FFF5E1',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        boxSizing: 'border-box',
      }}
    >
      <Avatar
        src={guntherImage}
        alt="Gunther"
        sx={{
          width: 80,
          height: 80,
          mb: 1,
          mt: 4,
          border: '2px solid #2E8B57',
        }}
      />{' '}
      <Typography
        variant="h6"
        sx={{
          color: '#2E8B57',
          fontWeight: 'bold',
          textAlign: 'center',
          mt: 1,
        }}
      >
        Gunther{' '}
      </Typography>{' '}
      <Typography
        variant="subtitle2"
        sx={{ color: '#6F4E37', textAlign: 'center', mb: 2 }}
      >
        Owner{' '}
      </Typography>{' '}
      <List sx={{ width: '100%', px: 2, mt: 2, mb: 4 }}>
        {' '}
        {[
          { text: 'Home', icon: <HomeIcon />, to: '/' },
          { text: 'Rewards', icon: <RedeemIcon />, to: '/rewards' },
          {
            text: 'Order History',
            icon: <HistoryIcon />,
            to: '/order-history',
          },
          { text: 'Statistics', icon: <BarChartIcon />, to: '/statistics' },
        ].map((item, index) => (
          <ListItem
            key={index}
            button
            component={NavLink}
            to={item.to}
            onClick={() => isSmallScreen && setDrawerOpen(false)}
            sx={{
              color: location.pathname === item.to ? '#FFFFFF' : '#6F4E37',
              backgroundColor:
                location.pathname === item.to ? '#00A551' : 'transparent',
              borderRadius: '20px',
              mb: 1,
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.to ? '#FFFFFF' : 'inherit',
              }}
            >
              {' '}
              {item.icon}{' '}
            </ListItemIcon>{' '}
            <ListItemText primary={item.text} />{' '}
          </ListItem>
        ))}{' '}
      </List>{' '}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1,
          mt: 2,
        }}
      >
        <img
          src={centralPerkLogo}
          alt="Central Perk Logo"
          style={{ width: 80 }}
        />{' '}
      </Box>{' '}
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#6F4E37',
          color: '#FFFFFF',
          width: '80%',
          borderRadius: '25px',
          py: 1,
          fontWeight: 'bold',
          mb: 2,
        }}
        startIcon={<LogoutIcon />}
      >
        Logout{' '}
      </Button>{' '}
    </Box>
  );

  return (
    <>
      {' '}
      {isSmallScreen && (
        <IconButton
          color="inherit"
          onClick={toggleDrawer}
          sx={{
            position: 'fixed',
            top: 10,
            left: 10,
            zIndex: 1300,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}{' '}
      {!isSmallScreen && (
        <Box
          sx={{
            width: 250,
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
          }}
        >
          {' '}
          {sidebarContent}{' '}
        </Box>
      )}{' '}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        variant={isSmallScreen ? 'temporary' : 'permanent'}
      >
        {sidebarContent}{' '}
      </Drawer>{' '}
    </>
  );
};

export default Sidebar;
