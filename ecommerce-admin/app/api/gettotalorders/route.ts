import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function GET() {
  try {
    // 2. connect to database
    const connection = await mysql.createConnection(connectionParams);

    // 3. create a query to fetch data
    const get_exp_query = 'SELECT COUNT(*) as count FROM ecommerce.customerorder';

    // 4. exec the query and retrieve the results
    const [customercount]  = await connection.execute(get_exp_query);

    // // Extract the total customer count from the query result
    // const totalCustomers = customercount;

    // 5. close the connection
    await connection.end();
  

    // Return the result in a structured format
    return NextResponse.json(customercount );
  } catch (err) {
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
