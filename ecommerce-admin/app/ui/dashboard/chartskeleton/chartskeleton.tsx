import React from 'react';

// Skeleton component for the chart
const ChartSkeleton = () => (
    <div className="animate-pulse flex flex-col space-y-3 p-5 bg-backgroundSoft rounded-lg">
        {/* Title and subtitle skeleton */}
        <div className="h-7 w-1/3 bg-gray-700 rounded mb-2"></div>
        <div className="h-5 w-1/4 bg-gray-600 rounded mb-4"></div>

        {/* X-axis skeleton */}
        <div className="h-10 w-full bg-gray-700 rounded mt-4"></div>

        {/* Bar skeletons */}
        <div className="flex space-x-2 mt-2">
            <div className="h-32 w-10 bg-gray-600 rounded"></div>
            <div className="h-24 w-10 bg-gray-600 rounded"></div>
            <div className="h-28 w-10 bg-gray-600 rounded"></div>
            <div className="h-20 w-10 bg-gray-600 rounded"></div>
        </div>

        {/* Y-axis labels skeleton */}
        {/*<div className="flex flex-col space-y-1 mt-2">*/}
        {/*    <div className="h-4 w-12 bg-gray-700 rounded"></div>*/}
        {/*    <div className="h-4 w-10 bg-gray-700 rounded"></div>*/}
        {/*    <div className="h-4 w-8 bg-gray-700 rounded"></div>*/}
        {/*</div>*/}
    </div>
);

export default ChartSkeleton;
