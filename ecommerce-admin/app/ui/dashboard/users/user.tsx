'use client'
import { useEffect, useState } from "react";
import Pagination from "@/app/ui/dashboard/pagination/pagination";

const UsersPage = () => {
  interface User {
    CustomerID: string;
    CustomerName: string;
    Email: string;
    PhoneNumber: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users data from the main API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/getcustomers');
        const data = await response.json();
        setUsers(data.customers || []);
        setFilteredUsers(data.customers || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle search input change and filter users directly in the list
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to the first page on a new search

    if (term === "") {
      setFilteredUsers(users);
    } else {
      const lowercasedTerm = term.toLowerCase();
      const filtered = users.filter(user =>
          user.CustomerID.toString().includes(lowercasedTerm) ||
          user.CustomerName.toLowerCase().includes(lowercasedTerm) ||
          user.Email.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredUsers(filtered);
    }
  };


  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-[#151c2c] p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-semibold text-white mb-4">Customers</h1>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none"
            placeholder="Search users by name or email"
          />
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-transparent text-white">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3 text-left">Customer ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.CustomerID} className="border-b border-gray-800">
                  <td className="p-3">{user.CustomerID}</td>
                  <td className="p-3">{user.CustomerName}</td>
                  <td className="p-3">{user.Email}</td>
                  <td className="p-3">{user.PhoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Component */}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredUsers.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default UsersPage;
