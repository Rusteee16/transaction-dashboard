
import { connect } from "@/dbConfig/dbconfig";
import Transaction from "@/models/TransactionModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest){
    try {
        const reqBody = await request;
        const month = parseInt(reqBody.nextUrl.searchParams.get("month") || "3");

        const pieData = await Transaction.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, month]
                    }
                }
            },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
              }
            ]);

        console.log(pieData);
        


        return NextResponse.json({
            pieData,
        }, {status: 200});

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}