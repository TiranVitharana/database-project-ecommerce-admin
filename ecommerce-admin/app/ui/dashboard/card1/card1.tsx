'use client';

import { MdSupervisedUserCircle } from 'react-icons/md';
import React, { useEffect, useState } from 'react';

interface Customer {
  count: number;
}

const Card1 = () => {
  const [customerCount, setCustomerCount] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerCount = async () => {
      try {
        const response = await fetch('/api/getcustomercount');

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`API error: ${errorMessage}`);
        }

        const data = await response.json();
        setCustomerCount(data);
        console.log("Customer count fetched:", data);
      } catch (err) {
        setError('Network error: ' + (err as Error).message);
      }
    };

    fetchCustomerCount();
  }, []);

  return (
    <div className="flex bg-[#182237] hover:bg-gray-700 p-5 rounded-lg gap-5 w-full">
      <MdSupervisedUserCircle size={24} className="text-white" />
      <div className="flex flex-col gap-5">
        <span className="text-2xl font-semibold text-white">Total Customers</span>
        <span className="text-2xl font-medium text-white">
          {customerCount.length > 0 ? (
            customerCount.map((c, key) => (
              <h1 key={key}>{c.count}</h1>
            ))
          ) : (
            'Loading...'
          )}
        </span>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Card1;
