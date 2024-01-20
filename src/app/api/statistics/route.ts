
import { connect } from "@/dbConfig/dbconfig";
import Transaction from "@/models/TransactionModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest){
    try {
        const reqBody = await request;
        const month = parseInt(reqBody.nextUrl.searchParams.get("month") || "3");

        const statsData = await Transaction.find(
            {
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, month]
                }
            });

        let totalAmount = 0;
        let totalSaleTransactions = 0;
        let totalNonSaleTransactions = 0;

        statsData.forEach((tra: any) =>{
            totalAmount += Number(tra.price);
            if (tra.sold === true) {
                totalSaleTransactions += 1
            } else {
                totalNonSaleTransactions += 1
            }
        })
        totalAmount = Number(totalAmount.toFixed(2));
        console.log(totalAmount);
        

        return NextResponse.json({
            totalAmount,
            totalSaleTransactions,
            totalNonSaleTransactions,
        }, {status: 200});

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}