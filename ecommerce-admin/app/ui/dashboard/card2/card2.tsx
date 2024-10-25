'use client';

import { MdSupervisedUserCircle } from 'react-icons/md';
import React, { useEffect, useState } from 'react';

interface Order {
  count: number;
}

const Card2 = () => {
  const [orderCount, setOrderCount] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const response = await fetch('/api/gettotalorders');

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`API error: ${errorMessage}`);
        }

        const data = await response.json();
        setOrderCount(data);
        console.log("Order count fetched:", data);
      } catch (err) {
        setError('Network error: ' + (err as Error).message);
      }
    };

    fetchOrderCount();
  }, []);

  return (
    <div className="flex bg-[#182237] hover:bg-gray-700 p-5 rounded-lg gap-5 w-full">
      <MdSupervisedUserCircle size={24} className="text-white" />
      <div className="flex flex-col gap-5">
        <span className="text-2xl font-semibold text-white">Total Orders</span>
        <span className="text-2xl font-medium text-white">
          {orderCount.length > 0 ? (
            orderCount.map((o, key) => (
              <h1 key={key}>{o.count}</h1>
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

export default Card2;
