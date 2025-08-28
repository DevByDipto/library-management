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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookModel = void 0;
const mongoose_1 = require("mongoose");
let bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
        type: String,
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: "{VALUE} is not a valid genre. Valid genres are: [FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY]"
        },
        uppercase: true,
        required: true
    },
    isbn: { type: String, required: true, unique: true },
    description: {
        type: String,
        default: "",
    },
    copies: { type: Number, required: true },
    available: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false
});
bookSchema.static('copiesCalculator', function copiesCalculator(id, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id, quantity);
        const book = yield this.findById(id);
        if (!book)
            throw new Error('Book not found');
        if (book.copies < quantity)
            throw new Error('Not enough copies available');
        if (book.copies === quantity) {
            book.available = false;
            book.copies = 0;
        }
        if (book.copies > quantity)
            book.copies = book.copies - quantity;
        yield this.findByIdAndUpdate(id, book);
    });
});
exports.bookModel = (0, mongoose_1.model)('bookModel', bookSchema);
