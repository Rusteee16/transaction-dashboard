
import { connect } from "@/dbConfig/dbconfig";
import Transaction from "@/models/TransactionModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest){
    try {
        const reqBody = await request;
        const month = parseInt(reqBody.nextUrl.searchParams.get("month") || "3");

        const barData = await Transaction.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, month]
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $switch: {
                        branches: [
                            { case: { $lte: ['$price', 100] }, then: '0 - 100' },
                            { case: { $lte: ['$price', 200] }, then: '101 - 200' },
                            { case: { $lte: ['$price', 300] }, then: '201 - 300' },
                            { case: { $lte: ['$price', 400] }, then: '301 - 400' },
                            { case: { $lte: ['$price', 500] }, then: '401 - 500' },
                            { case: { $lte: ['$price', 600] }, then: '501 - 600' },
                            { case: { $lte: ['$price', 700] }, then: '601 - 700' },
                            { case: { $lte: ['$price', 800] }, then: '701 - 800' },
                            { case: { $lte: ['$price', 900] }, then: '801 - 900' },
                            { case: { $gte: ['$price', 901] }, then: '901 - above' }
                        ],
                        default: 'Other'
                        }
                  },
                  count: { $sum: 1 }
                }
              }
            ]);


        return NextResponse.json({
            barData,
        }, {status: 200});

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}