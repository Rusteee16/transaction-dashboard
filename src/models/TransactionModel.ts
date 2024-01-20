
import mongoose, { Document, Schema } from 'mongoose';

const transactionSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  title: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  sold: { 
    type: Boolean, 
    required: true 
  },
  dateOfSale: { 
    type: Date, 
    required: true 
  },
});

const Transaction = mongoose.models.transactions || mongoose.model('transactions', transactionSchema);

export default Transaction;
