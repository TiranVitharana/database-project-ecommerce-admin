'use client';

import styles from './card.module.css';
import { MdSupervisedUserCircle } from 'react-icons/md';
import React, { useEffect, useState } from 'react';

interface Category {
  MainCategoryName: string;
  OrderCount: number;
}

const Card3 = () => {
  const [categoryData, setCategoryData] = useState<Category | null>(null); // Expect a single object, not an array
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchCategoryData = async () => {
      try {
        const response = await fetch('/api/getcategorywithmostorders'); // Ensure the API URL is correct

        if (!response.ok) {
          const errorMessage = await response.text(); // Read as text for better error reporting
          throw new Error(`API error: ${errorMessage}`);
        }

        const data = await response.json();

        setCategoryData(data[0]); // Assuming API returns an array, select the first result
        console.log("Category data fetched:", data[0]);
      } catch (err) {
        setError('Network error: ' + (err as Error).message);
      }
    };

    fetchCategoryData(); // Trigger the API call when component mounts
  }, []);

  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className="text-white font-bold">
        <span className={styles.title}>Product category with most orders</span>
        <span className={styles.number}>
          {categoryData ? (
            <>
              <h1>{categoryData.MainCategoryName}</h1>  {/* Display the main category name */}
              
            </>
          ) : (
            'Loading...'
          )}
        </span>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Card3;
