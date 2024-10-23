'use client';

import styles from './card.module.css';
import { MdSupervisedUserCircle } from 'react-icons/md';
import React, { useEffect, useState } from 'react';

interface Order {
  count: number;
}

const Card2 = () => {
  const [orderCount, setOrderCount] = useState<Order[]>([]); // Expect an array of orders
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchOrderCount = async () => {
      try {
        const response = await fetch('/api/gettotalorders'); // Ensure the API URL is correct for fetching total orders

        if (!response.ok) {
          const errorMessage = await response.text(); // Read as text for better error reporting
          throw new Error(`API error: ${errorMessage}`);
        }

        const data = await response.json();

        setOrderCount(data); // Assuming 'data' is an array of objects with 'count' fields
        console.log("Order count fetched:", data);
      } catch (err) {
        setError('Network error: ' + (err as Error).message);
      }
    };

    fetchOrderCount(); // Trigger the API call when component mounts
  }, []);

  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Total Orders</span>
        <span className={styles.number}>
          {orderCount.length > 0 ? (
            orderCount.map((o, key) => (
              <h1 key={key}>{o.count}</h1> // Display count for each order object
            ))
          ) : (
            'Loading...'
          )}
        </span>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Card2;
