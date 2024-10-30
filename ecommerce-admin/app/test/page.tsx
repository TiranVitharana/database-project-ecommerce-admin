'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<{ ProductTitle: string }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  // Fetch search results when typing in the search bar
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchTerm.trim().length > 0) {
        try {
          const response = await axios.get(`/api/searchproducts?search_term=${searchTerm}`);
          setSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching product suggestions:', error);
          setSuggestions([]); // Clear suggestions on error
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchProducts();
    }, 300); // Adding a debounce to prevent excessive API calls

    return () => clearTimeout(debounceFetch); // Cleanup on unmount or change of searchTerm
  }, [searchTerm]);

  // Handle the selection of a product from the suggestions
  const handleSelectProduct = (productName: string) => {
    setSelectedProduct(productName);
    setSearchTerm(productName); // Set the search bar value to the selected product
    setSuggestions([]); // Clear suggestions once a product is selected

    // Optionally, you can call another API or perform an action with the selected product name here
    console.log('Selected Product:', productName); // For demonstration
  };

  return (
    <div className="relative w-80 mx-auto mt-10">
      {/* Search Input */}
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
          {suggestions.map((product, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectProduct(product.ProductTitle)}
            >
              {product.ProductTitle}
            </li>
          ))}
        </ul>
      )}

      {/* Display the selected product */}
      {selectedProduct && (
        <div className="mt-4 text-gray-700">
          <strong>Selected Product:</strong> {selectedProduct}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
