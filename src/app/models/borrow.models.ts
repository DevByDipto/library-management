import { model, Schema } from "mongoose";
import { Borrow } from "../interfaces/borrow.interface";



let borrowSchema = new Schema<Borrow>({
    book: { type: Schema.Types.ObjectId, ref: 'bookModel', required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true },
},
    {
        timestamps: true,
        versionKey: false
    }   
)

export const BorrowModel = model('BorrowModel', borrowSchema)