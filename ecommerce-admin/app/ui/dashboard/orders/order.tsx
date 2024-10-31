'use client'

import { useEffect, useState } from "react";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";

const OrdersPage = () => {
  interface Order {
    CustomerID: string;
    OrderID: string;
    Email: string;
    PhoneNumber: string;
    OrderedDate: string;
    DeliveryMethod: string;
    PaymentMethod: string;
    Status: string;
    NetTotal: number;
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // Default to "All" for showing all orders initially

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/getorders');
        const data = await response.json();

        const ordersArray = Array.isArray(data.orders) ? data.orders : [];
        setOrders(ordersArray);
        setFilteredOrders(ordersArray);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on search term and status
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = orders.filter(order => {
      const matchesSearch = order.Email.toLowerCase().includes(lowercasedTerm) || 
                            order.Status.toLowerCase().includes(lowercasedTerm);
      const matchesStatus = statusFilter === "All" || order.Status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-[#151c2c] p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-semibold text-white mb-4">Orders</h1>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none"
            placeholder="Search orders by email or status"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="flex items-center justify-center mb-6 mt-6">
          <div className="w-56">
            <Select onValueChange={(value) => setStatusFilter(value)} defaultValue="All">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select order status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="All">All</SelectItem> {/* "All" shows all orders */}
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-transparent text-white text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-2 text-left">Order ID</th>
                <th className="p-2 text-left">Customer ID</th>
                <th className="p-2 text-left" style={{ maxWidth: "150px" }}>Email</th>
                <th className="p-2 text-left" style={{ maxWidth: "120px" }}>Phone Number</th>
                <th className="p-2 text-left">Ordered Date</th>
                <th className="p-2 text-left">Delivery Method</th>
                <th className="p-2 text-left">Payment Method</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Net Total</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.OrderID} className="border-b border-gray-800">
                  <td className="p-2">{order.OrderID}</td>
                  <td className="p-2">{order.CustomerID}</td>
                  <td className="p-2 truncate" title={order.Email}>{order.Email}</td>
                  <td className="p-2">{order.PhoneNumber}</td>
                  <td className="p-2">{new Date(order.OrderedDate).toLocaleDateString()}</td>
                  <td className="p-2">{order.DeliveryMethod}</td>
                  <td className="p-2">{order.PaymentMethod}</td>
                  <td className="p-2">{order.Status}</td>
                  <td className="p-2">{order.NetTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Component */}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredOrders.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default OrdersPage;
