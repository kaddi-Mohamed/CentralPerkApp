import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getTop5RewardsByPoints = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/products/top5OrderedByPointsDesc`,
    );
    return response.data.map(reward => ({
      ...reward,
      imageUrl: `${BASE_URL}${reward.imageUrl}`, // Map imageUrlPath to imageUrl
    }));
  } catch (error) {
    console.error('Error fetching top 5 rewards:', error);
    throw error;
  }
};

export const getFiveRandomProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products/random5`);
    return response.data.map(product => ({
      ...product,
      imageUrl: `${BASE_URL}${product.imageUrl}`,
    }));
  } catch (error) {
    console.error('Error fetching random products:', error);
    throw error;
  }
};

export const createProduct = async product => {
  const formData = new FormData();
  formData.append('name', product.title);
  formData.append('point', product.points);
  formData.append('description', product.description);
  formData.append('categoryId', product.category);
  if (product.image) {
    formData.append('image', product.image);
  }
  try {
    const response = await axios.post(`${BASE_URL}/api/products`, formData, {});
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.response) {
      console.error('Backend response:', error.response.data);
    }
    throw error;
  }
};
export const updateProduct = async (id, product) => {
  const formData = new FormData();
  formData.append('name', product.title);
  formData.append('point', product.points);
  formData.append('categoryId', product.category);
  formData.append('description', product.description);
  if (product.image) {
    formData.append('image', product.image);
  }
  try {
    const response = await axios.put(
      `${BASE_URL}/api/products/${id}`,
      formData,
      {},
    );
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    if (error.response) {
      console.error('Backend response:', error.response.data);
    }
    throw error;
  }
};

export const deleteProduct = async id => {
  try {
    await axios.delete(`${BASE_URL}/api/products/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/products`);
    return response.data.map(product => ({
      ...product,
      imageUrl: `${BASE_URL}${product.imageUrl}`,
    }));
  } catch (error) {
    console.error('Error fetching random products:', error);
    throw error;
  }
};
