'use client'

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const ProductTrend = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<{ ProductTitle: string }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('Apple iPad Pro'); // Set default product
  const [chartData, setChartData] = useState([]);

  // Fetch product suggestions based on the search term
  useEffect(() => {
    if (searchTerm) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(`/api/searchproducts?search_term=${searchTerm}`);
          setSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  // Fetch chart data based on the selected product
  useEffect(() => {
    if (selectedProduct) {
      const fetchChartData = async () => {
        try {
          const response = await axios.get(`/api/getproductclicks?product_title=${selectedProduct}`);
          const clicksData = response.data.map((click: { ClickDate: string; Count: number }) => {
            // Format the date to dd-mm-yyyy
            const formattedDate = new Date(click.ClickDate).toLocaleDateString('en-GB'); // 'en-GB' gives you dd-mm-yyyy format
            return {
              name: formattedDate,  // Use formatted date as the 'name'
              clicks: click.Count,
            };
          });
          setChartData(clicksData);
        } catch (error) {
          console.error('Error fetching chart data:', error);
        }
      };
      fetchChartData();
    }
  }, [selectedProduct]);

  // Handle selecting a product from suggestions
  const handleSelectProduct = (productTitle: string) => {
    setSelectedProduct(productTitle);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div className="p-4 ">
      <h1 className="text-4xl font-bold mb-12 mt-10">Product trends over time</h1>
  <h3 className="text-2xl mb-12 mt-10">
    {selectedProduct ? (
      <>Showing results for <span className="font-bold">{selectedProduct}</span></>
    ) : (
      'Please select a product'
    )}
  </h3>
      {/* Search Bar */}
      <div className="   ">
        <input
          type="text"
          className="bg-[#151c2c] rounded-lg p-2 w-full border border-blue-500 text-white"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-[#151c2c] w-full mt-1 max-h-48 overflow-y-auto">
            {suggestions.map((product: { ProductTitle: string }, index) => (
              <li
                key={index}
                className="p-2 bg-[#151c2c] text-white hover:bg-gray-700 cursor-pointer"
                onClick={() => handleSelectProduct(product.ProductTitle)}
              >
                {product.ProductTitle}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={300} className="mt-6">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="clicks" stroke="#8884d8" strokeWidth={4} activeDot={{ r: 8 }} />

          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ProductTrend;
