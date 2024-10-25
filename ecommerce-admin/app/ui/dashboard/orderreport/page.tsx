'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<{ CustomerName: string }[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  interface Order {
    OrderID: number;
    OrderedDate: string;
    DeliveryAddress: string;
    OrderStatus: string;
    NetTotal: number;
    OrderedItems: string;
  }

  const [orderData, setOrderData] = useState<Order[]>([]);

  // Fetch customer suggestions based on search term
  useEffect(() => {
    if (searchTerm) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(`/api/searchcustomers?search_term=${searchTerm}`);
          setSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching customer suggestions:', error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  // Fetch customer orders once a customer is selected
  useEffect(() => {
    if (selectedCustomer) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`/api/customerorder?customer_name=${selectedCustomer}`);
          setOrderData(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
      fetchOrders();
    }
  }, [selectedCustomer]);

  // Handle selecting a customer from the suggestions
  const handleSelectCustomer = (customerName: string) => {
    setSelectedCustomer(customerName);
    setSearchTerm(''); // Clear the search input after selection
    setSuggestions([]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-12 mt-10">Customer Order Report</h1>

      {/* Search Bar */}
      <div className="relative mb-8  items-center justify-center align-middle">
        <input
          type="text"
          className="bg-[#151c2c] rounded-lg p-2 w-full border border-blue-500 text-white"
          placeholder="Search customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-[#151c2c] border border-gray-300 w-full mt-2 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((customer, index) => (
              <li
                key={index}
                className="p-2 hover:bgcolour cursor-pointer"
                onClick={() => handleSelectCustomer(customer.CustomerName)}
              >
                {customer.CustomerName}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display Orders */}
      {selectedCustomer && (
        <>
          
          <h3 className="text-2xl mb-12 mt-10">
            Showing orders for <span className="font-bold">{selectedCustomer}</span>
          </h3>
        </>
      )}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-screen">
  {orderData.length > 0 ? (
    orderData.map((order, index) => (
      <div key={index} className="bg-[#151c2c] p-6 rounded-lg w-[100%] shadow-md border">
        <h3 className="text-xl font-semibold text-white mb-4">Order #{order.OrderID}</h3>

        <table className="w-full text-white border-collapse">
          <tbody>
            <tr>
              <td className="p-2 font-semibold">Order Date:</td>
              <td className="p-2 border-t border-dashed border-gray-500">
                {new Date(order.OrderedDate).toLocaleDateString()}
              </td>
            </tr>
            <tr>
              <td className="p-2 font-semibold">Delivery Address:</td>
              <td className="p-2 border-t border-dashed border-gray-500">{order.DeliveryAddress}</td>
            </tr>
            <tr>
              <td className="p-2 font-semibold">Order Status:</td>
              <td className="p-2 border-t border-dashed border-gray-500">{order.OrderStatus}</td>
            </tr>
            <tr>
              <td className="p-2 font-semibold">Ordered Items:</td>
              <td className="p-2 border-t border-dashed border-gray-500">{order.OrderedItems}</td>
            </tr>
            <tr>
              <td className="p-2 font-semibold">Net Total:</td>
              <td className="p-2 border-t border-dashed border-gray-500">${order.NetTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    ))
  ) : selectedCustomer ? (
    <p className="text-gray-600">No orders found for {selectedCustomer}.</p>
  ) : (
    <p className="text-gray-600">Start by searching for a customer to view their orders.</p>
  )}
</div>

    </div>
  );
};

export default CustomerOrders;
