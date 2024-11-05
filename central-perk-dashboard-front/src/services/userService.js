import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getTop3Customers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users/top3`);
    return response.data.map(customer => ({
      ...customer,
      imageUrl: `${BASE_URL}${customer.imageUrl}`,
    }));
  } catch (error) {
    console.error('Error fetching top 3 customers:', error);
    throw error;
  }
};
