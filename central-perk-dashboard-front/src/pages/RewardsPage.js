import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogContent,
  Link,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import CategoryCard from '../components/CategoryCard';
import RewardCard from '../components/RewardCard';
import RewardForm from '../components/RewardForm';
import { useTheme } from '@mui/material/styles';
import {
  getThreeRandomCategories,
  getAllCategories,
} from '../services/categoryService';
import {
  getFiveRandomProducts,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/rewardService';

const RewardsPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [openForm, setOpenForm] = useState(false);
  const [rewardToUpdate, setRewardToUpdate] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [displayCategories, setDisplayCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingDisplayCategories, setLoadingDisplayCategories] =
    useState(true);
  const [errorDisplayCategories, setErrorDisplayCategories] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);
  const [loadingRewards, setLoadingRewards] = useState(false);
  const [errorRewards, setErrorRewards] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const fetchDisplayCategories = useCallback(async () => {
    setLoadingDisplayCategories(true);
    setErrorDisplayCategories(null);
    try {
      const fetchedDisplayCategories = await getThreeRandomCategories();
      setDisplayCategories(fetchedDisplayCategories);
    } catch (err) {
      setErrorDisplayCategories('Failed to fetch categories for display.');
    } finally {
      setLoadingDisplayCategories(false);
    }
  }, []);

  const fetchAllCategories = useCallback(async () => {
    setLoadingCategories(true);
    setErrorCategories(null);
    try {
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);
    } catch (err) {
      setErrorCategories('Failed to fetch categories.');
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  const fetchFiveRandomRewards = useCallback(async () => {
    setLoadingRewards(true);
    setErrorRewards(null);
    try {
      const fetchedRewards = await getFiveRandomProducts();
      console.log(fetchedRewards);
      setRewards(fetchedRewards);
    } catch (err) {
      setErrorRewards('Failed to fetch rewards.');
    } finally {
      setLoadingRewards(false);
    }
  }, []);

  const fetchAllRewards = useCallback(async () => {
    setLoadingRewards(true);
    setErrorRewards(null);
    try {
      const fetchedRewards = await getAllProducts();
      setRewards(fetchedRewards);
    } catch (err) {
      setErrorRewards('Failed to fetch all rewards.');
    } finally {
      setLoadingRewards(false);
    }
  }, []);

  const handleAddReward = async newReward => {
    try {
      if (rewardToUpdate) {
        const updatedReward = await updateProduct(rewardToUpdate.id, newReward);
        setRewards(
          rewards.map(reward =>
            reward.id === rewardToUpdate.id ? updatedReward : reward,
          ),
        );
      } else {
        const createdReward = await createProduct(newReward);
        setRewards([...rewards, createdReward]);
      }
    } catch (error) {
      console.error('Failed to add or update reward', error);
    } finally {
      setOpenForm(false);
      setRewardToUpdate(null);
      setRefresh(!refresh);
    }
  };

  const handleDeleteReward = async () => {
    if (!rewardToUpdate || !rewardToUpdate.id) {
      console.error('No reward selected for deletion.');
      return;
    }

    console.log('Deleting reward with ID:', rewardToUpdate.id);
    try {
      await deleteProduct(rewardToUpdate.id);
      setRewards(rewards.filter(reward => reward.id !== rewardToUpdate.id));
    } catch (error) {
      console.error('Failed to delete reward', error);
    } finally {
      setOpenForm(false);
      setRewardToUpdate(null);
    }
  };

  useEffect(() => {
    fetchDisplayCategories();
    fetchAllCategories();
    fetchFiveRandomRewards();
  }, [
    fetchDisplayCategories,
    fetchAllCategories,
    fetchFiveRandomRewards,
    refresh,
  ]);

  const handleEditReward = reward => {
    setRewardToUpdate(reward);
    setOpenForm(true);
  };

  return (
    <Box
      p={isSmallScreen ? 2 : 3}
      style={{
        marginLeft: isSmallScreen ? 0 : '250px',
        transition: 'margin-left 0.3s ease',
      }}
    >
      {' '}
      {/* Categories Section */}{' '}
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        Categories{' '}
      </Typography>{' '}
      {loadingDisplayCategories ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : errorDisplayCategories ? (
        <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
          {' '}
          {errorDisplayCategories}{' '}
        </Typography>
      ) : (
        <Grid container spacing={6} justifyContent="flex-start">
          {' '}
          {displayCategories.map(category => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
              <CategoryCard title={category.name} image={category.imageUrl} />{' '}
            </Grid>
          ))}{' '}
        </Grid>
      )}{' '}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Manage Rewards{' '}
          </Typography>{' '}
          <Link
            href="#"
            underline="none"
            sx={{
              ml: 2,
              color: 'success.main',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={fetchAllRewards}
          >
            View all{' '}
          </Link>{' '}
        </Box>{' '}
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setRewardToUpdate(null);
            setOpenForm(true);
          }}
          sx={{
            borderRadius: '20px',
            padding: '10px 20px',
            textTransform: 'none',
            fontWeight: 'bold',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
          }}
        >
          +Add Rewards{' '}
        </Button>{' '}
      </Box>{' '}
      {loadingRewards ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : errorRewards ? (
        <Typography color="error" sx={{ textAlign: 'center', mt: 2 }}>
          {' '}
          {errorRewards}{' '}
        </Typography>
      ) : (
        <Grid container spacing={1.5} mt={1} justifyContent="flex-start">
          {' '}
          {rewards.map(reward => (
            <Grid item xs={12} sm={6} md={3} lg={2} key={reward.id}>
              <RewardCard
                reward={{
                  title: reward.name,
                  image: reward.imageUrl,
                  category: reward.category
                    ? reward.category.name
                    : 'Uncategorized',
                }}
                onEdit={() => handleEditReward(reward)}
              />{' '}
            </Grid>
          ))}{' '}
        </Grid>
      )}{' '}
      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: '20px',
            overflow: 'hidden',
          },
        }}
      >
        <DialogContent sx={{ padding: 4 }}>
          <RewardForm
            onSubmit={handleAddReward}
            onCancel={() => setOpenForm(false)}
            onDelete={handleDeleteReward}
            rewardToUpdate={rewardToUpdate}
            categories={categories}
          />{' '}
        </DialogContent>{' '}
      </Dialog>{' '}
    </Box>
  );
};

export default RewardsPage;
