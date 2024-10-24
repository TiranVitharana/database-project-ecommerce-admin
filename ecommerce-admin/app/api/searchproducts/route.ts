import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

// Define the type for the result set
type Product = {
  ProductTitle: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get('search_term');

  // Validate that the search term is provided
  if (!searchTerm) {
    return NextResponse.json(
      { error: 'Search term is required' },
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    const connection = await mysql.createConnection(connectionParams);

    // Call the stored procedure with the provided search term
    const [rows]: [Product[]] = await connection.execute(
      'CALL SearchProducts(?)',
      [searchTerm]
    );

    // Close the connection
    await connection.end();

    // Return the search result data
    return NextResponse.json(rows[0]); // Return all matching product titles
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
