import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const RewardForm = ({
  onSubmit,
  onCancel,
  onDelete,
  rewardToUpdate,
  categories,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [points, setPoints] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (rewardToUpdate) {
      setTitle(rewardToUpdate.name || '');
      setCategory(rewardToUpdate.categoryId || '');
      setPoints(rewardToUpdate.point || '');
      setDescription(rewardToUpdate.description || '');
      setImageUrl(rewardToUpdate.imageUrl);
    }
  }, [rewardToUpdate]);

  const handleSubmit = e => {
    e.preventDefault();
    if (points < 0) {
      alert('Points cannot be negative. Please enter a valid value.');
      return;
    }
    onSubmit({ title, category, points, description, image });
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    document.getElementById('image-upload-input').click();
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton
        onClick={onCancel}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>{' '}
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 'bold',
          color: rewardToUpdate ? '#6F4E37' : '#388e3c',
        }}
      >
        {' '}
        {rewardToUpdate ? 'Update Reward' : 'Add New Reward'}{' '}
      </Typography>{' '}
      <Typography variant="body1" sx={{ mb: 2, color: '#777' }}>
        Reward Details{' '}
      </Typography>{' '}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Reward Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: '#FFF9E6',
              borderRadius: '12px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />{' '}
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel> Reward Category </InputLabel>{' '}
            <Select
              value={category}
              label="Reward Category"
              onChange={e => setCategory(e.target.value)}
              size="small"
              sx={{
                backgroundColor: '#FFF9E6',
                borderRadius: '12px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                },
              }}
            >
              {' '}
              {categories.map(cat => (
                <MenuItem key={cat.id} value={cat.id}>
                  {' '}
                  {cat.name}{' '}
                </MenuItem>
              ))}{' '}
            </Select>{' '}
          </FormControl>{' '}
          <TextField
            fullWidth
            label="Reward Points"
            value={points}
            onChange={e => setPoints(Math.max(0, e.target.value))}
            variant="outlined"
            type="number"
            size="small"
            sx={{
              mt: 3,
              backgroundColor: '#FFF9E6',
              borderRadius: '12px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
            InputProps={{
              startAdornment: (
                <Typography
                  variant="body2"
                  sx={{
                    mr: 1,
                    fontWeight: 'bold',
                    color: '#888',
                  }}
                >
                  PTS{' '}
                </Typography>
              ),
            }}
          />{' '}
          <TextField
            fullWidth
            label="Reward Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            variant="outlined"
            multiline
            rows={3}
            size="small"
            sx={{
              mt: 3,
              backgroundColor: '#FFF9E6',
              borderRadius: '12px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
              },
            }}
          />{' '}
        </Grid>{' '}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <input
            id="image-upload-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />{' '}
          <Box
            onClick={handleImageClick}
            sx={{
              width: '90%',
              height: '200px',
              border: '2px dashed #c4c4c4',
              borderRadius: '12px',
              backgroundColor: '#FFF9E6',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              p: 2,
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            {' '}
            {image ? (
              <img
                src={imageUrl}
                alt="Uploaded Reward"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  borderRadius: '12px',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <>
                <Typography variant="h6" sx={{ color: '#388e3c', mb: 1 }}>
                  Upload Image{' '}
                </Typography>{' '}
                <Typography variant="body2" sx={{ color: '#888' }}>
                  Upload a cover image for your product.{' '}
                </Typography>{' '}
              </>
            )}{' '}
          </Box>{' '}
        </Grid>{' '}
      </Grid>{' '}
      <Box mt={4} display="flex" justifyContent="space-between">
        {' '}
        {rewardToUpdate && (
          <Button
            variant="contained"
            onClick={onDelete}
            sx={{
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 'bold',
              backgroundColor: '#FF5151',
              '&:hover': {
                backgroundColor: '#e64545',
              },
            }}
          >
            Delete{' '}
          </Button>
        )}{' '}
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 'bold',
            backgroundColor: rewardToUpdate ? '#6F4E37' : '#388e3c',
            padding: '8px 24px',
            '&:hover': {
              backgroundColor: rewardToUpdate ? '#5c3f2d' : '#2e7d32',
            },
          }}
        >
          {' '}
          {rewardToUpdate ? 'Update' : 'Save'}{' '}
        </Button>{' '}
      </Box>{' '}
    </Box>
  );
};

export default RewardForm;
