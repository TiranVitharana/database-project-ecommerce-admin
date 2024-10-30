// app/api/test-connection/route.ts
import { NextResponse } from 'next/server';
import { createDBConnection } from '@/lib/db';

export async function GET() {
    try {
        const connection = await createDBConnection();
        const [result] = await connection.execute('SELECT 1 + 1 AS result');
        await connection.end();

        return NextResponse.json({
            status: 'success',
            message: 'Database connected successfully',
            test: result
        });
    } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json({
            status: 'error',
            message: 'Failed to connect to database',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}