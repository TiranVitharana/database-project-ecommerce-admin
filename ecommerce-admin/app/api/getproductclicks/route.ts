/* eslint-disable prefer-const */
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

// Define the type for the result set (adjusted to match your output structure)
type ProductClick = {
  ProductTitle: string;
  ClickDate: string;
  Count: number;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productTitle = searchParams.get('product_title');
 

  // Validate that productTitle is provided
  if (!productTitle) {
    return NextResponse.json(
      { error: 'Product title is required' },
      { status: 400 }
    );
  }

  try {
    // 2. Connect to the database
    const connection = await mysql.createConnection(connectionParams);

    // 3. Call the stored procedure with the provided product title
    const [rows]: [ProductClick[]] = await connection.execute(
      'CALL GetProductClicks(?)',
      [productTitle]
    );

    // 4. Close the connection
    await connection.end();

    // Return only the product click data (the first element of the result array)
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
