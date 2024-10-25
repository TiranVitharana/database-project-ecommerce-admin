'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./transactions.module.css";

interface Transaction {
  Name: string;
  Status: string;
  Date: string;
  Amount: number;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/getlatesttransactions"); // Assuming this is the API route
        if (!res.ok) {
          throw new Error("Failed to fetch transactions.");
        }
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <><h1 className="text-4xl font-bold mb-12 mt-12">Latest Transactions</h1><div className={styles.container}>
          <table className={styles.table}>
              <thead>
                  <tr>
                      <td>Name</td>
                      <td>Status</td>
                      <td>Date</td>
                      <td>Amount</td>
                  </tr>
              </thead>
              <tbody>
                  {transactions.map((transaction, index) => (
                      <tr key={index}>
                          <td>
                              <div className={styles.user}>
                                  <Image
                                      src="/user.png"
                                      alt=""
                                      width={40}
                                      height={40}
                                      className={styles.userImage} />
                                  {transaction.Name}
                              </div>
                          </td>
                          <td>
                              <span
                                  className={`${styles.status} ${transaction.Status.toLowerCase() === "processing"
                                          ? styles.pending
                                          : transaction.Status.toLowerCase() === "completed"
                                              ? styles.done
                                              : transaction.Status.toLowerCase() === "shipped"
                                                  ? styles.shipped
                                                  : styles.cancelled}`}
                              >
                                  {transaction.Status}
                              </span>
                          </td>
                          <td>{new Date(transaction.Date).toLocaleDateString()}</td>
                          <td>${transaction.Amount.toLocaleString()}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div></>
  );
};

export default Transactions;
