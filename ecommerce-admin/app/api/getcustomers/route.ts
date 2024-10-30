import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function GET() {
  try {
    // 2. connect to database
    const connection = await mysql.createConnection(connectionParams);

    // 3. call the stored procedure GetCustomers()
    const [rows] = await connection.execute('CALL GetCustomers()');

    // 5. close the connection
    await connection.end();

    // Return the result in a structured format
    return NextResponse.json({ customers: rows[0] });
  } catch (err) {
    // Log and handle errors
    if (err instanceof Error) {
      console.error('ERROR: API - ', err.message);
    } else {
      console.error('ERROR: API - ', err);
    }

    const response = {
      error: err instanceof Error ? err.message : String(err),
      returnedStatus: 500, // Change status code to 500 for errors
    };

    return NextResponse.json(response, { status: 500 });
  }
}
