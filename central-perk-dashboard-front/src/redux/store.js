// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rewardsReducer from './slices/rewardsSlice';
import dashboardReducer from './slices/dashboardSlice';

const store = configureStore({
  reducer: {
    rewards: rewardsReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
