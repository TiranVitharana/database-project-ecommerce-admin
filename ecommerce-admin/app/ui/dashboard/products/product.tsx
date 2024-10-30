'use client'
import { useEffect, useState } from "react";
import Pagination from "@/app/ui/dashboard/pagination/pagination";

const ProductsPage = () => {
  interface Product {
    ProductID: string;
    ProductName: string;
    Price: number;
    AvailableStock: number;
    MainCategoryName: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products data from the main API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/getproducts');
        const data = await response.json();
       
        setProducts(data || []);
        
        setFilteredProducts(data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search input change and filter products directly in the list
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to the first page on a new search
    if (term === "") {
      setFilteredProducts(products);
    } else {
      const lowercasedTerm = term.toLowerCase();
      const filtered = products.filter(product =>
        product.ProductName.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredProducts(filtered);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-[#151c2c] p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-semibold text-white mb-4">Products</h1>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none"
            placeholder="Search products by name"
          />
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-transparent text-white">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3 text-left">Product ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Available Stock</th>
                <th className="p-3 text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr key={product.ProductID} className="border-b border-gray-800">
                    <td className="p-3">{product.ProductID}</td>
                    <td className="p-3">{product.ProductName}</td>
                    <td className="p-3">${product.Price}</td>
                    <td className="p-3">{product.AvailableStock}</td>
                    <td className="p-3">{product.MainCategoryName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-3 text-center">No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Component */}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredProducts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default ProductsPage;
