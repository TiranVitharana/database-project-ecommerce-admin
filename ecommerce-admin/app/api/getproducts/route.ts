import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common'; // Adjust the path as needed

let connectionParams = GetDBSettings();

export async function GET() {
  try {
    // Connect to the database
    const connection = await mysql.createConnection(connectionParams);

    // Call the stored procedure
    const [rows] = await connection.execute('CALL GetProducts()');

    // Close the connection
    await connection.end();

    // Return the result in a structured format
    return NextResponse.json(rows[0]); // rows[0] contains the result set from the procedure
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
