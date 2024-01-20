
import { connect } from "@/dbConfig/dbconfig";
import Transaction from "@/models/TransactionModel";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest){
    try {
        const reqBody = await request;
        const page = parseInt(reqBody.nextUrl.searchParams.get("page") || "0");
        const limit = 10;
        const search = reqBody.nextUrl.searchParams.get("search") || " ";
        const month = parseInt(reqBody.nextUrl.searchParams.get("month") || "3");
        
        var transactions;
        var total;

        if (isNaN(search as any) || (search == " ")){
            transactions = await Transaction.find({
                $and: [
                    {
                        $expr: {
                            $eq: [{ $month: "$dateOfSale" }, month],
                            
                        }
                    },
                    {
                        $or: [
                            {
                                title: {
                                    $regex: search,
                                    $options: "i" 
                                }
                            },
                            {
                                description: {
                                    $regex: search,
                                    $options: "i" 
                                }
                            }
                        ]
                    }
                ]
            })
            .skip(page * limit)
            .limit(limit);

            total = await Transaction.countDocuments({
                $and: [
                    {
                        $expr: {
                            $eq: [{ $month: "$dateOfSale" }, month],
                            
                        }
                    },
                    {
                        $or: [
                            {
                                title: {
                                    $regex: search,
                                    $options: "i"
                                }
                            },
                            {
                                description: {
                                    $regex: search,
                                    $options: "i" 
                                }
                            }
                        ]
                    }
                ]
            })
        } else {
            transactions = await Transaction.find({
                $and: [
                    {
                        $expr: {
                            $eq: [{ $month: "$dateOfSale" }, month],
                            
                        }
                    },
                    {
                        price: {
                            $eq: search
                        }
                    }
                ]
            })
            .skip(page * limit)
            .limit(limit);
    
            total = await Transaction.countDocuments({
                $and: [
                    {
                        $expr: {
                            $eq: [{ $month: "$dateOfSale" }, month],
                            
                        }
                    },
                    {
                        price: {
                            $eq: search
                        }
                    }
                ]
            })
        }

        return NextResponse.json({
            total,
            page: page + 1,
            transactions,
        }, {status: 200});

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}