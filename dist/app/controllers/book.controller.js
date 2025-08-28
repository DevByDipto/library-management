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
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const zod_1 = __importDefault(require("zod"));
exports.bookRouter = express_1.default.Router();
const Book = zod_1.default.object({
    title: zod_1.default.string(),
    author: zod_1.default.string(),
    genre: zod_1.default.string(),
    isbn: zod_1.default.string(),
    discription: zod_1.default.string().optional(),
    copies: zod_1.default.number(),
    available: zod_1.default.boolean()
});
// Create a new book
exports.bookRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        // Logic to create a new book would go here
        const book = yield book_model_1.bookModel.create(Book.parse(data));
        res.status(201).json({
            "success": true,
            "message": "Book created successfully",
            "data": book
        });
    }
    catch (error) {
        res.status(400).json({
            "message": "Failed to create book",
            "success": false,
            "error": error
        });
    }
}));
// Get all books with filtering, sorting, and pagination
exports.bookRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { filter, sortBy, sort, limit } = req.query;
    let query = book_model_1.bookModel.find();
    // Filter
    if (filter)
        query = query.where("genre").equals(filter);
    // Sort
    if (sortBy)
        query = query.sort({ [sortBy]: sort === "desc" ? -1 : 1 });
    // Limit
    query = query.limit(Number(limit) || 10);
    // Execute
    const books = yield query.exec();
    if (!books) {
        res.status(400).json({
            "message": "Failed to retrieve books",
            "success": false,
            "error": books
        });
    }
    res.status(200).json({
        "success": true,
        "message": "Books retrieved successfully",
        "data": books
    });
}));
// Get a book by ID
exports.bookRouter.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const book = yield book_model_1.bookModel.findById(bookId);
    if (!book) {
        res.status(400).json({
            "message": "Failed to retrieve book by ID",
            "success": false,
            "error": "Book not found"
        });
    }
    res.status(200).json({
        "success": true,
        "message": "Book retrieved successfully",
        "data": book
    });
}));
// Update a book by ID
exports.bookRouter.patch('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const data = req.body;
        const book = yield book_model_1.bookModel.findByIdAndUpdate(bookId, data, { new: true });
        res.status(200).json({
            "success": true,
            "message": "Book updated successfully",
            "data": book
        });
    }
    catch (error) {
        res.status(400).json({
            "message": "Failed to update book",
            "success": false,
            "error": error
        });
    }
}));
// Delete a book by ID
exports.bookRouter.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        yield book_model_1.bookModel.findByIdAndDelete(bookId);
        res.status(200).json({
            "success": true,
            "message": "Book deleted successfully",
            "data": null
        });
    }
    catch (error) {
        res.status(400).json({
            "message": "Failed to delete book",
            "success": false,
            "error": error
        });
    }
}));
