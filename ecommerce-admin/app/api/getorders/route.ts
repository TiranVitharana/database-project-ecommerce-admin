import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function GET() {
    try {
        // Connect to the database
        const connection = await mysql.createConnection(connectionParams);


        const [rows] = await connection.execute('CALL GetOrders()');

        // Close the connection
        await connection.end();

        // Return the result in a structured format
        return NextResponse.json({ orders: rows[0]});
    } catch (err) {
        // Log and handle errors
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