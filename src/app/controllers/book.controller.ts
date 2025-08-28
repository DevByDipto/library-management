import express from 'express';
import { bookModel } from '../models/book.model';
import z from "zod";

export const bookRouter = express.Router();

const Book = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  isbn: z.string(),
  discription: z.string().optional(),
  copies: z.number(),
  available: z.boolean()
});

// Create a new book
bookRouter.post('/', async(req, res) => {

 try {
  const data = req.body;
// Logic to create a new book would go here

const book = await bookModel.create(Book.parse(data));

  res.status(201).json(
    {
        "success": true,
        "message": "Book created successfully",
        "data":book
    }
  )
 } catch (error) {
  res.status(400).json(
    {
      "message": "Failed to create book",
        "success": false,
        "error": error
    }
  )
 }
  
  
});

// Get all books with filtering, sorting, and pagination
bookRouter.get('/', async(req, res) => {
  try {
    let {filter,sortBy,sort,limit} = req.query;
  let query = bookModel.find();

// Filter
if(filter) query = query.where("genre").equals(filter);

// Sort
if(sortBy) query = query.sort({ [sortBy as string]: sort === "desc" ? -1 : 1 });

// Limit
query = query.limit(Number(limit) || 10);

// Execute
const books = await query.exec();

  
  res.status(200).json(
    {
        "success": true,
        "message": "Books retrieved successfully",
        "data":books
    }
  )
  } catch (error) {
    res.status(400).json(
      {
        "message": "Failed to retrieve books",
          "success": false,
          "error": error
      }
    )
  }
});

// Get a book by ID
bookRouter.get('/:bookId', async(req, res) => {
  
      const {bookId} = req.params;
    const book = await bookModel.findById(bookId);

    if(!book){
      res.status(400).json(
      {
        "message": "Failed to retrieve book by ID",
          "success": false,
          "error": "Book not found"
      }
    )
    }
    res.status(200).json(
      {
          "success": true,
          "message": "Book retrieved successfully",
          "data":book
      }
    )
  


})

// Update a book by ID
bookRouter.patch('/:bookId', async(req, res) => {
  
    try {
      const {bookId} = req.params;
    const data = req.body;
    const book = await bookModel.findByIdAndUpdate(bookId, data,{ new: true });
    res.status(200).json(
      {
          "success": true,
          "message": "Book updated successfully",
          "data":book
      }
    )
    } catch (error) {
      res.status(400).json(
        {
          "message": "Failed to update book",
            "success": false,
            "error": error
        }
      )
    }
})

// Delete a book by ID
bookRouter.delete('/:bookId', async(req, res) => {
  try {
    const {bookId} = req.params;
    await bookModel.findByIdAndDelete(bookId);
    res.status(200).json(
      {
          "success": true,
          "message": "Book deleted successfully",
          "data": null
      }
    )
  } catch (error) {
    res.status(400).json(
      {
        "message": "Failed to delete book",
          "success": false,
          "error": error
      }
    )
  }
})