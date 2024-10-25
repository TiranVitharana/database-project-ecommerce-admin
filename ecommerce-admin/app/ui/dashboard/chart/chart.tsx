'use client'

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Chart = () => {
  const [year, setYear] = useState("2024"); // Set initial year to 2024
  interface SalesData {
    name: string;
    TotalSales: number;
  }

  const [salesData, setSalesData] = useState<SalesData[]>([]); // State for sales data

  const years = [2021, 2022, 2023, 2024]; // Sample year options

  // Fetch sales data when year changes
  useEffect(() => {
    const fetchData = async () => {
      if (!year) return; // Do nothing if no year is selected

      try {
        const response = await fetch(`/api/generatequarterlysalesreport?year=${year}`);
        const data = await response.json();

        if (data) {
          // Map the response to fit the chart data format
          const chartData = [
            { name: 'Q1', TotalSales: data.sales1[0]?.quarterly_sales || 0 },
            { name: 'Q2', TotalSales: data.sales2[0]?.quarterly_sales || 0 },
            { name: 'Q3', TotalSales: data.sales3[0]?.quarterly_sales || 0 },
            { name: 'Q4', TotalSales: data.sales4[0]?.quarterly_sales || 0 },
          ];
          setSalesData(chartData as SalesData[]);
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }                    
    };

    fetchData();
  }, [year]); // Re-run when 'year' changes

  return (
    <div className="flex flex-col">
  <h1 className="text-4xl font-bold mb-12 mt-10">Quarterly Sales Report</h1>
  <h3 className="text-2xl  mb-12 mt-10">Showing quarterly sales for the year {year}</h3>

  {/* Year Dropdown */}
  <div className="flex items-center justify-center mb-6 mt-6">
    <div className="w-56">
      <Select onValueChange={(value) => setYear(value)} defaultValue={"2024"}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {years.map((y, key) => (
              <SelectItem key={key} value={y.toString()}> {y} </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  </div>


      
      {/* Chart */}
      {salesData.length > 0 && (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart
      width={500}
      height={300}
      data={salesData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="4 4" />
      <XAxis dataKey="name"  />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="TotalSales" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
)}

    </div>
  );
};

export default Chart;
