import { model, Schema } from "mongoose";
import { Book, BookModelType } from "../interfaces/book.interface";

let bookSchema = new Schema<Book,BookModelType>({
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
},
    {
        timestamps: true,
        versionKey: false
    }
)

bookSchema.static('copiesCalculator', async function copiesCalculator(id,quantity) {
console.log(id,quantity);
const book = await this.findById(id);
if(!book) throw new Error('Book not found');

if(book.copies < quantity) throw new Error('Not enough copies available');

if(book.copies === quantity){
    book.available = false;
    book.copies = 0;
}

if(book.copies > quantity)book.copies = book.copies - quantity;
await this.findByIdAndUpdate(id,book);

});


export const bookModel = model<Book,BookModelType>('bookModel', bookSchema);