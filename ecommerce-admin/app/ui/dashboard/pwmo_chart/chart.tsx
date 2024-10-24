'use client';

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DatePicker, Space } from 'antd';
import moment from 'moment'; // Make sure to import moment
import dayjs, { Dayjs } from 'dayjs'; // Import Dayjs

const { RangePicker } = DatePicker;

const PWMO_Chart = () => {
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs('2024-01-01'), // Default start date
    dayjs('2024-12-12')  // Default end date
  ]);
  
  const [productData, setProductData] = useState([]);

  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data from the API
  const fetchProductData = async (startDate: string, endDate: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/getsaleswithmostorders?start_date=${startDate}&end_date=${endDate}`
      );
      const data = await response.json();

      if (response.ok) {
        setProductData(data);
      } else {
        throw new Error(data.error || 'Failed to fetch product data');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when dateRange changes
  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0].format('YYYY-MM-DD');
      const endDate = dateRange[1].format('YYYY-MM-DD');
      fetchProductData(startDate, endDate);
    }
  }, [dateRange]);

  return (
    <div className="chart-container">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">Sales with Most Orders</h1>

      {/* Date Pickers */}
      <div className="flex justify-center mb-4">
        <Space direction="vertical" style={{ width: '30%' }}>
        <RangePicker
        value={dateRange} // Set the default value
        onChange={(dates) => setDateRange(dates as [Dayjs, Dayjs] | [null, null])}
        style={{ width: '100%', backgroundColor: '#151c2c', color: 'white'}} // Inline style for custom background color
      />
        </Space>
      </div>

      {/* Display error or loading */}
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : productData.length === 0 ? (
        <p>No data available for the selected date range.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={productData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis dataKey="ProductTitle" scale="point" padding={{ left: 10, right: 10 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="TotalQuantitySold" fill="#8884d8" background={{ fill: '#eee' }} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PWMO_Chart;
