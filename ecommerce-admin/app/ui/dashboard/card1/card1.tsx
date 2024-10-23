'use client';

import styles from './card.module.css';
import { MdSupervisedUserCircle } from 'react-icons/md';
import React, { useEffect, useState } from 'react';

interface Customer {
  count: number;
}

const Card1 = () => {
  const [customerCount, setCustomerCount] = useState<Customer[]>([]); // Expect an array of customers
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchCustomerCount = async () => {
      try {
        const response = await fetch ('/api/getcustomercount'); // Ensure the API URL is correct

        if (!response.ok) {
          const errorMessage = await response.text(); // Read as text for better error reporting
          throw new Error(`API error: ${errorMessage}`);
        }

        const data = await response.json();

        setCustomerCount(data); // Assuming 'data' is an array of objects with 'count' fields
        console.log("Customer count fetched:", data);
      } catch (err) {
        setError('Network error: ' + (err as Error).message);
      }
    };

    fetchCustomerCount(); // Trigger the API call when component mounts
  }, []);

  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Total Customers</span>
        <span className={styles.number}>
          {customerCount.length > 0 ? (
            customerCount.map((c, key) => (
              <h1 key={key}>{c.count}</h1> // Display count for each customer object
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

export default Card1;
