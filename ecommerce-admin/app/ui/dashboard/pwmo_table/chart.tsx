/* eslint-disable */
'use client';
import React, { useState, useEffect } from 'react';
import { DatePicker, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import Pagination from "@/app/ui/dashboard/pagination/pagination";

const { RangePicker } = DatePicker;

const PWMO_Table = () => {
  interface Product {
    ProductTitle: string;
    MainCategoryName: string;
    TotalQuantitySold: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs('2024-01-01'),
    dayjs('2024-12-12')
  ]);

  // Function to fetch product data for the selected date range
  const fetchProductData = async (startDate: string, endDate: string) => {
    try {
      const response = await fetch(`/api/getsaleswithmostorders?start_date=${startDate}&end_date=${endDate}`);
      const result = await response.json();
      setProducts(result || []);
      setFilteredProducts(result || []);
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0].format('YYYY-MM-DD');
      const endDate = dateRange[1].format('YYYY-MM-DD');
      fetchProductData(startDate, endDate);
    }
  }, [dateRange]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
        <div className="flex flex-col bg-backgroundSoft p-5 rounded-lg">
          <h1 className="text-2xl font-semibold text-white mb-4">Product Sales</h1>

          {/* Date Range Picker */}
          <div className="flex justify-center mb-4">
            <Space direction="vertical" style={{ width: '30%' }}>
              <RangePicker
                  value={dateRange}
                  onChange={(dates) => setDateRange(dates as [Dayjs, Dayjs] | [null, null])}
                  style={{ width: '100%', backgroundColor: '#151c2c', color: 'white' }}
              />
            </Space>
          </div>

          {/* Products Table */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-transparent text-white">
              <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3 text-left">Product Title</th>
                <th className="p-3 text-left">Main Category</th>
                <th className="p-3 text-left">Total Quantity Sold</th>
              </tr>
              </thead>
              <tbody>
              {currentProducts.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-3 text-center">No data available for the selected date range.</td>
                  </tr>
              ) : (
                  currentProducts.map((product) => (
                      <tr key={product.ProductTitle} className="border-b border-gray-800">
                        <td className="p-3">{product.ProductTitle}</td>
                        <td className="p-3">{product.MainCategoryName}</td>
                        <td className="p-3">{product.TotalQuantitySold}</td>
                      </tr>
                  ))
              )}
              </tbody>
            </table>
          </div>

          {/* Pagination Component */}
          <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredProducts.length}
              paginate={paginate}
              currentPage={currentPage}
          />
        </div>
  );
};

export default PWMO_Table;