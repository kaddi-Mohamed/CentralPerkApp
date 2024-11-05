import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getWeeklyRewardedPoints = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/transactions/reward/points/weekly/current`,
  );
  return response.data;
};

export const getWeeklyRedeemedPoints = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/transactions/redeemed/points/weekly/current`,
  );
  return response.data;
};
