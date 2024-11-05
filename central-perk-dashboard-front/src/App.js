// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RewardsPage from './pages/RewardsPage';

const theme = createTheme({
  palette: {
    primary: { main: '#2E8B57' },
    secondary: { main: '#FF5151' },
    background: { default: '#FFFFFF' },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h6: { fontFamily: 'Arial, serif', fontWeight: 'bold' },
    body1: { fontFamily: 'Arial, sans-serif' },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#FFFFFF' }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/rewards" element={<RewardsPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
