import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts';
import { Card, Typography, Box } from '@mui/material';

const data = [
  { month: '01', sales: 200 },
  { month: '02', sales: 300 },
  { month: '03', sales: 250 },
  { month: '04', sales: 400 },
  { month: '05', sales: 350 },
  { month: '06', sales: 450 },
  { month: '07', sales: 500 },
  { month: '08', sales: 600 },
  { month: '09', sales: 700 },
  { month: '10', sales: 800 },
];

const SalesChart = () => {
  return (
    <Card
      style={{
        backgroundColor: '#FDF1E6',
        borderRadius: '15px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '300px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        margin: '0 auto',
      }}
    >
      <Box style={{ width: '100%', marginBottom: '10px' }}>
        <Typography
          variant="subtitle1"
          style={{
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'left',
          }}
        >
          Sales Per Month{' '}
        </Typography>{' '}
      </Box>{' '}
      <Box style={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="month"
              stroke="#333"
              axisLine={false}
              tickLine={false}
            />{' '}
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFF',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              }}
              labelStyle={{ color: '#333' }}
            />{' '}
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#AFF4C6"
              strokeWidth={4}
              dot={{
                r: 6,
                stroke: '#AFF4C6',
                strokeWidth: 2,
                fill: '#2E8B57',
              }}
            />{' '}
            <ReferenceArea x1="09" x2="10" fill="#90EE90" fillOpacity={0.2} />{' '}
          </LineChart>{' '}
        </ResponsiveContainer>{' '}
      </Box>{' '}
    </Card>
  );
};

export default SalesChart;
