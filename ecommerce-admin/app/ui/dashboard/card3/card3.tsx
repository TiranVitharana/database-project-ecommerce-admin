'use client';

import { MdSupervisedUserCircle } from 'react-icons/md';
import React, { useEffect, useState } from 'react';

interface Category {
  MainCategoryName: string;
  OrderCount: number;
}

const Card3 = () => {
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <div className="flex bg-[#182237] hover:bg-gray-700 p-5 rounded-lg gap-5 w-full">
      <MdSupervisedUserCircle size={24} className="text-white" />
      <div className="flex flex-col gap-2 text-white">
        <span className="text-2xl font-semibold">Product category with most orders</span>
        <span className="text-2xl font-medium">
          {categoryData ? (
            <h1>{categoryData.MainCategoryName}</h1> 
          ) : (
            'Loading...'
          )}
        </span>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Card3;
