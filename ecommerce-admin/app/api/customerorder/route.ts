import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

// Get database connection settings
let connectionParams = GetDBSettings();

// Define the type for the result set
type OrderDetails = {
  CustomerName: string;
  OrderID: number;
  OrderedDate: string;
  DeliveryAddress: string;
  OrderStatus: string;
  NetTotal: number;
  OrderedItems: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customerName = searchParams.get('customer_name');

  // Validate that the customer name is provided
  if (!customerName) {
    return NextResponse.json(
      { error: 'Customer name is required' },
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    const connection = await mysql.createConnection(connectionParams);

    // Call the stored procedure with the provided customer name
    const [rows]: [OrderDetails[]] = await connection.execute(
      'CALL GetCustomerOrders(?)',
      [customerName]
    );

    // Close the connection
    await connection.end();

    // Return the customer orders result
    return NextResponse.json(rows[0]); // Return all orders for the customer
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
