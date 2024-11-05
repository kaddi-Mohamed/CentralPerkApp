// src/redux/slices/dashboardSlice.js
import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: {}, // Example: You can add dashboard-related state here
  },
  reducers: {
    setDashboardData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
