import { Model } from "mongoose";


export interface Book{
    title: string;
    author: string;
    genre: 'FICTION'|'NON-FICTION'|'SCIENCE'|'HISTORY'|'BIOGRAPHY'|'FANTASY';
    isbn: string;
    description?: string;
    copies:number;
    available:boolean
}

export interface BookModelType extends Model<Book> {
  copiesCalculator(id:string,quantity:number): number;
}