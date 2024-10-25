/* eslint-disable prefer-const */
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

// Define the type for the result set (adjusted to match your output structure)
type Transaction = {
  Name: string;
  Status: string;
  Date: string;
  Amount: number;
};

export async function GET() {
  try {
    // 2. connect to the database
    const connection = await mysql.createConnection(connectionParams);

    // 3. call the stored procedure to get the latest transactions
    const [rows]: [Transaction[]] = await connection.execute(
      'CALL GetLatestTransactions()'
    );

    // 4. close the connection
    await connection.end();

    // Return the transaction data (the first element of the result array)
    return NextResponse.json(rows[0]); 
  } catch (err) {
    if (err instanceof Error) {
      console.error('ERROR: API - ', err.message);
    } else {
      console.error('ERROR: API - ', err);
    }

    const response = {
      error: err instanceof Error ? err.message : String(err),
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
