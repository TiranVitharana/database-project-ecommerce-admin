"use client";
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import ChartSkeleton from './../chartskeleton/chartskeleton'; // Import your ChartSkeleton component

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF00AA']; // Add more colors as needed

const OrdersPieChart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading

    // Fetch data from API on component mount
    useEffect(() => {
        const fetchTopCategories = async () => {
            setLoading(true); // Set loading to true when fetching starts
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
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchTopCategories();
    }, []);

    return (
        <div className="flex flex-col bg-backgroundSoft p-5 rounded-lg">
            <div className="flex-col">
                <h1 className="text-2xl font-bold mt-10">Top Categories</h1>
                <h3 className="mt-5">Showing the categories with most sales</h3>

                {/* Conditional rendering for loading state */}
                {loading ? (
                    <ChartSkeleton /> // Show skeleton while loading
                ) : (
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
                )}
            </div>
        </div>
    );
};

export default OrdersPieChart;
