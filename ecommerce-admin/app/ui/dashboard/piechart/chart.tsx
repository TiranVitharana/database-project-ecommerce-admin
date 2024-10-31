import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF00AA']; // Add more colors as needed

const OrdersPieChart = () => {
  const [data, setData] = useState([]);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        const response = await fetch('/api/categorieswithmostorders');
        const result = await response.json();

        // Format data for PieChart
        const formattedData = result.topMainCategories.map(item => ({
          name: item.MainCategoryName,
          value: item.OrderCount,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching top categories:", error);
      }
    };

    fetchTopCategories();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default OrdersPieChart;
