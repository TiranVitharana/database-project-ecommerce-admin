'use client';

import { FaTags } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

interface Category {
  MainCategoryName: string;
  OrderCount: number;
}

const Card3 = () => {
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch('/api/getcategorywithmostorders');

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`API error: ${errorMessage}`);
        }

        const data = await response.json();
        setCategoryData(data[0]); // Assuming API returns an array, select the first result
        console.log("Category data fetched:", data[0]);
      } catch (err) {
        setError('Network error: ' + (err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  return (
      <div className="flex bg-backgroundSoft p-5 rounded-lg gap-5 w-full hover:bg-[#2e374a]">
        <FaTags size={24} />
        <div className="flex flex-col gap-5">
          <span className="font-semibold">Most Popular Category</span>
          <span className="text-2xl font-medium">
          {isLoading ? (
              <div className="h-3 w-40 bg-gray-300 animate-fast-pulse rounded mt-5"></div>
          ) : (
              categoryData ? (
                  <h1>{categoryData.MainCategoryName}</h1>
              ) : (
                  'No data'
              )
          )}
        </span>
          <span className="text-sm font-light">
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </span>
        </div>
      </div>
  );
};

export default Card3;
