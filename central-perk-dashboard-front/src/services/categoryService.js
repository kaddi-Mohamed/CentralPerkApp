import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getThreeRandomCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/categories/random3`);
    return response.data.map(category => ({
      ...category,
      imageUrl: `${BASE_URL}${category.imageUrl}`,
    }));
  } catch (error) {
    console.error('Error fetching random categories:', error);
    throw error;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/categories`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
