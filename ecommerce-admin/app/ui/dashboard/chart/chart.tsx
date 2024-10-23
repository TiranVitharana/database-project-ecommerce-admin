/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Chart = () => {
  const [year, setYear] = useState(""); // State for selected year
  interface SalesData {
    name: string;
    pv: number;
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
            { name: 'Q1', pv: data.sales1[0]?.quarterly_sales || 0 },
            { name: 'Q2', pv: data.sales2[0]?.quarterly_sales || 0 },
            { name: 'Q3', pv: data.sales3[0]?.quarterly_sales || 0 },
            { name: 'Q4', pv: data.sales4[0]?.quarterly_sales || 0 },
          ];
          setSalesData(chartData);
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }                    
    };

    fetchData();
  }, [year]); // Re-run when 'year' changes

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 ">Quarterly Sales Report</h1>

      {/* Year Dropdown */}
      <div className="mb-6 w-56   mt-16 ">
      <Select onValueChange={(value)=>setYear(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruitsssss</SelectLabel>
          {years.map((y,key) => (
           

            <SelectItem key={key} value={y.toString()}> {y}   </SelectItem>
          ))}
          
        </SelectGroup>
      </SelectContent>
    </Select>
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;
