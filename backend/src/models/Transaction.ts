import mongoose, { Schema, Document } from "mongoose";

export interface ITransactionDocument extends Document {
  title: string;
  amount: number;
  date: Date;
  category: string;
  type: "income" | "expense";
  userId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
