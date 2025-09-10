import { Request, Response, NextFunction } from "express";
import Transaction from "../models/Transaction";
import { asyncHandler } from "../utils/asyncHandler";

export const getAllTransactions = asyncHandler(
  async (req: Request, res: Response) => {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json({
      success: true,
      data: transactions,
    });
  }
);

export const getTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.json({
      success: true,
      data: transaction,
    });
  }
);

export const createTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, amount, date, category } = req.body;

    const transaction = new Transaction({
      title,
      amount,
      date: new Date(date),
      category,
    });

    const savedTransaction = await transaction.save();

    res.status(201).json({
      success: true,
      data: savedTransaction,
    });
  }
);

export const updateTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, amount, date, category } = req.body;

    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        title,
        amount,
        date: new Date(date),
        category,
      },
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.json({
      success: true,
      data: transaction,
    });
  }
);

export const deleteTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.json({
      success: true,
      message: "Transaction deleted successfully",
    });
  }
);
