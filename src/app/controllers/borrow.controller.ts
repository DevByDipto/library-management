import express from 'express';
import { bookModel } from '../models/book.model';
import z from "zod";
import { BorrowModel } from '../models/borrow.models';
import { ObjectId } from 'mongodb';

export const borrowRouter = express.Router();

const Borrow = z.object({
    book: z.string(),
    quantity: z.number(),
    dueDate: z.string(),
});

// Borrow a book
borrowRouter.post('/', async (req, res) => {
    if (req.body.quantity <= 0) {
        return res.status(400).json(
            {
                "message": "Quantity must be greater than zero",
                "success": false,
                "error": "Invalid quantity"
            }
        )
    }

    try {
      let data = Borrow.parse(req.body); 
      try {
        await bookModel.copiesCalculator(data.book, data.quantity);
        
      } catch (error) {
         res.status(400).json(
            {
                "message": "Failed to borrow book",
                "success": false,
                "error": (error as Error).message // aikhane error object ta jacche nah keno ?
            })
      }

       const borrow = await BorrowModel.create({
        book: new ObjectId(data.book),
        quantity: data.quantity,
        dueDate: new Date(data.dueDate)
    })
    res.status(201).json(

        {
            "success": true,
            "message": "Book borrowed successfully",
            "data": borrow
        })
    } catch (error) {
      res.status(400).json(
            {
                "message": "Failed to borrow book",
                "success": false,
                "error": error // aikhane to full error object ta jacche 
            })
    }
})





borrowRouter.get('/', async (req, res) => {
    try {
        let borrows = await BorrowModel.aggregate([
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
      _id: 0,     // _id hide
      book: 1,
      totalQuantity: 1
    }
  }
])



        res.status(200).json(
            {
                "success": true,
                "message": "Borrowed books fetched successfully",
                "data": borrows
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                "message": "Failed to fetch borrowed books",
                "success": false,
                "error": error
            }
        )
    }
})