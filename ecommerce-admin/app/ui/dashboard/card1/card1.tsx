'use client';

import { MdSupervisedUserCircle } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa'
import React, { useEffect, useState } from 'react';

interface Customer {
  count: number;
}

const Card1 = () => {
  const [customerCount, setCustomerCount] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerCount();
  }, []);

  return (
      <div className="flex bg-backgroundSoft p-5 rounded-lg gap-5 w-full hover:bg-[#2e374a]">
        <FaUserFriends size={24} />
        <div className="flex flex-col gap-5">
          <span className="font-semibold">Total Users</span>
          <span className="text-2xl font-medium">
          {isLoading ? (
              <div className="h-3 w-40 bg-gray-300 animate-fast-pulse rounded mt-5"></div>

          ) : (
              customerCount.length > 0 ? (
                  customerCount.map((c, key) => (
                      <h1 key={key}>{c.count}</h1>
                  ))
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

export default Card1;
