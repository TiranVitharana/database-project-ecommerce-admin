'use client';

import { FaClipboardList } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

interface Order {
  count: number;
}

const Card2 = () => {
  const [orderCount, setOrderCount] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderCount();
  }, []);

  return (
      <div className="flex bg-backgroundSoft p-5 rounded-lg gap-5 w-full hover:bg-[#2e374a]">
        <FaClipboardList size={24} />
        <div className="flex flex-col gap-5">
          <span className="font-semibold">Total Orders</span>
          <span className="text-2xl font-medium">
          {isLoading ? (
              <div className="h-3 w-40 bg-gray-300 animate-fast-pulse rounded mt-5"></div>
          ) : (
              orderCount.length > 0 ? (
                  orderCount.map((o, key) => (
                      <h1 key={key}>{o.count}</h1>
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

export default Card2;
