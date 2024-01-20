
import { connect } from "@/dbConfig/dbconfig";
import Transaction from "@/models/TransactionModel";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest){
    try {
        const reqBody = await request;
        const month = parseInt(reqBody.nextUrl.searchParams.get("month") || "3");

        const stats = await axios.get(process.env.DOMAIN + `/api/statistics?month=${month}`);
        const statData = stats.data;

        const barchart = await axios.get(process.env.DOMAIN + `/api/barchart?month=${month}`);
        const barData = barchart.data.barData;

        const piechart = await axios.get(process.env.DOMAIN + `/api/piechart?month=${month}`);
        const pieData = piechart.data.pieData;

        console.log(statData,barData,pieData);
        

        return NextResponse.json({
            statData,
            barData,
            pieData,
        }, {status: 200});

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}