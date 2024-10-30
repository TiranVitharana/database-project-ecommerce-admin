'use client'

import React, { useState } from 'react';
import "./global.css"



export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }
  return (
    <div className="div">
      <input 
      type="text" 
      value={searchTerm} 
      onChange={handleInputChange} 
      placeholder="Search..." 
      />
      <h1>{searchTerm}</h1>
    </div>
  );
}
