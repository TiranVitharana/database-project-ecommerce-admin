import { NextResponse, NextRequest } from 'next/server'
import mysql from 'mysql2/promise'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GetDBSettings, IDBSettings } from '../../../sharedCode/common'

export async function GET(request: NextRequest) {
  try {
    // 1. Get URL parameters
    const searchParams = request.nextUrl.searchParams
    const year = searchParams.get('year')
    

    // Validate parameters
    if (!year) {
      return NextResponse.json(
        { error: 'Year and quarter parameters are required' },
        { status: 400 }
      )
    }

    // Validate year and quarter format
    const yearNum = parseInt(year)
    

    if (isNaN(yearNum)) {
      return NextResponse.json(
        { error: 'Invalid year or quarter. Quarter must be between 1 and 4' },
        { status: 400 }
      )
    }

    // 2. Connect to database
    const connectionParams = GetDBSettings()
    const connection = await mysql.createConnection(connectionParams)

    // 3. Call the stored procedure
    const query1 = 'CALL QuarterlySalesReport(?, 1)'
    const query2 = 'CALL QuarterlySalesReport(?, 2)'
    const query3 = 'CALL QuarterlySalesReport(?, 3)'
    const query4 = 'CALL QuarterlySalesReport(?, 4)'
    const values = [yearNum]

    // 4. Execute the procedure and get results
    const [results1] = await connection.execute(query1, values)
    const [results2] = await connection.execute(query2, values)
    const [results3] = await connection.execute(query3, values)
    const [results4] = await connection.execute(query4, values)
    
    // Close the connection
    await connection.end()

    // 5. Format and return the response
    // MySQL2 returns procedure results as an array where first element is the result set
    const salesData1 = Array.isArray(results1) && results1.length > 0 ? results1[0] : []
    const salesData2 = Array.isArray(results2) && results2.length > 0 ? results2[0] : []
    const salesData3 = Array.isArray(results3) && results3.length > 0 ? results3[0] : []
    const salesData4 = Array.isArray(results4) && results4.length > 0 ? results4[0] : []

    return NextResponse.json({
      year: yearNum,
      sales1: salesData1,
      sales2: salesData2,
      sales3: salesData3,
      sales4: salesData4,
    })

  } catch (err) {
    console.error('ERROR: API - ', (err as Error).message)
    
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    )
  }
}