import {connect} from "@/dbConfig/dbconfig";
import Transaction from "@/models/TransactionModel";
import { NextRequest, NextResponse } from "next/server";

connect();

type item = {
    id: Number,
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    dateOfSale: Date
}

export async function GET( request: NextRequest ) {
    try {
        const response = await fetch('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const apiData = await response.json();

        const items = apiData.map(({ id, title, price, description, category, image, sold, dateOfSale }: item) => ({
              id,
              title,
              description,
              price,
              category,
              image,
              sold,
              dateOfSale: new Date(dateOfSale),
            }));

        items.forEach(async (i: item) => {
            try {
                const doc = await Transaction.findOneAndUpdate( i, i, {
                    new: true, upsert: true
                  })
            } catch (error: any) {
                console.log(error.message);
                return NextResponse.json({error: error.message}, {status: 500})
            }
        });

        return NextResponse.json({message: "Database Updated.", success: true});

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({error: error.message}, {status: 500})
        
    }
}
