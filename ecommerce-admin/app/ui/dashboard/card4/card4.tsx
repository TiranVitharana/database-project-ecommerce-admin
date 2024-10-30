'use client';

import { MdSupervisedUserCircle } from 'react-icons/md';
import React, { useEffect, useState } from 'react';

interface Income {
    amount: number; // Assuming the API returns an object with an 'amount' property for today's income
}

const Card4 = () => {
    const [income, setIncome] = useState<Income | null>(null); // Initialize as null since there will be no data initially
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchIncome = async () => {
            try {
                const response = await fetch('/api/todayincome');

                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`API error: ${errorMessage}`);
                }

                const data: Income = await response.json();
                setIncome(data);
                console.log("Today's income fetched:", data);
            } catch (err) {
                setError('Network error: ' + (err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchIncome();
    }, []);

    return (
        <div className="flex bg-backgroundSoft p-5 rounded-lg gap-5 w-full hover:bg-[#2e374a]">
            <MdSupervisedUserCircle size={24} />
            <div className="flex flex-col gap-5">
                <span className="font-semibold">Today's Income</span>
                <span className="text-2xl font-medium">
                    {isLoading ? (
                        <div className="h-3 w-40 bg-gray-300 animate-fast-pulse rounded mt-5"></div>
                    ) : (
                        income ? (
                            <h1>{income.amount}</h1>
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

export default Card4;
