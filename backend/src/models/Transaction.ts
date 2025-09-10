import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  title: string;
  amount: number;
  date: Date;
  category: string;
}

const TransactionSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
