"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const zod_1 = __importDefault(require("zod"));
const borrow_models_1 = require("../models/borrow.models");
const mongodb_1 = require("mongodb");
exports.borrowRouter = express_1.default.Router();
const Borrow = zod_1.default.object({
    book: zod_1.default.string(),
    quantity: zod_1.default.number(),
    dueDate: zod_1.default.string(),
});
// Borrow a book
exports.borrowRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.quantity <= 0) {
        return res.status(400).json({
            "message": "Quantity must be greater than zero",
            "success": false,
            "error": "Invalid quantity"
        });
    }
    try {
        let data = Borrow.parse(req.body);
        try {
            yield book_model_1.bookModel.copiesCalculator(data.book, data.quantity);
        }
        catch (error) {
            res.status(400).json({
                "message": "Failed to borrow book",
                "success": false,
                "error": error.message // aikhane error object ta jacche nah keno ?
            });
        }
        const borrow = yield borrow_models_1.BorrowModel.create({
            book: new mongodb_1.ObjectId(data.book),
            quantity: data.quantity,
            dueDate: new Date(data.dueDate)
        });
        res.status(201).json({
            "success": true,
            "message": "Book borrowed successfully",
            "data": borrow
        });
    }
    catch (error) {
        res.status(400).json({
            "message": "Failed to borrow book",
            "success": false,
            "error": error // aikhane to full error object ta jacche 
        });
    }
}));
exports.borrowRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let borrows = yield borrow_models_1.BorrowModel.aggregate([
            {
                $lookup: {
                    from: "bookmodels",
                    localField: "book",
                    foreignField: "_id",
                    as: "bookData"
                }
            },
            { $unwind: "$bookData" },
            {
                $group: {
                    _id: "$bookData._id",
                    book: {
                        $first: {
                            title: "$bookData.title",
                            isbn: "$bookData.isbn"
                        }
                    },
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $project: {
                    _id: 0, // _id hide
                    book: 1,
                    totalQuantity: 1
                }
            }
        ]);
        res.status(200).json({
            "success": true,
            "message": "Borrowed books fetched successfully",
            "data": borrows
        });
    }
    catch (error) {
        res.status(400).json({
            "message": "Failed to fetch borrowed books",
            "success": false,
            "error": error
        });
    }
}));
