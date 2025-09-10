import { Request, Response, NextFunction } from "express";
import Transaction from "../models/Transaction";
import { asyncHandler } from "../utils/asyncHandler";

export const getAllTransactions = asyncHandler(
  async (req: Request, res: Response) => {
    const { category, type, sortOrder = "desc" } = req.query;
    const filter: any = {};

    switch (category as string) {
      case "Food & Dining":
      case "Transportation":
      case "Shopping":
      case "Entertainment":
      case "Bills & Utilities":
      case "Healthcare":
      case "Education":
      case "Travel":
      case "Income":
      case "Investment":
      case "Other":
        filter.category = category;
        break;
      default:
        break;
    }

    switch (type as string) {
      case "income":
        filter.amount = { $gte: 0 };
        break;
      case "expense":
        filter.amount = { $lt: 0 };
        break;
      default:
        break;
    }

    let sortDirection: 1 | -1;
    switch (sortOrder as string) {
      case "asc":
        sortDirection = 1;
        break;
      case "desc":
      default:
        sortDirection = -1;
        break;
    }

    const transactions = await Transaction.find(filter)
      .sort({ date: sortDirection })
      .lean();

    res.send({
      success: true,
      transactions: transactions,
      filters: {
        category: category || null,
        type: type || null,
        sortOrder: sortDirection === 1 ? "asc" : "desc",
      },
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
